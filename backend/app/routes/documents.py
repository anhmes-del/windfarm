from datetime import date
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Document, WorkflowEvent
from ..schemas import DocumentOut, WorkflowAction
from ..extraction import extract_text_from_pdf, extract_metadata, save_uploaded_file
from ..workflow import can_transition, next_state

router = APIRouter(prefix="/documents", tags=["documents"])


@router.post("/upload", response_model=DocumentOut)
async def upload_document(file: UploadFile = File(...), db: Session = Depends(get_db)):
    raw = await file.read()
    file_path = save_uploaded_file(file.filename, raw)
    text = extract_text_from_pdf(file_path) if file.filename.lower().endswith(".pdf") else ""
    metadata = extract_metadata(text)

    doc = Document(
        document_no=metadata.get("document_no") or f"TEMP-{date.today().strftime('%Y%m%d')}",
        revision=metadata.get("revision") or "0",
        title=metadata.get("title") or file.filename,
        doc_date=metadata.get("doc_date"),
        transmittal_no=metadata.get("transmittal_no"),
        file_path=file_path,
        extracted_text=text,
    )
    db.add(doc)
    db.commit()
    db.refresh(doc)
    return doc


@router.get("", response_model=list[DocumentOut])
def list_documents(db: Session = Depends(get_db)):
    docs = db.query(Document).order_by(Document.created_at.desc()).all()
    return docs


@router.post("/{document_id}/workflow", response_model=DocumentOut)
def apply_workflow_action(document_id: int, payload: WorkflowAction, db: Session = Depends(get_db)):
    doc = db.query(Document).filter(Document.id == document_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")

    if not can_transition(doc.status, payload.action):
        raise HTTPException(status_code=400, detail=f"Action {payload.action} is invalid from {doc.status}")

    doc.status = next_state(payload.action)
    event = WorkflowEvent(
        document_id=document_id,
        action=payload.action,
        comment=payload.comment,
        actor_id=payload.actor_id,
    )
    db.add(event)
    db.add(doc)
    db.commit()
    db.refresh(doc)
    return doc
