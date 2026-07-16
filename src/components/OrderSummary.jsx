import { useCart } from '../hooks/useCart.js'
import { formatCurrency } from '../utils/formatCurrency.js'

export default function OrderSummary() {
  const { totalItems, totalPrice, clearCart } = useCart()

  const handleConfirmOrder = () => {
    const confirmed = window.confirm(
      `ยืนยันคำสั่งซื้อ ${totalItems} ชิ้น ยอดรวม ${formatCurrency(totalPrice)} หรือไม่?`,
    )

    if (confirmed) {
      window.alert('รับคำสั่งซื้อเรียบร้อยแล้ว ขอบคุณที่แวะมาหาเรานะ ☕')
      clearCart()
    }
  }

  return (
    <div className="order-summary" aria-label="สรุปคำสั่งซื้อ">
      <div className="summary-row">
        <span>จำนวนสินค้า</span>
        <strong>{totalItems} ชิ้น</strong>
      </div>
      <div className="summary-row total-row">
        <span>ยอดรวม</span>
        <strong>{formatCurrency(totalPrice)}</strong>
      </div>
      <p className="summary-note">ราคารวมภาษีมูลค่าเพิ่มแล้ว · ชำระเงินที่เคาน์เตอร์</p>
      <button
        className="confirm-order-button"
        type="button"
        disabled={totalItems === 0}
        onClick={handleConfirmOrder}
      >
        ยืนยันคำสั่งซื้อ
        <span aria-hidden="true">→</span>
      </button>
    </div>
  )
}
