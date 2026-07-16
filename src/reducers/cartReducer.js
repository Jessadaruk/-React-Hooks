export const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  INCREASE_QUANTITY: 'INCREASE_QUANTITY',
  DECREASE_QUANTITY: 'DECREASE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  HYDRATE_CART: 'HYDRATE_CART',
}

export function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItem = state.find((item) => item.id === action.payload.id)

      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...state, { ...action.payload, quantity: 1 }]
    }

    case CART_ACTIONS.REMOVE_ITEM:
      return state.filter((item) => item.id !== action.payload)

    case CART_ACTIONS.INCREASE_QUANTITY:
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      )

    case CART_ACTIONS.DECREASE_QUANTITY:
      return state.flatMap((item) => {
        if (item.id !== action.payload) return [item]
        if (item.quantity <= 1) return []
        return [{ ...item, quantity: item.quantity - 1 }]
      })

    case CART_ACTIONS.CLEAR_CART:
      return []

    case CART_ACTIONS.HYDRATE_CART:
      return action.payload

    default:
      return state
  }
}
