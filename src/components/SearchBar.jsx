import { memo } from 'react'

function SearchBar({ value, onChange }) {
  return (
    <div className="search-field">
      <label htmlFor="menu-search">ค้นหาเมนู</label>
      <div className="search-input-wrap">
        <span aria-hidden="true">⌕</span>
        <input
          id="menu-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="ลองค้นหา Latte หรือ Brownie"
          autoComplete="off"
        />
        {value && (
          <button
            className="clear-search"
            type="button"
            onClick={() => onChange('')}
            aria-label="ล้างข้อความค้นหา"
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}

export default memo(SearchBar)
