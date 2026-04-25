CREATE EXTENSION IF NOT EXISTS vector;

CREATE TYPE role_enum AS ENUM ('ADMIN', 'PM', 'QAQC', 'DOC_CONTROLLER', 'REVIEWER');
CREATE TYPE issue_purpose_enum AS ENUM ('IFI', 'IFA', 'IFR', 'IFC', 'ASB', 'IFV');
CREATE TYPE workflow_status_enum AS ENUM ('DRAFT', 'SUBMITTED', 'REVIEW', 'COMMENTED', 'RESUBMITTED', 'APPROVED', 'CLOSED');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(120) NOT NULL,
    role role_enum NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE transmittals (
    id SERIAL PRIMARY KEY,
    transmittal_no VARCHAR(100) UNIQUE NOT NULL,
    sender VARCHAR(120) NOT NULL,
    receiver VARCHAR(120) NOT NULL,
    submitted_date DATE DEFAULT CURRENT_DATE,
    subject VARCHAR(255),
    status VARCHAR(30) DEFAULT 'OPEN'
);

CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    document_no VARCHAR(100) UNIQUE NOT NULL,
    revision VARCHAR(20) NOT NULL,
    title VARCHAR(255) NOT NULL,
    doc_date DATE,
    sender VARCHAR(120),
    receiver VARCHAR(120),
    type_of_document VARCHAR(100),
    discipline VARCHAR(100),
    issue_purpose issue_purpose_enum,
    transmittal_no VARCHAR(100),
    status workflow_status_enum DEFAULT 'DRAFT',
    due_date DATE,
    reply_date DATE,
    overdue_days INTEGER DEFAULT 0,
    file_path VARCHAR(500) NOT NULL,
    extracted_text TEXT,
    embedding vector(1536),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE workflow_events (
    id SERIAL PRIMARY KEY,
    document_id INTEGER NOT NULL REFERENCES documents(id),
    action VARCHAR(50) NOT NULL,
    comment TEXT,
    actor_id INTEGER NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_documents_type ON documents(type_of_document);
CREATE INDEX idx_documents_discipline ON documents(discipline);
CREATE INDEX idx_documents_status ON documents(status);
CREATE INDEX idx_documents_embedding ON documents USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
