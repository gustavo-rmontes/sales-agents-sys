# Roadmap de Implementação – MVP "Prospecção Inteligente de Leads"
## Fase 1 — Preparação do ambiente
- Criar repositório GitHub com estrutura inicial (`backend/`, `frontend/`).
- Configurar `pyproject.toml` com dependências (FastAPI, CrewAI, Gemini SDK, etc.).
- Configurar `.env` para armazenar API Key do Gemini.
- Criar `README.md` inicial com instruções básicas de setup.

## Fase 2 — Backend básico
- Inicializar API com FastAPI:
  - Criar `main.py` com rota health-check (`/health`).
  - Configurar Uvicorn para rodar localmente.

- Organizar estrutura:
  - `api/` → rotas (/prospect).
  - `agents/` → definição dos agentes (researcher.py, analyst.py, copywriter.py, orchestrator.py) em .py ou .yaml
  - `services/` → integrações (scraping fake/mock nesta fase).
  - `core/` → configs (carregar .env, logging).

## Fase 3 — Implementação dos agentes
- Agente Pesquisador
  - Entrada: nome/site da empresa.
  - Saída mockada: JSON com breve descrição da empresa + dados fictícios.

- Agente Analista
  - Entrada: dados do pesquisador.
  - Saída: resumo estruturado (empresa, dores do setor, concorrentes).
  - Usar Gemini para processar texto.

- Agente Copywriter
  - Entrada: resumo do analista.
  - Saída: mensagem de prospecção em formato de email.
  - Usar prompt estruturado no Gemini.

- Agente Orquestrador (CrewAI)
  - Coordena a execução sequencial (pesquisador → analista → copywriter).
  - Retorna resposta final consolidada.

## Fase 4 — API de prospecção
Criar endpoint `/prospect` que:
- Recebe {"company_name": "...", "website": "..."}.
- Dispara orquestrador.
- Retorna JSON com:
  - resumo empresa,
  - concorrentes,
  - mensagem de prospecção.

## Fase 5 — Frontend simples
- Criar index.html com form (input nome/site da empresa).
- Enviar requisição via JS fetch para backend.
- Mostrar resposta formatada em tela (caixa com resumo + email sugerido).
- Usar Bootstrap para layout rápido.

## Fase 6 — Refinamentos
- Adicionar logs com `loguru`.
- Melhorar prompts dos agentes (prompt engineering).
- Documentar no README como rodar o sistema.
- Escrever 1–2 testes unitários simples (mockando resposta do Gemini).

## Fase 7 — Entrega
- Publicar repositório no GitHub.
- Documentar a arquitetura e funcionamento da aplicação..


## Escopo do MVP:
- Fluxo ponta a ponta funcionando (frontend ↔ backend ↔ agentes). 
- Ênfase no uso de multi-agentes + Gemini.