from fastapi import APIRouter, HTTPException
from schemas.prospect import ProspeccaoResposta

from services import build_prospect_analysis

router = APIRouter()

@router.get("/")
def get_root():
    """
    Retorna o root da aplicação
    """
    return {"message": "API root"}

@router.get("/health")
def get_health():
    """
    Retorna a saúde da aplicação
    """
    return {"message": "Application is healthy"}

@router.post("/prospect", response_model=ProspeccaoResposta)
def prospect_analysis(nome_da_empresa: str, website: str):
    """
    Retorna a análise de mercado da empresa
    """
    try:
        response = build_prospect_analysis(nome_da_empresa, website)
        return response
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno do servidor: {str(e)}")