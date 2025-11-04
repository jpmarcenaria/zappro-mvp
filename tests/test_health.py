from fastapi.testclient import TestClient

from app.main import app
from app import __version__


client = TestClient(app)


def test_healthz() -> None:
    resp = client.get("/api/healthz")
    assert resp.status_code == 200
    assert resp.json() == {"status": "ok"}


def test_version() -> None:
    resp = client.get("/api/version")
    assert resp.status_code == 200
    assert resp.json() == {"version": __version__}

