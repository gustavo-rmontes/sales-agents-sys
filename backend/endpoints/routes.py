from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_root():
    """
    Get the root of the API
    """
    return {"message": "API root"}

@router.get("/health")
def get_health():
    """
    Get the health of the application
    """
    return {"message": "Application is healthy"}

@router.post("/prospect")
def post_prospect():
    """
    Post a prospect
    """
    return {"message": "Prospect company route"}