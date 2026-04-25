# Windfarm EPC Document Management System (Internal Web App)

Ứng dụng nội bộ quản lý hồ sơ EPC điện gió chạy trên Chrome, gồm:
- Upload PDF/Excel/Word hàng loạt.
- Trích xuất metadata tự động.
- MDR, Transmittal Log, Schedule 8 tracker.
- Workflow submit → review → comment → resubmit → approve → close.
- AI Q&A có nguồn file/trang/document no.
- Dashboard theo KPI dự án EPC.

## 1) Architecture đề xuất

- **Frontend:** React + Vite + Tailwind + UI style theo shadcn.
- **Backend:** FastAPI (REST API).
- **Database:** PostgreSQL + pgvector.
- **Storage:** Local (`/storage`) hoặc S3-compatible.
- **OCR:** Tesseract (cho scan PDF) + parser cho native text.
- **Search:** PostgreSQL full-text + vector semantic search.
- **AI:** OpenAI-compatible API cho RAG Q&A.

## 2) Cấu trúc thư mục

```txt
backend/
  app/
    main.py
    models.py
    schemas.py
    extraction.py
    workflow.py
    routes/
  sql/
    schema.sql
    sample_data.sql
frontend/
  src/
    pages/
    components/
```

## 3) Database schema

- Script DDL: `backend/sql/schema.sql`
- Sample data EPC: `backend/sql/sample_data.sql`

Các thực thể chính:
- `users` (Admin/PM/QAQC/Document Controller/Reviewer)
- `documents` (metadata đầy đủ + embedding)
- `transmittals`
- `workflow_events`

## 4) API endpoints

### Authentication
- `POST /auth/login`

### Documents
- `POST /documents/upload` (multi-part upload)
- `GET /documents`
- `POST /documents/{id}/workflow`

### Dashboard
- `GET /dashboard/summary`
- `GET /dashboard/by-type`
- `GET /dashboard/by-discipline`

### AI Q&A
- `POST /qa/ask`

### Reports
- `GET /reports/master-document-register.pdf`

## 5) Workflow logic

Luồng trạng thái:
- `DRAFT -> SUBMITTED -> REVIEW -> COMMENTED -> RESUBMITTED -> REVIEW -> APPROVED -> CLOSED`

Actions hợp lệ:
- DRAFT: `SUBMIT`
- SUBMITTED: `REVIEW`
- REVIEW: `COMMENT` hoặc `APPROVE`
- COMMENTED: `RESUBMIT`
- RESUBMITTED: `REVIEW`
- APPROVED: `CLOSE`

## 6) UI screens

- Dashboard KPI + chart.
- Master Document Register table.
- Transmittal Log.
- Schedule 8 Compliance.
- Workflow board.
- AI Q&A với sources.

## 7) Chạy local trên Windows

### Yêu cầu
- Python 3.11+
- Node.js 20+
- PostgreSQL 15+ (cài extension pgvector)

### Backend
```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
set DATABASE_URL=postgresql+psycopg2://postgres:postgres@localhost:5432/windfarm_dms
uvicorn app.main:app --reload --port 8000
```

### Database bootstrap
```powershell
psql -U postgres -d windfarm_dms -f backend/sql/schema.sql
psql -U postgres -d windfarm_dms -f backend/sql/sample_data.sql
```

### Frontend
```powershell
cd frontend
npm install
set VITE_API_URL=http://localhost:8000
npm run dev
```
Mở Chrome tại `http://localhost:5173`.

## 8) Gợi ý nâng cấp production

- JWT auth + RBAC theo role.
- Celery/RQ worker cho OCR + embedding async.
- S3 presigned URL upload.
- Audit trail + approval matrix theo discipline.
- Export PDF/Excel mẫu EPC chuẩn Chủ đầu tư.
