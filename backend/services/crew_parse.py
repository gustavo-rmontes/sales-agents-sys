import json
from schemas.prospect import ProspeccaoResposta

def parse_crew_response(crew_response):
    """
    Converte a resposta da crew para os schemas Pydantic definidos.
    
    Args:
        crew_response: CrewOutput da crew
    
    Returns:
        ProspeccaoResposta: Objeto Pydantic com todos os dados estruturados
    """
    try:
        # A crew retorna um CrewOutput, precisamos extrair o JSON
        if hasattr(crew_response, 'raw'):
            # Tenta extrair JSON do raw output
            raw_output = crew_response.raw
        elif hasattr(crew_response, 'tasks_output'):
            # Tenta extrair da última task (consolidador)
            raw_output = crew_response.tasks_output[-1].raw if crew_response.tasks_output else ""
        else:
            raw_output = str(crew_response)
        
        # Se a resposta for string, converte para dict
        if isinstance(raw_output, str):
            # Tenta extrair JSON da string (pode conter texto antes/depois)
            import re
            json_match = re.search(r'\{.*\}', raw_output, re.DOTALL)
            if json_match:
                data = json.loads(json_match.group())
            else:
                data = json.loads(raw_output)
        else:
            data = raw_output
        
        # Extrai os dados de cada seção
        empresa_data = data.get("empresa", {})
        analise_data = data.get("analise", {})
        mensagem_data = data.get("mensagem_prospeccao", {})
        
        # Cria a resposta consolidada diretamente
        prospeccao_resposta = ProspeccaoResposta(
            # Dados da empresa
            nome_da_empresa=empresa_data.get("nome_da_empresa", ""),
            website=empresa_data.get("website", ""),
            setor=empresa_data.get("setor", ""),
            porte=empresa_data.get("porte", ""),
            descricao=empresa_data.get("descricao", ""),
            produtos_servicos=empresa_data.get("produtos_servicos", []),
            localizacao=empresa_data.get("localizacao", ""),
            faturamento_estimado=empresa_data.get("faturamento_estimado", ""),
            funcionarios_estimado=empresa_data.get("funcionarios_estimado", ""),
            
            # Dados da análise
            resumo_empresa=analise_data.get("resumo_empresa", ""),
            dores_setor=analise_data.get("dores_setor", []),
            concorrentes=analise_data.get("concorrentes", []),
            tendencias_mercado=analise_data.get("tendencias_mercado", []),

            # Dados da mensagem
            assunto=mensagem_data.get("assunto", ""),
            corpo_email=mensagem_data.get("corpo_email", ""),
            call_to_action=mensagem_data.get("call_to_action", ""),
            personalizacao=mensagem_data.get("personalizacao", "")

            # # Dados de Próximos Passos
            # proximos_passos=prox_passos_data.get("proximos_passos", "")
        )
        
        return prospeccao_resposta
        
    except json.JSONDecodeError as e:
        raise ValueError(f"Erro ao fazer parse do JSON da crew: {e}")
    except Exception as e:
        raise ValueError(f"Erro ao processar resposta da crew: {e}")