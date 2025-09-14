from pydantic import BaseModel 
from typing import List

class EmpresaBase(BaseModel):
    nome_da_empresa: str
    website: str

class Empresa(EmpresaBase):
    setor: str
    porte: str
    descricao: str
    produtos_servicos: List[str]
    localizacao: str
    faturamento_estimado: str
    funcionarios_estimado: str

class Analise(BaseModel):
    resumo_empresa: str
    dores_setor: List[str]
    concorrentes: List[str]
    tendencias_mercado: List[str]

class MensagemProspeccao(BaseModel):
    assunto: str
    corpo_email: str
    call_to_action: str
    personalizacao: str

class ProspeccaoResposta(Empresa, Analise, MensagemProspeccao):
    pass