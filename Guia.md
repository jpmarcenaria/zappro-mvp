# Guia — Operação LLM (Bootstrap → PR → CI/CD)

Este guia descreve, passo a passo, como uma LLM (ou você) deve usar este template orientado por PRD.

## 1) Prepare o PRD
- Edite `PRD.md` e preencha a Seção 0 (Stack e Dependências) e demais seções essenciais.
- Confirme Fases (0→6) e critérios de aceitação.

## 2) Plano da LLM
- A LLM deve ler `PRD.md` e propor um plano curto (passos) para a Fase 0 (Bootstrap).
- Plano deve apontar arquivos a criar/editar e validações a executar.

## 3) Bootstrap (Fase 0)
- Criar apenas o necessário para a stack escolhida (Seção 0 do PRD):
  - Estrutura `src/` mínima + endpoint/rota de saúde
  - Arquivos de dependências (ex.: `requirements.txt` ou `package.json`)
  - Scripts de `fmt`, `lint`, `test`, `dev`, `run` (via `Makefile`/`justfile`)
  - Atualizar `docs/how-to-run.md` com comandos concretos
  - Manter `.vscode/` útil e minimalista
- Não tocar em: `secrets/**`, `infra/prod/**` e jamais inserir segredos no repo.

## 4) Validação local
- Rodar `bash scripts/validate.sh` (ou `make check`) e garantir OK.
- Se houver testes, rodar também `make test` e `make lint`.

## 5) PR (Pull Request)
- Abrir PR com:
  - Resumo do PRD, escopo do PR, riscos e validação realizada
  - Lista de arquivos alterados relevantes e justificativas
  - Próximos passos (o que vem na Fase 1)
- O CI (GitHub Actions) roda validações; PR só segue com CI verde.

## 6) Fases seguintes
- Fase 1: MVP — funcionalidades essenciais com testes
- Fase 2: Observabilidade e Qualidade — logs, métricas, tracing, cobertura
- Fase 3: Infra e Deploy — container, migrations, staging, secrets seguros
- Fase 4: Performance e Segurança — caching, hardening, a11y
- Fase 5: Escala e DX — filas, rate‑limit, docs de API, DX
- Fase 6: Release e Manutenção — versionamento, backups, SLOs

## 7) Princípios e Guardrails
- Obedecer `AGENTS.md` e `.codex/policy.json` (allow/deny, limites de diff, sem renomes em massa).
- Diffs pequenos, focados, com docs e testes juntos.
- Sem segredos: usar variáveis de ambiente; publicar instruções em `docs/how-to-run.md`.

## 8) Dúvidas comuns
- “Qual stack devo usar?” → Defina na Seção 0 do `PRD.md` (exemplos prontos lá).
- “Onde coloco comandos de execução?” → `Makefile`/`justfile` e `docs/how-to-run.md`.
- “Posso editar `.vscode/`?” → Sim, mantenha minimalista e útil (não force extensões proprietárias).

