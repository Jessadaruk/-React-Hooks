# สมาชิกคนที่ 1: useReducer และ useContext

- ชื่อ: `[นาย เจษฎารักษ์ วิชาไชย]`
- รหัสนักศึกษา: `[673450207-3]`
- หน้าที่: รับผิดชอบศึกษา อธิบาย และตรวจสอบ `useReducer`, `useContext`, ระบบตะกร้า, `CartContext`, `cartReducer` รวมถึงการรวมระบบและตรวจสอบ Build

## useReducer

### หลักการทำงานและตำแหน่งที่ใช้

`src/context/CartContext.jsx` สร้าง State ตะกร้าด้วย `useReducer(cartReducer, EMPTY_CART)` ส่วนกฎการเปลี่ยน State อยู่ใน `src/reducers/cartReducer.js` การส่ง Action ทำให้ Component ไม่ต้องรู้รายละเอียดการอัปเดต Array

```js
const [cart, dispatch] = useReducer(cartReducer, EMPTY_CART)

const addItem = useCallback((product) => {
  dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: product })
}, [])
```

เมื่อ Action เป็น `ADD_ITEM` Reducer ตรวจ ID ก่อน หากมีอยู่แล้วจะเพิ่ม `quantity` ด้วย immutable `map` หากยังไม่มีจะสร้างรายการใหม่ที่จำนวน 1 ส่วน `DECREASE_QUANTITY` จะลบรายการเมื่อเดิมเหลือ 1 ชิ้น นี่เป็นพฤติกรรมที่เลือกเพื่อป้องกันจำนวน 0 และทำให้ผู้ใช้ไม่ต้องกด “ลบ” ซ้ำ

### เหตุผลที่เลือกใช้

ตะกร้ามี Action หลายชนิดและทุก Action ต้องรักษากฎร่วม เช่น ID ไม่ซ้ำและจำนวนต้องเป็นบวก การรวมกฎไว้ใน Reducer ทำให้ตรวจสอบได้จากจุดเดียวและทดสอบด้วย `cartReducer.test.js` โดยไม่ต้องเปิดหน้าเว็บ

### ข้อดี

- State transition มีชื่อและค้นหาได้ง่าย
- การอัปเดตเป็น immutable และคืน Array ใหม่
- Unit test กรณีเพิ่มซ้ำ ลดเหลือศูนย์ ลบ และล้างได้โดยตรง
- เพิ่ม Action ใหม่ได้โดยไม่กระจายตรรกะไปหลาย Component

### ข้อจำกัดและข้อควรระวัง

- Action และ Payload ต้องมีรูปแบบตรงกัน มิฉะนั้น Reducer อาจไม่เปลี่ยน State ตามที่ต้องการ
- Reducer ควรเป็น pure function ห้ามเขียน Local Storage หรือแสดง Alert ภายใน
- `HYDRATE_CART` รับเฉพาะข้อมูลที่ผ่าน `isValidCart` แล้วเท่านั้น

## useContext

### หลักการทำงานและตำแหน่งที่ใช้

`CartContext` เผยแพร่ `cart`, `totalItems`, `totalPrice` และ callback ทั้งห้าให้ Component ใต้ `CartProvider` ส่วน `src/hooks/useCart.js` เป็นทางเข้าเดียวของ Consumer

```js
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
```

`Header` อ่านจำนวนรวม, `ProductCard` เรียก `addItem`, `CartItem` ปรับจำนวน และ `OrderSummary` อ่านยอดรวมได้โดยไม่ส่ง Props ผ่าน `App` และ Component ระหว่างทาง

### เหตุผล ข้อดี และข้อควรระวัง

Context เหมาะกับข้อมูลตะกร้าที่หลายส่วนต้องใช้ร่วมกัน ช่วยลด Props Drilling และทำให้ API ของระบบตะกร้าชัดเจน อย่างไรก็ตาม Consumer ทุกตัวอาจ render เมื่อ Context value เปลี่ยน จึงใช้ `useMemo` กับ value, `useCallback` กับฟังก์ชัน และ `React.memo` กับ ProductCard/CartItem ไม่ควรนำ State UI ทุกชนิดใส่ Context เพราะจะเพิ่มการ render และทำให้ขอบเขตข้อมูลกว้างเกินจำเป็น
