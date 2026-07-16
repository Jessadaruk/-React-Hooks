import { useCart } from '../hooks/useCart.js'

export default function Header() {
  const { totalItems } = useCart()

  return (
    <header className="site-header">
      <a className="brand" href="#menu-heading" aria-label="กลับไปที่รายการเมนู">
        <span className="brand-mark" aria-hidden="true">
          H&amp;B
        </span>
        <span className="brand-copy">
          <strong>Hearth &amp; Bean</strong>
          <small>Coffee · Tea · Bakes</small>
        </span>
      </a>

      <a className="cart-pill" href="#your-cart" aria-label={`ดูตะกร้า ${totalItems} ชิ้น`}>
        <span aria-hidden="true">☕</span>
        <span>ตะกร้าของคุณ</span>
        <strong>{totalItems}</strong>
      </a>
    </header>
  )
}
