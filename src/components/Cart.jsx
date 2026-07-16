import { useCart } from '../hooks/useCart.js'
import CartItem from './CartItem.jsx'
import OrderSummary from './OrderSummary.jsx'

export default function Cart() {
  const { cart, totalItems, clearCart } = useCart()

  const handleClearCart = () => {
    if (window.confirm('ต้องการล้างสินค้าทั้งหมดออกจากตะกร้าหรือไม่?')) {
      clearCart()
    }
  }

  return (
    <section className="cart-panel" id="your-cart" aria-labelledby="cart-heading">
      <div className="cart-header">
        <div>
          <p className="eyebrow">Your order</p>
          <h2 id="cart-heading">ตะกร้าของคุณ</h2>
        </div>
        <span className="cart-count">{totalItems} ชิ้น</span>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart" role="status">
          <span aria-hidden="true">🫘</span>
          <h3>ตะกร้ายังว่างอยู่</h3>
          <p>เลือกเมนูโปรด แล้วเราจะเตรียมให้คุณตรงนี้</p>
        </div>
      ) : (
        <>
          <ul className="cart-list" aria-label="รายการสินค้าในตะกร้า">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </ul>

          <button className="clear-cart-button" type="button" onClick={handleClearCart}>
            ล้างตะกร้าทั้งหมด
          </button>
        </>
      )}

      <OrderSummary />
    </section>
  )
}
