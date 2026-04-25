# Windfarm EPC DMS (Frontend-first, newbie friendly)

Ứng dụng quản lý hồ sơ EPC điện gió theo hướng **frontend chạy độc lập bằng mock data** (không phụ thuộc backend ở giai đoạn này).

## Cấu trúc project hiện tại

```text
project-root/
  package.json
  README.md
  vercel.json
  frontend/
    package.json
    index.html
    vite.config.js
    src/
      main.jsx
      App.jsx
      styles.css
  backend/
    requirements.txt
    app/
```

## 1) Chạy local trên Windows (từ thư mục gốc)

```bash
git clone <repo-url>
cd <project-folder>
npm install
npm run dev
```

Mở Chrome tại:

```text
http://localhost:5173
```

## 2) Chạy trực tiếp trong frontend

```bash
cd frontend
npm install
npm run dev
```

## 3) Scripts chính ở root

```bash
npm run check-structure   # kiểm tra cấu trúc
npm run dev               # chạy frontend qua root
npm run build             # build frontend
npm run start             # preview bản build
npm run install:all       # cài frontend (backend để sau)
```

## 4) Deploy frontend lên Vercel

Thiết lập project trên Vercel:

- **Framework Preset:** Vite
- **Root Directory:** frontend
- **Build Command:** npm run build
- **Output Directory:** dist
- **Install Command:** npm install

`vercel.json` đã được tối giản (không dùng `experimentalServices`) để ưu tiên deploy frontend trước.

## 5) Backend chưa deploy vẫn chạy được?

Có. Frontend tự kiểm tra backend:
- Nếu backend có sẵn: dùng API.
- Nếu backend chưa có/chưa deploy: tự fallback sang **mock data mode** để dashboard và các màn hình vẫn hoạt động.

## 6) Tính năng giao diện có sẵn (mock mode)

- Dashboard (Total/Open/Closed/Overdue)
- Documents (Master Document Register)
- Transmittals (Transmittal Log)
- Schedule 8 Tracking
- Procurement Tracking
- Review Workflow
- AI Assistant (mock)
- Settings

## 7) Lỗi thường gặp và cách xử lý

### a) Thiếu `node_modules`
```bash
npm install
```

### b) `npm install` lỗi
- Kiểm tra Node.js LTS (khuyến nghị Node 20+).
- Xóa lock + cache rồi cài lại:
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### c) Port 5173 bị chiếm
- Tắt app đang chạy port 5173 hoặc chạy Vite với port khác trong `frontend/vite.config.js`.

### d) Vercel build failed
- Kiểm tra đúng settings: `Root Directory=frontend`, `Build=npm run build`, `Output=dist`.
- Kiểm tra project không dùng `experimentalServices`.

### e) Backend chưa chạy
- Không sao, frontend vẫn chạy bằng mock data.
