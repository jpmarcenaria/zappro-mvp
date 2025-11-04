# exemplo-repo — LLM‑Safe Full‑Stack Template

Um template pensado para trabalhar com LLMs sem alucinação: PRD como fonte única de verdade, regras claras para agentes e validação automatizada em CI.

## Por que este template?
- Fonte única: `PRD.md` concentra visão, escopo, arquitetura e critérios de aceite.
- Guardrails para LLMs: `AGENTS.md` + `.codex/policy.json` limitam o que pode ser alterado.
- Qualidade como contrato: `scripts/validate.sh` e CI bloqueiam alterações fora do padrão.
- Deltas atômicos: pequenas mudanças com testes e docs atualizados.

## Como usar
1. Copie este repositório (ou duplique a pasta) para um novo projeto.
2. Edite `PRD.md` com seu produto (preencha os campos `< >`).
3. Ajuste `CODEOWNERS` para seu usuário/equipe.
4. Rode `bash scripts/validate.sh` e garanta OK local.
5. Oriente a LLM: “Leia `PRD.md` e siga `AGENTS.md` para iniciar o Bootstrap (Fase 0)”.
6. Abra PRs pequenos; CI deve ficar verde.

## Antes de iniciar com a LLM (humano)
- Preencha a Seção 0 do `PRD.md` (stack) e as seções mínimas do PRD.
- Remova o guia humano (opcional, recomendado):
  - `git rm Guia.md && git commit -m "docs: remove Guia.md (PRD concluído; iniciar LLM)"`
- Use o prompt sugerido abaixo para iniciar a Fase 0 com a LLM.

Prompt sugerido (cole para a LLM):
"""
Leia PRD.md e obedeça estritamente AGENTS.md e .codex/policy.json. Confirme a stack escolhida na Seção 0 do PRD e proponha um plano curto para a Fase 0 (Bootstrap). Em seguida, implemente apenas o mínimo necessário:
- Scaffold em src/** (ou estrutura equivalente), endpoint/rota de saúde;
- Arquivos de dependências e scripts (fmt, lint, test, dev, run) via Makefile/justfile;
- Atualize docs/how-to-run.md com comandos concretos;
- Mantenha diffs pequenos, sem tocar secrets/ e infra/prod/;
- Rode scripts/validate.sh localmente (simular) e descreva validação.
Abra um PR pequeno com escopo, riscos, validação e próximos passos para a Fase 1.
"""

## Estrutura
- `PRD.md`: requisitos do produto e guia para execução por fases.
- `AGENTS.md`: regras e limites para agentes (paths, estilo, validação).
- `.codex/policy.json`: política legível por máquina (allow/deny, limites, padrões proibidos).
- `scripts/policy-check.sh`: aplica a política no diff do PR.
- `scripts/validate.sh`: checagens mínimas e execução do policy‑check.
- `.github/workflows/ci.yml`: CI que valida alterações em push/PR.
- `docs/`: arquitetura e “como rodar”.
- `Makefile`: alvos `check/validate` (ajuste `fmt/lint/test` no projeto real).

## Fluxo LLM‑first
- Bootstrap (Fase 0): criar skeleton em `src/`, `tests/`, `docs/`, ajustar `README`, ligar CI.
- MVP (Fase 1): implementar funcionalidades essenciais conforme `PRD.md`.
- Iteração (Fase 2): performance, observabilidade, segurança, DX.

## Stack é definida pelo PRD
- Este template não impõe linguagem/framework.
- Defina a stack no `PRD.md` e, então, a LLM deve criar os arquivos necessários (ex.: Node/Next, Python/FastAPI, etc.), atualizar `docs/how-to-run.md` e ajustar `Makefile`.

## Resumo das Fases (0→6)
- Fase 0 — Bootstrap: skeleton, scripts (`fmt/lint/test/dev/run`), docs e CI
- Fase 1 — MVP: funcionalidades essenciais com testes e docs
- Fase 2 — Observabilidade e Qualidade: logs, métricas, tracing, cobertura
- Fase 3 — Infra e Deploy: containerização, migrations, staging, secrets e deploy
- Fase 4 — Performance e Segurança: caching, hardening, a11y
- Fase 5 — Escala e DX: filas, rate‑limit, docs de API, DX
- Fase 6 — Release e Manutenção: versionamento, backups, SLOs

Detalhes e checklists em `PRD.md` (Seção “20. Detalhamento das Fases”).

## Diretrizes para LLMs
- Leia `PRD.md` e proponha um plano curto de execução.
- Só altere caminhos permitidos na política; mantenha diffs pequenos.
- Atualize testes e docs junto com o código; execute `scripts/validate.sh`.
- Abra PR descrevendo escopo, riscos, validação e próximos passos.

## Começar agora
- Local:
  - `bash scripts/validate.sh`
  - Edite `PRD.md` e `CODEOWNERS`
  - Consulte `Guia.md` para o passo‑a‑passo operacional
- Git remoto:
  - `git remote add origin <URL>`
  - `git push -u origin main`

## Licença
- Defina a licença adequada ao seu projeto (`LICENSE`).
