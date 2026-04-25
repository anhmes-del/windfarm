from datetime import date, datetime
from typing import Optional
from pydantic import BaseModel


class DocumentBase(BaseModel):
    document_no: str
    revision: str
    title: str
    doc_date: Optional[date] = None
    sender: Optional[str] = None
    receiver: Optional[str] = None
    type_of_document: Optional[str] = None
    discipline: Optional[str] = None
    issue_purpose: Optional[str] = None
    transmittal_no: Optional[str] = None
    due_date: Optional[date] = None
    reply_date: Optional[date] = None


class DocumentCreate(DocumentBase):
    file_path: str


class DocumentOut(DocumentBase):
    id: int
    status: str
    overdue_days: int
    created_at: datetime

    class Config:
        from_attributes = True


class WorkflowAction(BaseModel):
    action: str
    comment: Optional[str] = None
    actor_id: int


class DashboardSummary(BaseModel):
    total_documents: int
    open_documents: int
    closed_documents: int
    overdue_documents: int
