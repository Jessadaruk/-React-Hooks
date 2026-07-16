# สมาชิกคนที่ 2: useState และ useMemo

- ชื่อ: `[นายโสภณวิชญ์ แก้วศิลา]`
- รหัสนักศึกษา: `[673450209-9]`
- หน้าที่: รับผิดชอบศึกษา อธิบาย และตรวจสอบ `useState`, `useMemo`, ระบบค้นหา ระบบกรองหมวดหมู่ และการคำนวณรายการสินค้าที่ต้องแสดง

## useState

### หลักการทำงานและตำแหน่งที่ใช้

`src/App.jsx` เก็บคำค้นหาและหมวดหมู่ที่เลือกเป็น State แยกกัน:

```js
const [searchTerm, setSearchTerm] = useState('')
const [selectedCategory, setSelectedCategory] = useState('All')
```

`SearchBar` เป็น Controlled Component โดยรับ `value` และส่งข้อความใหม่กลับผ่าน `onChange` ส่วน `FilterBar` ส่งชื่อหมวดกลับผ่าน `onSelect` การเปลี่ยน State ทำให้ React render ผลลัพธ์ล่าสุดทันที นอกจากนี้ `ProductCard.jsx` ใช้ `useState(false)` เก็บสถานะรูปโหลดไม่สำเร็จและเปลี่ยนเป็นภาพสำรอง

### เหตุผลที่เลือกใช้

Search และ Category เป็นค่าเดี่ยว ไม่มี Action ซับซ้อน และไม่จำเป็นต้องเปลี่ยนพร้อมกัน จึงใช้ `useState` ได้ตรงและอ่านง่ายกว่า Reducer

### ข้อดี

- โค้ดสั้นและเห็นค่าเริ่มต้นชัดเจน
- เชื่อม Controlled Input ได้โดยตรง
- แยก State ตามหน้าที่ ลดผลกระทบเมื่อค่าใดค่าหนึ่งเปลี่ยน

### ข้อจำกัดและข้อควรระวัง

- ไม่ควรเก็บ `filteredProducts` เป็น State เพิ่ม เพราะเป็นค่าที่หาได้จาก State เดิมและเสี่ยงข้อมูลไม่ตรงกัน
- หาก State ที่เกี่ยวข้องเพิ่มจำนวนมากหรือมีเงื่อนไขการเปลี่ยนซับซ้อน ควรพิจารณา Reducer
- Input ต้องมี Label และปุ่มล้างต้องมี `aria-label`

## useMemo

### หลักการทำงานและตำแหน่งที่ใช้

`App.jsx` คำนวณรายการที่แสดงจากข้อมูลเมนูคงที่ Search และ Category:

```js
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
```

ดังนั้นการเปลี่ยนตะกร้าจะไม่ต้อง filter เมนูใหม่ `CartContext.jsx` ยังใช้ `useMemo` คำนวณ `totalItems`, `totalPrice` และ Context value จาก `cart`

### เหตุผลและข้อดี

ค่าทั้งสามเป็น derived data ที่ต้องวน Array จึงเหมาะกับการจำผลลัพธ์ตาม dependency ทำให้เจตนาว่า “คำนวณใหม่เมื่อข้อมูลต้นทางเปลี่ยน” ชัดเจน และช่วยไม่ให้ Component ที่ memoized ทำงานจาก reference ใหม่โดยไม่จำเป็น

### ข้อจำกัดและข้อควรระวัง

- `useMemo` ไม่ใช่ที่เก็บข้อมูลถาวร React สามารถคำนวณใหม่ได้
- Dependency ต้องครบ หากขาดจะได้ค่าล้าสมัย
- ไม่ควรใช้กับการคำนวณเล็กน้อยทุกจุด เพราะตัว Hook เองมีต้นทุนและทำให้โค้ดซับซ้อนขึ้น
- Search ใช้ `trim()` และเปลี่ยนตัวพิมพ์ทั้งสองฝั่ง เพื่อให้คำบางส่วนและตัวพิมพ์ต่างกันยังค้นหาได้
