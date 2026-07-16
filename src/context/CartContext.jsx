import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { CART_ACTIONS, cartReducer } from '../reducers/cartReducer.js'

const STORAGE_KEY = 'coffee-shop-cart'
const EMPTY_CART = Object.freeze([])

const isValidCart = (value) => {
  if (!Array.isArray(value)) return false

  const ids = new Set()
  return value.every((item) => {
    const isValidItem =
      Number.isInteger(item?.id) &&
      typeof item?.name === 'string' &&
      typeof item?.price === 'number' &&
      Number.isFinite(item.price) &&
      item.price >= 0 &&
      typeof item?.category === 'string' &&
      typeof item?.image === 'string' &&
      Number.isInteger(item?.quantity) &&
      item.quantity >= 1 &&
      !ids.has(item.id)

    if (isValidItem) ids.add(item.id)
    return isValidItem
  })
}

export const CartContext = createContext(undefined)

export function CartProvider({ children }) {
  const [persistedCart, setPersistedCart, isStorageHydrated] = useLocalStorage(
    STORAGE_KEY,
    EMPTY_CART,
    isValidCart,
  )
  const [cart, dispatch] = useReducer(cartReducer, EMPTY_CART)
  const [isCartHydrated, setIsCartHydrated] = useState(false)

  useEffect(() => {
    if (!isStorageHydrated) return

    dispatch({ type: CART_ACTIONS.HYDRATE_CART, payload: persistedCart })
    setIsCartHydrated(true)
  }, [isStorageHydrated, persistedCart])

  useEffect(() => {
    if (isCartHydrated) setPersistedCart(cart)
  }, [cart, isCartHydrated, setPersistedCart])

  const addItem = useCallback((product) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: product })
  }, [])

  const removeItem = useCallback((productId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: productId })
  }, [])

  const increaseQuantity = useCallback((productId) => {
    dispatch({
      type: CART_ACTIONS.INCREASE_QUANTITY,
      payload: productId,
    })
  }, [])

  const decreaseQuantity = useCallback((productId) => {
    dispatch({
      type: CART_ACTIONS.DECREASE_QUANTITY,
      payload: productId,
    })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART })
  }, [])

  const totalItems = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  )

  const totalPrice = useMemo(
    () =>
      cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart],
  )

  const value = useMemo(
    () => ({
      cart,
      totalItems,
      totalPrice,
      addItem,
      removeItem,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
    }),
    [
      addItem,
      cart,
      clearCart,
      decreaseQuantity,
      increaseQuantity,
      removeItem,
      totalItems,
      totalPrice,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
