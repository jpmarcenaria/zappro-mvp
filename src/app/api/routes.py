from fastapi import APIRouter

from app import __version__


router = APIRouter()


@router.get("/healthz", tags=["health"])
def healthz() -> dict[str, str]:
    return {"status": "ok"}


@router.get("/version", tags=["health"])
def version() -> dict[str, str]:
    return {"version": __version__}

