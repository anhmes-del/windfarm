from fastapi import FastAPI
from .database import Base, engine
from .routes import documents, dashboard, qa, auth, reports

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Windfarm EPC DMS", version="0.1.0")

app.include_router(auth.router)
app.include_router(documents.router)
app.include_router(dashboard.router)
app.include_router(qa.router)
app.include_router(reports.router)


@app.get("/health")
def health_check():
    return {"status": "ok"}
