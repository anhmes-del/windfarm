from fastapi import APIRouter

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login")
def login(username: str, password: str):
    # Replace with proper JWT + password hashing
    return {
        "access_token": f"mock-token-for-{username}",
        "token_type": "bearer",
        "role": "DOC_CONTROLLER",
    }
