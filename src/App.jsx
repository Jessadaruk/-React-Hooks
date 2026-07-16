import { useMemo, useState } from 'react'
import Cart from './components/Cart.jsx'
import FilterBar from './components/FilterBar.jsx'
import Header from './components/Header.jsx'
import ProductList from './components/ProductList.jsx'
import SearchBar from './components/SearchBar.jsx'
import { categories, menuItems } from './data/menu.js'

export default function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase('en')

    return menuItems.filter((product) => {
      const matchesSearch = product.name
        .toLocaleLowerCase('en')
        .includes(normalizedSearch)
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  return (
    <div className="app-shell">
      <Header />

      <main className="page-layout">
        <section className="catalog" aria-labelledby="menu-heading">
          <div className="catalog-heading">
            <div>
              <p className="eyebrow">Made fresh, served warm</p>
              <h1 id="menu-heading">Pick your comfort</h1>
              <p className="catalog-intro">
                กาแฟหอมกรุ่น ชาสดชื่น และขนมอบจากเตา พร้อมให้คุณเลือกในมื้อที่พอดี
              </p>
            </div>
            <span className="result-count" aria-live="polite">
              {filteredProducts.length} รายการ
            </span>
          </div>

          <div className="catalog-controls">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <FilterBar
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>

          <ProductList products={filteredProducts} />
        </section>

        <aside className="cart-column" aria-label="ตะกร้าสินค้า">
          <Cart />
        </aside>
      </main>

      <footer className="site-footer">
        <span>Hearth &amp; Bean Coffee</span>
        <span>Slow moments. Better coffee.</span>
      </footer>
    </div>
  )
}
