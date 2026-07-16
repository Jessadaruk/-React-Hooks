# Coffee Shop Ordering System using React Hooks

เว็บแอปพลิเคชันหน้าเดียวสำหรับเลือกรายการเครื่องดื่มและขนมของร้าน **Hearth & Bean Coffee** ผู้ใช้ค้นหาและกรองเมนู เพิ่มสินค้า ปรับจำนวน ดูยอดรวม และเก็บตะกร้าไว้ในเบราว์เซอร์ได้ ออกแบบให้ใช้งานได้ตั้งแต่โทรศัพท์มือถือถึงจอเดสก์ท็อป

## ความสามารถของระบบ

- แสดงเมนู 13 รายการ ครบหมวด Coffee, Tea, Bakery และ Dessert
- ค้นหาจากชื่อแบบทันที รองรับคำบางส่วนและไม่สนใจตัวพิมพ์ใหญ่/เล็ก
- กรองหมวดหมู่และใช้ร่วมกับการค้นหาได้
- เพิ่มสินค้าเดิมแล้วรวมจำนวนโดยไม่สร้างรายการซ้ำ
- เพิ่ม ลด หรือลบสินค้า และล้างตะกร้าทั้งหมด
- แสดงราคาต่อหน่วย ราคารวมต่อรายการ จำนวนรวม และยอดรวมเป็นเงินบาท
- ลดจำนวนจาก 1 แล้วนำสินค้านั้นออกจากตะกร้า
- ยืนยันคำสั่งซื้อแบบจำลองและล้างตะกร้าหลังยืนยัน
- บันทึกตะกร้าใน Local Storage และป้องกันข้อมูลเสียไม่ให้เว็บพัง
- มี Empty State, Focus State และป้ายกำกับสำหรับโปรแกรมอ่านหน้าจอ
- Responsive ที่ 375px, 768px, 1024px และ 1440px

## เทคโนโลยีที่ใช้

- React + Vite
- JavaScript (ES Modules)
- CSS ปกติ: Variables, Grid, Flexbox และ Media Queries
- React Hooks และ Context API
- Local Storage
- ESLint และ Node.js Test Runner
- Git

## React Hooks ที่ใช้

| Hook | ตำแหน่งหลัก | หน้าที่ |
| --- | --- | --- |
| `useState` | `App.jsx`, `ProductCard.jsx`, `CartContext.jsx` | ข้อความค้นหา หมวดหมู่ สถานะรูปภาพ และสถานะโหลดตะกร้า |
| `useReducer` | `CartContext.jsx` | เปลี่ยน State ตะกร้าผ่าน Action ที่ชัดเจน |
| `useContext` | `useCart.js` | ให้ Component เข้าถึงตะกร้าโดยไม่ส่ง Props หลายชั้น |
| `useEffect` | `useLocalStorage.js`, `CartContext.jsx` | โหลด ตรวจสอบ และบันทึกตะกร้า |
| `useMemo` | `App.jsx`, `CartContext.jsx` | กรองสินค้า คำนวณจำนวนรวม ยอดรวม และ Context value |
| `useCallback` | `useLocalStorage.js`, `CartContext.jsx` | ทำให้ฟังก์ชันที่ส่งต่อไป Component ลูกมี reference คงที่ |
| Custom Hooks | `useCart.js`, `useLocalStorage.js` | รวมตรรกะ Context และ Local Storage ที่ใช้ซ้ำได้ |

รายละเอียดพร้อมตัวอย่างจากโค้ดอยู่ใน [`docs/hooks-explanation.md`](docs/hooks-explanation.md)

## โครงสร้างโปรเจกต์

```text
coffee-shop-ordering-system/
├── docs/
│   ├── hooks-explanation.md
│   ├── เจษฎารักษ์-วิชาไชย.md
│   ├── โสภณวิชญ์-แก้วศิลา.md
│   ├── ปลวัชร-สุทธมา.md
│   ├── contribution-summary.md
│   └── discussion-answers.md
├── src/
│   ├── components/
│   ├── context/CartContext.jsx
│   ├── data/menu.js
│   ├── hooks/
│   ├── reducers/
│   ├── utils/formatCurrency.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

## การติดตั้งและเปิดใช้งาน

ต้องมี Node.js เวอร์ชัน 20 ขึ้นไป จากนั้นเปิด Terminal ในโฟลเดอร์โปรเจกต์และรัน:

```bash
npm install
npm run dev
```

เปิด URL ที่ Vite แสดงใน Terminal (โดยทั่วไปคือ `http://localhost:5173`)

## คำสั่งที่ใช้

```bash
npm run dev       # เปิดโหมดพัฒนา
npm run lint      # ตรวจคุณภาพโค้ด
npm test          # ทดสอบ cartReducer
npm run build     # สร้างไฟล์สำหรับเผยแพร่
npm run preview   # ทดลองเปิดผลลัพธ์จาก build
```

## วิธีทดสอบระบบด้วยตนเอง

1. ตรวจว่าเมนูแสดง 13 รายการและครบ 4 หมวดหมู่
2. ค้นหา `latte`, `LATTE` และ `row` เพื่อทดสอบชื่อเต็ม ตัวพิมพ์ และคำบางส่วน
3. เลือกหมวด Coffee พร้อมค้นหา `tea` เพื่อตรวจ Empty State
4. เพิ่ม Espresso สองครั้ง ต้องมีรายการเดียวและจำนวนเป็น 2
5. กด `+`, `−` และ “ลบ” แล้วตรวจจำนวนกับยอดเงิน
6. รีเฟรชหน้า ตะกร้าต้องคงอยู่
7. เปิด Developer Tools แล้วแก้ `coffee-shop-cart` เป็นข้อความที่ไม่ใช่ JSON จากนั้นรีเฟรช หน้าเว็บต้องยังเปิดได้และตะกร้าเริ่มว่าง
8. ทดสอบปุ่มล้างตะกร้าและยืนยันคำสั่งซื้อ
9. ทดสอบความกว้าง 375px, 768px, 1024px และ 1440px โดยต้องไม่มีแถบเลื่อนแนวนอน
10. ใช้ปุ่ม Tab เดินผ่านช่องค้นหา ตัวกรอง ปุ่มสินค้า และตะกร้า เพื่อตรวจ Focus State

## ภาพรวมการจัดการ State

`App` เก็บ Search และ Category ด้วย `useState` แล้วใช้ `useMemo` สร้างรายการที่ต้องแสดง ตะกร้าถูกจัดการโดย `cartReducer` ภายใน `CartProvider` และเผยแพร่ผ่าน `CartContext` ฟังก์ชันแก้ไขตะกร้าถูกห่อด้วย `useCallback` ส่วน `useLocalStorage` โหลดและบันทึกข้อมูลด้วย `useEffect` หลังตรวจรูปแบบข้อมูลแล้ว

```text
UI → useCart() → CartContext → dispatch → cartReducer
                                   ↓
                           useLocalStorage → browser storage
```

## การตรวจสอบ Props

โปรเจกต์ไม่ติดตั้ง PropTypes เพื่อลด dependency ที่ไม่จำเป็น ข้อมูลทั้งหมดมาจาก `menu.js` และ Context ที่ควบคุมภายในโปรเจกต์ โดยมีการตรวจข้อมูลจาก Local Storage ก่อนนำเข้า State หากพัฒนาต่อในระบบขนาดใหญ่ แนะนำให้เปลี่ยนเป็น TypeScript เพื่อให้ตรวจ Props ได้ตั้งแต่ขั้นตอน Build

## ข้อจำกัด

- ตะกร้าถูกเก็บเฉพาะในเบราว์เซอร์และอุปกรณ์ปัจจุบัน
- ไม่มี Backend, บัญชีผู้ใช้, สต็อกสินค้า หรือระบบชำระเงินจริง
- รูปเมนูโหลดจาก Unsplash; หากเครือข่ายขัดข้องจะแสดงภาพสำรองตามหมวดหมู่
- การยืนยันคำสั่งซื้อเป็นเพียงการจำลองด้วยข้อความจากเบราว์เซอร์

## แนวทางพัฒนาต่อ

- เพิ่มตัวเลือกขนาด ความหวาน นม และหมายเหตุรายสินค้า
- เพิ่มใบเสร็จและประวัติคำสั่งซื้อ
- เพิ่ม Progressive Web App สำหรับใช้งานออฟไลน์
- เพิ่มชุดทดสอบ Component และ Accessibility แบบอัตโนมัติ
- เชื่อม API และระบบชำระเงินจริงเมื่อมี Backend ที่เหมาะสม

## สมาชิกในกลุ่ม

| ลำดับ | ชื่อ-นามสกุล | รหัสนักศึกษา | หน้าที่รับผิดชอบ |
| --- | --- | --- | --- |
| 1 | `[นาย เจษฎารักษ์ วิชาไชย]` | `[673450207-3]` | รับผิดชอบศึกษา อธิบาย และตรวจสอบ useReducer, useContext และระบบตะกร้า |
| 2 | `[นายโสภณวิชญ์ แก้วศิลา]` | `[673450209-9]` | รับผิดชอบศึกษา อธิบาย และตรวจสอบ useState, useMemo, การค้นหาและกรอง |
| 3 | `[นาย ปลวัชร สุทธมา]` | `[673450473-2]` | รับผิดชอบศึกษา อธิบาย และตรวจสอบ useEffect, useCallback, Custom Hooks, Local Storage และ Responsive |

## การแบ่งหน้าที่

บทบาทและไฟล์ที่เกี่ยวข้องสรุปไว้ใน [`docs/contribution-summary.md`](docs/contribution-summary.md) พร้อมเอกสารรายบุคคลที่ตั้งชื่อไฟล์ตามชื่อนักศึกษา แต่ละไฟล์อธิบายฟังก์ชัน หลักการทำงาน ตัวอย่างโค้ด เหตุผลที่เลือกใช้ ข้อดี และข้อจำกัดจาก Source Code จริงของโปรเจกต์

## คำถามอภิปรายท้ายใบงาน

คำตอบคำถามอภิปรายทั้ง 4 ข้อ พร้อมการอธิบายที่เชื่อมโยงกับ Source Code จริงของโปรเจกต์ อยู่ในไฟล์ [`docs/discussion-answers.md`](docs/discussion-answers.md)

## ผู้จัดทำและ Repository

- ชื่อผู้จัดทำ: `[ชื่อ-นามสกุล]`
- รหัสนักศึกษา: `[รหัสนักศึกษา]`
- GitHub Repository: `[GitHub URL]`
