from datetime import date, datetime
from enum import Enum
from sqlalchemy import Column, String, Date, DateTime, Integer, Text, ForeignKey, Enum as SAEnum
from sqlalchemy.orm import relationship
from .database import Base


class Role(str, Enum):
    admin = "ADMIN"
    pm = "PM"
    qaqc = "QAQC"
    doc_controller = "DOC_CONTROLLER"
    reviewer = "REVIEWER"


class IssuePurpose(str, Enum):
    ifi = "IFI"
    ifa = "IFA"
    ifr = "IFR"
    ifc = "IFC"
    asb = "ASB"
    ifv = "IFV"


class WorkflowStatus(str, Enum):
    draft = "DRAFT"
    submitted = "SUBMITTED"
    review = "REVIEW"
    commented = "COMMENTED"
    resubmitted = "RESUBMITTED"
    approved = "APPROVED"
    closed = "CLOSED"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    full_name = Column(String(120), nullable=False)
    role = Column(SAEnum(Role, name="role_enum"), nullable=False)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    document_no = Column(String(100), unique=True, nullable=False, index=True)
    revision = Column(String(20), nullable=False)
    title = Column(String(255), nullable=False)
    doc_date = Column(Date)
    sender = Column(String(120))
    receiver = Column(String(120))
    type_of_document = Column(String(100), index=True)
    discipline = Column(String(100), index=True)
    issue_purpose = Column(SAEnum(IssuePurpose, name="issue_purpose_enum"), nullable=True)
    transmittal_no = Column(String(100), index=True)
    status = Column(SAEnum(WorkflowStatus, name="workflow_status_enum"), default=WorkflowStatus.draft)
    due_date = Column(Date)
    reply_date = Column(Date)
    overdue_days = Column(Integer, default=0)
    file_path = Column(String(500), nullable=False)
    extracted_text = Column(Text)
    created_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    workflow_events = relationship("WorkflowEvent", back_populates="document")


class WorkflowEvent(Base):
    __tablename__ = "workflow_events"

    id = Column(Integer, primary_key=True)
    document_id = Column(Integer, ForeignKey("documents.id"), nullable=False)
    action = Column(String(50), nullable=False)
    comment = Column(Text)
    actor_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    document = relationship("Document", back_populates="workflow_events")


class Transmittal(Base):
    __tablename__ = "transmittals"

    id = Column(Integer, primary_key=True)
    transmittal_no = Column(String(100), unique=True, nullable=False)
    sender = Column(String(120), nullable=False)
    receiver = Column(String(120), nullable=False)
    submitted_date = Column(Date, default=date.today)
    subject = Column(String(255))
    status = Column(String(30), default="OPEN")
