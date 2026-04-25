from sqlalchemy import func
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Document, WorkflowStatus
from ..schemas import DashboardSummary

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/summary", response_model=DashboardSummary)
def summary(db: Session = Depends(get_db)):
    total = db.query(func.count(Document.id)).scalar() or 0
    open_docs = db.query(func.count(Document.id)).filter(Document.status != WorkflowStatus.closed).scalar() or 0
    closed_docs = db.query(func.count(Document.id)).filter(Document.status == WorkflowStatus.closed).scalar() or 0
    overdue_docs = db.query(func.count(Document.id)).filter(Document.overdue_days > 0).scalar() or 0

    return DashboardSummary(
        total_documents=total,
        open_documents=open_docs,
        closed_documents=closed_docs,
        overdue_documents=overdue_docs,
    )


@router.get("/by-type")
def by_type(db: Session = Depends(get_db)):
    rows = (
        db.query(Document.type_of_document, func.count(Document.id))
        .group_by(Document.type_of_document)
        .all()
    )
    return [{"type": r[0] or "Unknown", "count": r[1]} for r in rows]


@router.get("/by-discipline")
def by_discipline(db: Session = Depends(get_db)):
    rows = (
        db.query(Document.discipline, func.count(Document.id))
        .group_by(Document.discipline)
        .all()
    )
    return [{"discipline": r[0] or "Unknown", "count": r[1]} for r in rows]
