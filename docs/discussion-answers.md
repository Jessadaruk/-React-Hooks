# คำตอบคำถามอภิปราย

## 1. เหตุใดจึงเลือกใช้ useReducer แทน useState ในการจัดการตะกร้าสินค้า

ตะกร้ามีการเปลี่ยน State หลายรูปแบบและมีกฎร่วมที่ต้องรักษา ได้แก่ เพิ่มสินค้าเดิมแล้วห้ามมี ID ซ้ำ จำนวนต้องไม่ติดลบ ลดจาก 1 แล้วลบรายการ และล้างทุกสินค้า หากใช้ `useState` ในแต่ละ Component กฎเหล่านี้จะกระจายและทดสอบยาก

โปรเจกต์จึงรวม Action ไว้ใน `src/reducers/cartReducer.js` เช่น `ADD_ITEM` ใช้ `find` ตรวจรายการเดิมแล้ว `map` เพิ่มจำนวน ส่วน `DECREASE_QUANTITY` ใช้ `flatMap` ลบรายการเมื่อจำนวนเดิมเท่ากับ 1 การเปลี่ยนทั้งหมดเป็น immutable และทดสอบโดยตรงใน `cartReducer.test.js` ได้โดยไม่ต้อง render React ทำให้ผลลัพธ์คาดเดาและตรวจย้อนหลังได้ง่ายกว่า

## 2. useMemo ช่วยเพิ่มประสิทธิภาพของระบบอย่างไร

`App.jsx` ใช้ `useMemo` กรองเมนู 13 รายการจาก `searchTerm` และ `selectedCategory` ผลลัพธ์จึงคำนวณใหม่เมื่อผู้ใช้ค้นหาหรือเปลี่ยนหมวดเท่านั้น การเพิ่มสินค้าในตะกร้าไม่ทำให้ filter เมนูใหม่โดยไม่จำเป็น

ใน `CartContext.jsx` จำนวนรวมและยอดรวมต้องวนทุก Cart Item จึง memoize โดยพึ่ง `cart` เมื่อผู้ใช้พิมพ์ค้นหาแต่ตะกร้าไม่เปลี่ยน ตัวเลขทั้งสองไม่ต้องคำนวณใหม่ นอกจากนี้ Context value ถูก memoize เพื่อหลีกเลี่ยง Object ใหม่จากการ render ที่ไม่เกี่ยวข้อง อย่างไรก็ตามโครงการไม่ได้ใช้ `useMemo` กับข้อความหรือค่าคำนวณเล็กน้อยทั่วไป เพราะต้นทุนและความซับซ้อนอาจมากกว่าประโยชน์

## 3. useCallback มีประโยชน์ในสถานการณ์ใด และหากไม่ใช้จะเกิดผลอย่างไร

`CartContext.jsx` สร้าง `addItem`, `removeItem`, `increaseQuantity`, `decreaseQuantity` และ `clearCart` แล้วส่งผ่าน Context ไปยัง Component ลูก ฟังก์ชันเหล่านี้ใช้ `useCallback` เพื่อรักษา reference ระหว่าง render และใช้ร่วมกับ `React.memo` ที่ `ProductCard` กับ `CartItem`

หากไม่ใช้ ทุกครั้งที่ Provider render จะได้ function object ใหม่ แม้พฤติกรรมเหมือนเดิม ส่งผลให้การเปรียบเทียบ Props/Context ด้วย reference เห็นว่า “เปลี่ยน” และ Component ที่ memoized อาจ render ซ้ำ ประโยชน์จึงชัดในกรณีนี้เพราะ callback ถูกแชร์หลายรายการ แต่ไม่จำเป็นต้องใช้กับ handler ทุกตัว เช่น `handleConfirmOrder` ใน `OrderSummary` ไม่ได้ส่งต่อให้ Component ที่ memoized จึงปล่อยเป็นฟังก์ชันปกติให้อ่านง่ายกว่า

## 4. เปรียบเทียบ useContext กับการส่งข้อมูลผ่าน Props หรือ Props Drilling

Props เหมาะเมื่อส่งข้อมูลจาก Parent ไป Child ระยะสั้น เพราะมองเห็นเส้นทางข้อมูลชัดและ Component ทดสอบแยกง่าย แต่ตะกร้าถูกใช้โดยหลายกิ่งของ UI: `Header` ต้องใช้จำนวนรวม, `ProductCard` ต้องเพิ่มสินค้า, `CartItem` ต้องปรับจำนวน และ `OrderSummary` ต้องใช้ยอดรวม หากส่ง Props ผ่าน `App`, `ProductList`, `Cart` และ Component ระหว่างทาง จะเกิด Props Drilling แม้บาง Component ไม่ได้ใช้ค่าดังกล่าว

โปรเจกต์ใช้ `CartContext` และ `useCart()` เพื่อให้ Consumer ขอเฉพาะ API ของตะกร้าได้โดยตรง ลด Props ที่ไม่เกี่ยวข้องและรวม error handling กรณีไม่มี Provider ไว้ที่ Custom Hook ข้อแลกเปลี่ยนคือ dependency ต่อ Context มองไม่เห็นจาก parameter และเมื่อ Context value เปลี่ยน Consumer อาจ render พร้อมกัน จึง memoize value/callback และยังคงใช้ Props กับข้อมูลเฉพาะทาง เช่น `ProductList` รับ `products` และ `ProductCard` รับ `product` แทนการนำข้อมูลเมนูทั้งหมดใส่ Context
