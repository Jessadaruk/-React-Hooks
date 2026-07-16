import test from 'node:test'
import assert from 'node:assert/strict'
import { CART_ACTIONS, cartReducer } from './cartReducer.js'

const espresso = {
  id: 1,
  name: 'Espresso',
  price: 60,
  category: 'Coffee',
  image: 'espresso.jpg',
}

test('adds a new item with quantity one', () => {
  const result = cartReducer([], {
    type: CART_ACTIONS.ADD_ITEM,
    payload: espresso,
  })

  assert.deepEqual(result, [{ ...espresso, quantity: 1 }])
})

test('increases quantity instead of creating a duplicate item', () => {
  const state = [{ ...espresso, quantity: 1 }]
  const result = cartReducer(state, {
    type: CART_ACTIONS.ADD_ITEM,
    payload: espresso,
  })

  assert.equal(result.length, 1)
  assert.equal(result[0].quantity, 2)
})

test('increases, decreases, and removes an item at quantity one', () => {
  const state = [{ ...espresso, quantity: 1 }]
  const increased = cartReducer(state, {
    type: CART_ACTIONS.INCREASE_QUANTITY,
    payload: espresso.id,
  })
  const decreased = cartReducer(increased, {
    type: CART_ACTIONS.DECREASE_QUANTITY,
    payload: espresso.id,
  })
  const removed = cartReducer(decreased, {
    type: CART_ACTIONS.DECREASE_QUANTITY,
    payload: espresso.id,
  })

  assert.equal(increased[0].quantity, 2)
  assert.equal(decreased[0].quantity, 1)
  assert.deepEqual(removed, [])
})

test('removes one item and clears the whole cart immutably', () => {
  const state = [
    { ...espresso, quantity: 1 },
    { ...espresso, id: 2, name: 'Americano', quantity: 1 },
  ]
  const removed = cartReducer(state, {
    type: CART_ACTIONS.REMOVE_ITEM,
    payload: 1,
  })
  const cleared = cartReducer(removed, { type: CART_ACTIONS.CLEAR_CART })

  assert.deepEqual(removed.map((item) => item.id), [2])
  assert.deepEqual(cleared, [])
  assert.equal(state.length, 2)
})
