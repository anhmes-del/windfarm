import re
from datetime import datetime
from pathlib import Path
from pypdf import PdfReader


def extract_text_from_pdf(file_path: str) -> str:
    reader = PdfReader(file_path)
    return "\n".join(page.extract_text() or "" for page in reader.pages)


def extract_metadata(text: str) -> dict:
    patterns = {
        "document_no": r"Document\s*No\.?\s*[:\-]\s*([A-Z0-9\-_/]+)",
        "revision": r"Rev(?:ision)?\s*[:\-]\s*([A-Z0-9.]+)",
        "title": r"Title\s*[:\-]\s*(.+)",
        "transmittal_no": r"Transmittal\s*No\.?\s*[:\-]\s*([A-Z0-9\-_/]+)",
    }

    metadata = {}
    for key, pattern in patterns.items():
        match = re.search(pattern, text, flags=re.IGNORECASE)
        metadata[key] = match.group(1).strip() if match else None

    metadata["doc_date"] = datetime.utcnow().date()
    return metadata


def save_uploaded_file(file_name: str, content: bytes, base_dir: str = "storage") -> str:
    folder = Path(base_dir)
    folder.mkdir(parents=True, exist_ok=True)
    path = folder / file_name
    path.write_bytes(content)
    return str(path)
