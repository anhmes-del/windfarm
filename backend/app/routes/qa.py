from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Document

router = APIRouter(prefix="/qa", tags=["qa"])


class QARequest(BaseModel):
    question: str


@router.post("/ask")
def ask_question(payload: QARequest, db: Session = Depends(get_db)):
    docs = db.query(Document).limit(3).all()
    citations = [
        {
            "document_no": d.document_no,
            "file": d.file_path,
            "page": 1,
        }
        for d in docs
    ]
    answer = (
        "AI answer placeholder. Integrate embedding search + OpenAI-compatible LLM here. "
        "Return source file/page/document number with every answer."
    )
    return {"question": payload.question, "answer": answer, "sources": citations}
