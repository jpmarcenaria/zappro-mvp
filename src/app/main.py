from fastapi import FastAPI

from app import __version__
from app.api.routes import router as api_router
from app.core.config import get_settings


settings = get_settings()

app = FastAPI(
    title=settings.APP_NAME,
    version=__version__,
    docs_url="/docs",
    redoc_url="/redoc",
)

app.include_router(api_router, prefix="/api")


@app.get("/", tags=["meta"])
def root() -> dict[str, str]:
    return {"message": f"{settings.APP_NAME} up", "env": settings.APP_ENV}

