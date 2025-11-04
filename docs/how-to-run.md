# Como rodar — Python FastAPI

Pré‑requisitos: Python 3.11+, make, git

1) Instalar dependências (ambiente local)
- `make setup`

2) Rodar em desenvolvimento (reload)
- `make dev`
- Acesse: http://localhost:8000
- Docs: http://localhost:8000/docs

3) Testes e qualidade
- `make test`
- `make lint`
- `make fmt`

4) Variáveis de ambiente
- Copie `.env.example` para `.env` e ajuste se necessário
  - `APP_NAME`, `APP_ENV`, `DEBUG`

5) Produção (básico)
- `make run` (sem reload)
- Para produção real, use um process manager (systemd/supervisor) ou conteinerize (Docker)

6) Estrutura relevante
- `src/app/main.py`: criação do FastAPI e rotas principais
- `src/app/api/routes.py`: endpoints (`/api/healthz`, `/api/version`)
- `tests/`: testes com `pytest`
