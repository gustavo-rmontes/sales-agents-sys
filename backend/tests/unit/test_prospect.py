from fastapi.testclient import TestClient

from main import app
from core.config import settings

client = TestClient(app)

# TODO: implement test_post_prospect function
def test_post_prospect():
    path_parameters = ["nome_da_empresa=Google", "website=https://google.com"]  
    response = client.get(settings.API_PREFIX+"/prospect?"+path_parameters[0]+"&"+path_parameters[1])
    assert response is not None     