import json
from services.crew_parse import parse_crew_response
from agents.crew import sales_crew, run_sales_crew

def build_prospect_analysis(nome_da_empresa, website):
    """
    Constrói a análise de prospecção para uma empresa.
    
    Args:
        nome_da_empresa (str): Nome da empresa a ser analisada
        website (str): Website da empresa
    
    Returns:
        ProspeccaoResposta: Análise completa de prospecção
    """
    try:
        response = run_sales_crew(sales_crew, company={"company_name": nome_da_empresa, "website": website})
        return parse_crew_response(response)
    except Exception as e:
        raise ValueError(f"Erro ao construir análise de prospecção: {e}")