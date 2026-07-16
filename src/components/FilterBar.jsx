import { memo } from 'react'

const categoryLabels = {
  All: 'ทั้งหมด',
  Coffee: 'กาแฟ',
  Tea: 'ชา',
  Bakery: 'เบเกอรี',
  Dessert: 'ของหวาน',
}

function FilterBar({ categories, selectedCategory, onSelect }) {
  return (
    <div className="filter-group" aria-label="กรองตามหมวดหมู่">
      <span className="filter-label">หมวดหมู่</span>
      <div className="filter-options" role="group">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={selectedCategory === category ? 'active' : ''}
            aria-pressed={selectedCategory === category}
            onClick={() => onSelect(category)}
          >
            {categoryLabels[category]}
          </button>
        ))}
      </div>
    </div>
  )
}

export default memo(FilterBar)
