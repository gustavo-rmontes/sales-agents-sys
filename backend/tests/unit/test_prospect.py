from fastapi.testclient import TestClient

from main import app
from core.config import settings

client = TestClient(app)

def test_post_prospect():
    response = client.post(settings.API_PREFIX+"/prospect")
    assert response.json() == {"message": "Prospect company route"}