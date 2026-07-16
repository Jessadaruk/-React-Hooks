# สมาชิกคนที่ 3: useEffect, useCallback และ Custom Hooks

- ชื่อ: `[นาย ปลวัชร สุทธมา]`
- รหัสนักศึกษา: `[673450473-2]`
- หน้าที่: รับผิดชอบศึกษา อธิบาย และตรวจสอบ `useEffect`, `useCallback`, `useCart`, `useLocalStorage`, การบันทึกข้อมูล และ Responsive

## useEffect

### หลักการทำงานและตำแหน่งที่ใช้

`src/hooks/useLocalStorage.js` ใช้ Effect แรกอ่านข้อมูลเมื่อ `key` พร้อมใช้งาน โดยครอบ `JSON.parse` ด้วย `try/catch` และเรียก validator ก่อนใช้ข้อมูล Effect ที่สองทำงานเมื่อ `storedValue` เปลี่ยนและบันทึกหลัง `isHydrated` เป็นจริงแล้ว

```js
useEffect(() => {
  if (!isHydrated) return
  try {
    window.localStorage.setItem(key, JSON.stringify(storedValue))
  } catch {
    // เว็บยังทำงานได้หาก Storage ใช้งานไม่ได้
  }
}, [isHydrated, key, storedValue])
```

`CartContext.jsx` ใช้ Effect เชื่อมข้อมูลที่โหลดแล้วเข้า Reducer และอีก Effect ส่ง State ตะกร้ากลับไปเก็บ การมีสถานะ Hydrate ป้องกัน Array ว่างเริ่มต้นเขียนทับข้อมูลเดิมก่อนโหลดเสร็จ

### เหตุผล ข้อดี และข้อควรระวัง

Local Storage เป็นระบบภายนอก React จึงเป็น side effect ที่ควรทำหลัง render ข้อดีคือแยก UI ออกจากการอ่าน/เขียน Storage แต่ต้องระวัง dependency, การเขียนวนซ้ำ และ React Strict Mode ที่อาจเรียก Effect เพิ่มในโหมดพัฒนา โค้ดจึงทำทุกขั้นตอนแบบ idempotent และไม่ถือว่าค่าใน Storage เชื่อถือได้เสมอ

## useCallback

`CartContext.jsx` ห่อฟังก์ชัน dispatch ทั้งห้าด้วย `useCallback` เช่น:

```js
const removeItem = useCallback((productId) => {
  dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: productId })
}, [])
```

ฟังก์ชันเหล่านี้ถูกใช้โดย `ProductCard` และ `CartItem` ที่ครอบด้วย `React.memo` reference ที่คงที่จึงช่วยให้ memoization มีผลจริงเมื่อ Props/Context ส่วนที่เกี่ยวข้องไม่เปลี่ยน ข้อควรระวังคือ dependency ต้องครบ และไม่ควรใช้กับฟังก์ชันที่ไม่ส่งต่อหรือไม่มีประโยชน์ด้านการ render

## Custom Hook: useCart

`src/hooks/useCart.js` รวมการเรียก Context และตรวจว่ามี Provider ไว้ที่เดียว Component จึงเขียนเพียง `const { cart } = useCart()` และได้รับ error ที่เข้าใจง่ายหากโครงสร้าง Provider ผิด ข้อจำกัดคือใช้ได้เฉพาะใต้ `CartProvider`

## Custom Hook: useLocalStorage

`useLocalStorage(key, initialValue, validator)` คืนค่า `[storedValue, updateStoredValue, isHydrated]` โดยรับผิดชอบ JSON, error handling และลำดับ Hydration ให้ Context ไม่ต้องทำงานระดับ Browser API ซ้ำ ข้อควรระวังคือ Storage มีขนาดจำกัดและใช้ได้เฉพาะฝั่ง Browser จึงไม่เหมาะกับข้อมูลสำคัญหรือข้อมูลที่ต้องใช้ข้ามอุปกรณ์

## การตรวจสอบ Responsive

`src/index.css` ใช้ Grid 3 คอลัมน์สำหรับสินค้าในจอใหญ่ ลดเป็น 2 คอลัมน์เมื่อกว้างไม่เกิน 1180px ย้ายตะกร้าลงล่างเมื่อไม่เกิน 920px และเปลี่ยนเมนูเป็นการ์ดแนวนอน/คอลัมน์เดียวบนมือถือ ปุ่มหลักมีความสูงประมาณ 42–50px มี Focus State และไม่กำหนดความกว้างตายตัวที่ทำให้เกิด Horizontal Scroll
