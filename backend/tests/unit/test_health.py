from fastapi.testclient import TestClient

from main import app
from core.config import settings

client = TestClient(app)

def test_get_root():
    response = client.get(settings.API_PREFIX)
    assert response.status_code == 200
    assert response.json() == {"message": "API root"}

def test_get_health():
    response = client.get(settings.API_PREFIX+"/health")
    assert response.status_code == 200
    assert response.json() == {"message": "Application is healthy"}
