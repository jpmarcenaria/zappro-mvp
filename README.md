# Template LLM‑Safe

Este repositório é um template para iniciar projetos com suporte a trabalho por LLMs, mantendo guardrails técnicos e de processo.

## Como usar
1. Duplique este repositório (ou copie a pasta) para um novo projeto.
2. Edite o arquivo PRD.md com seu produto, fases e requisitos.
3. Abra o VS Code (WSL) na raiz e rode `bash scripts/validate.sh`.
4. Peça à LLM: "Leia PRD.md e siga AGENTS.md para iniciar o Bootstrap (Fase 0)." 
5. Abra PRs pequenos e focados; garanta CI verde.

## Guardrails
- Regras para agentes: ver `AGENTS.md`.
- Política legível por máquina: `.codex/policy.json` + `scripts/policy-check.sh`.
- CI: `.github/workflows/ci.yml`.

## Próximos passos
- A partir do PRD, a LLM deve:
  - Propor plano, criar skeleton em `src/`, `tests/`, `docs/`.
  - Atualizar `README.md`, `docs/architecture.md`, `docs/how-to-run.md`.
  - Manter mudanças pequenas e justificadas.
