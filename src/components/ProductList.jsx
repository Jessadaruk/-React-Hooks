import ProductCard from './ProductCard.jsx'

export default function ProductList({ products }) {
  if (products.length === 0) {
    return (
      <div className="empty-state" role="status">
        <span aria-hidden="true">☕</span>
        <h2>ยังไม่พบเมนูที่ค้นหา</h2>
        <p>ลองเปลี่ยนคำค้นหา หรือเลือกหมวดหมู่อื่นอีกครั้ง</p>
      </div>
    )
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
