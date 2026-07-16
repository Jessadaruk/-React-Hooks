import { memo, useState } from 'react'
import { useCart } from '../hooks/useCart.js'
import { formatCurrency } from '../utils/formatCurrency.js'

const categoryIcons = {
  Coffee: '☕',
  Tea: '🍵',
  Bakery: '🥐',
  Dessert: '🍰',
}

function ProductCard({ product }) {
  const { addItem } = useCart()
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <article className="product-card">
      <div className={`product-image ${imageFailed ? 'fallback' : ''}`}>
        {!imageFailed && (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        )}
        {imageFailed && (
          <span className="fallback-icon" aria-hidden="true">
            {categoryIcons[product.category]}
          </span>
        )}
        <span className="category-tag">{product.category}</span>
      </div>

      <div className="product-content">
        <div className="product-title-row">
          <h2>{product.name}</h2>
          <strong>{formatCurrency(product.price)}</strong>
        </div>
        <p>{product.description}</p>
        <button
          className="add-button"
          type="button"
          onClick={() => addItem(product)}
          aria-label={`เพิ่ม ${product.name} ลงตะกร้า`}
        >
          <span>เพิ่มลงตะกร้า</span>
          <span aria-hidden="true">＋</span>
        </button>
      </div>
    </article>
  )
}

export default memo(ProductCard)
