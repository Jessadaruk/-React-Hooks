# คำอธิบาย React Hooks ในโปรเจกต์

เอกสารนี้สรุปว่า Hook แต่ละชนิดแก้ปัญหาใดใน Coffee Shop Ordering System และอ้างอิงตำแหน่งที่ใช้งานจริง

## useState

`App.jsx` ใช้ `useState` แยก `searchTerm` และ `selectedCategory` เพราะเป็นข้อมูล UI ขนาดเล็กที่เปลี่ยนอย่างอิสระ เมื่อค่าใดค่าหนึ่งเปลี่ยน `filteredProducts` จะถูกคำนวณใหม่ `ProductCard.jsx` ใช้ State อีกตัวสำหรับเปลี่ยนไปแสดงภาพสำรองเมื่อ URL รูปโหลดไม่ได้

## useReducer

`CartContext.jsx` เรียก `useReducer(cartReducer, EMPTY_CART)` เพื่อรวมกฎการเปลี่ยนตะกร้าไว้ที่ `reducers/cartReducer.js` Action ที่รองรับคือ `ADD_ITEM`, `REMOVE_ITEM`, `INCREASE_QUANTITY`, `DECREASE_QUANTITY`, `CLEAR_CART` และ `HYDRATE_CART` การเพิ่มสินค้าซ้ำใช้ `map` เพิ่ม `quantity` ส่วนการลดจาก 1 ใช้ `flatMap` คืน Array ว่างสำหรับสินค้านั้น จึงไม่มีจำนวนศูนย์หรือติดลบ

## useContext และ useCart

`CartContext` เก็บตะกร้า ยอดรวม และฟังก์ชันจัดการตะกร้า `useCart()` เรียก `useContext(CartContext)` เพื่อให้ `Header`, `ProductCard`, `Cart`, `CartItem` และ `OrderSummary` ใช้ข้อมูลร่วมกันได้โดยไม่ส่ง Props ผ่านทุกชั้น หากเรียกนอก `CartProvider` จะ throw ข้อความที่สื่อความหมายทันที

## useEffect และ useLocalStorage

`useLocalStorage.js` มี Effect แรกสำหรับอ่านและ parse ค่า `coffee-shop-cart` โดยใช้ validator จาก `CartContext.jsx` ตรวจชนิดข้อมูล ID ราคา และจำนวน Effect ที่สองบันทึกค่าเมื่อ State เปลี่ยนและทำงานหลัง Hydrate แล้วเท่านั้น ส่วน `CartContext.jsx` มี Effect เชื่อมค่าใน Storage เข้า Reducer และบันทึก State ตะกร้ากลับสู่ Custom Hook

## useMemo

- `App.jsx` กรอง `menuItems` จากคำค้นหาและหมวดหมู่ เฉพาะเมื่อสองค่านี้เปลี่ยน
- `CartContext.jsx` คำนวณ `totalItems` และ `totalPrice` ใหม่เมื่อ `cart` เปลี่ยน
- Context value ถูก memoize เพื่อไม่ให้ Consumer render จาก Object ใหม่โดยไม่จำเป็น

## useCallback และ React.memo

`addItem`, `removeItem`, `increaseQuantity`, `decreaseQuantity` และ `clearCart` ใน `CartContext.jsx` ใช้ `useCallback` ทำให้ reference คงที่ ฟังก์ชันเหล่านี้ถูกใช้ใน `ProductCard` และ `CartItem` ซึ่งครอบด้วย `React.memo` จึงลดการ render ที่เกิดจาก callback ใหม่โดยไม่จำเป็น `SearchBar` และ `FilterBar` ใช้ `memo` เช่นกัน

## การเลือกใช้ Hook ให้เหมาะกับงาน

Search และ Filter ไม่จำเป็นต้องใช้ Reducer เพราะการเปลี่ยนค่าไม่มีหลาย Action หรือกฎซับซ้อน ตรงข้ามกับตะกร้าที่มีการเปลี่ยนหลายแบบและต้องรักษา invariant ว่า ID ไม่ซ้ำและจำนวนไม่น้อยกว่า 1 การแยกเช่นนี้ทำให้โค้ดอ่านง่าย ทดสอบ Reducer ได้โดยไม่ต้อง render UI และไม่ใช้ Memoization มากกว่าที่จำเป็น
