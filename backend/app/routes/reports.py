from io import BytesIO
from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Document

router = APIRouter(prefix="/reports", tags=["reports"])


@router.get("/master-document-register.pdf")
def export_mdr_report(db: Session = Depends(get_db)):
    docs = db.query(Document).order_by(Document.document_no.asc()).all()

    buffer = BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=A4)
    pdf.drawString(40, 800, "Master Document Register")

    y = 770
    for doc in docs[:40]:
        pdf.drawString(40, y, f"{doc.document_no} | Rev {doc.revision} | {doc.title[:80]}")
        y -= 16

    pdf.save()
    buffer.seek(0)
    return StreamingResponse(buffer, media_type="application/pdf")
