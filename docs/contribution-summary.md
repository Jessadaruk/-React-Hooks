# สรุปความรับผิดชอบของสมาชิก

สมาชิกแต่ละคนรับผิดชอบศึกษา อธิบาย และตรวจสอบส่วนที่เกี่ยวข้องตามตาราง โดยตัวอย่างในเอกสารอ้างอิง Source Code ปัจจุบันของโปรเจกต์

| สมาชิก | React Hooks | ส่วนของระบบ | ไฟล์ที่เกี่ยวข้อง |
| --- | --- | --- | --- |
| `[นาย เจษฎารักษ์ วิชาไชย]` `[673450207-3]` | `useReducer`, `useContext` | ตะกร้าสินค้า, CartContext, Reducer, การรวมระบบและ Build | `src/context/CartContext.jsx`, `src/reducers/cartReducer.js`, `src/reducers/cartReducer.test.js`, `src/components/Cart.jsx`, `src/components/CartItem.jsx`, `src/components/OrderSummary.jsx` |
| `[นายโสภณวิชญ์ แก้วศิลา]` `[673450209-9]` | `useState`, `useMemo` | ค้นหา, กรองหมวดหมู่, รายการสินค้าที่แสดง, จำนวนและยอดรวม | `src/App.jsx`, `src/components/SearchBar.jsx`, `src/components/FilterBar.jsx`, `src/components/ProductList.jsx`, `src/data/menu.js` |
| `[นาย ปลวัชร สุทธมา]` `[673450473-2]` | `useEffect`, `useCallback`, `useCart`, `useLocalStorage` | Local Storage, callback ของตะกร้า, Custom Hooks และ Responsive | `src/hooks/useCart.js`, `src/hooks/useLocalStorage.js`, `src/context/CartContext.jsx`, `src/components/ProductCard.jsx`, `src/index.css` |

## การเชื่อมโยงงาน

การค้นหาและกรองใน `App.jsx` ส่งผลให้ `ProductList` แสดงเฉพาะเมนูที่ตรงเงื่อนไข เมื่อผู้ใช้กดเพิ่ม `ProductCard` จะเรียก `addItem` จาก `useCart` แล้ว `CartContext` dispatch Action ไปยัง `cartReducer` State ใหม่ถูกคำนวณยอดรวมด้วย `useMemo` และส่งต่อให้ `Header`, `Cart` และ `OrderSummary` พร้อมบันทึกลง Local Storage ผ่าน `useEffect` ใน Custom Hook
