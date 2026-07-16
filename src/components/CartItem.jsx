import { memo } from 'react'
import { useCart } from '../hooks/useCart.js'
import { formatCurrency } from '../utils/formatCurrency.js'

function CartItem({ item }) {
  const { removeItem, increaseQuantity, decreaseQuantity } = useCart()

  return (
    <li className="cart-item">
      <div className="cart-item-main">
        <div>
          <h3>{item.name}</h3>
          <p>{formatCurrency(item.price)} / ชิ้น</p>
        </div>
        <strong>{formatCurrency(item.price * item.quantity)}</strong>
      </div>

      <div className="cart-item-actions">
        <div className="quantity-control" aria-label={`จำนวน ${item.name}`}>
          <button
            type="button"
            onClick={() => decreaseQuantity(item.id)}
            aria-label={`ลดจำนวน ${item.name}`}
          >
            −
          </button>
          <output aria-live="polite" aria-label={`${item.quantity} ชิ้น`}>
            {item.quantity}
          </output>
          <button
            type="button"
            onClick={() => increaseQuantity(item.id)}
            aria-label={`เพิ่มจำนวน ${item.name}`}
          >
            +
          </button>
        </div>

        <button
          className="remove-item-button"
          type="button"
          onClick={() => removeItem(item.id)}
          aria-label={`ลบ ${item.name} ออกจากตะกร้า`}
        >
          ลบ
        </button>
      </div>
    </li>
  )
}

export default memo(CartItem)
