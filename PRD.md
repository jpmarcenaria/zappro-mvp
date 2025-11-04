# PRD — Template Full‑Stack (LLM‑Safe)

Este PRD é a fonte única de verdade do projeto e guia tanto humanos quanto LLMs. Preencha os campos entre `< >` de acordo com seu produto.

## 1. Visão Geral
- Nome do produto: `<nome>`
- Contexto: `<contexto do negócio e problema macro>`
- Objetivo: `<resultado desejado>`
- Métricas de sucesso (KPIs/OKRs): `<métricas e metas>`

## 2. Problema e Objetivos
- Problema principal: `<o que precisa ser resolvido>`
- Objetivos mensuráveis: `<lista de objetivos com metas>`
- Não‑objetivos (fora de escopo): `<o que não será feito>`

## 3. Público‑Alvo e Personas
- Personas: `<persona 1, persona 2>`
- Principais cenários de uso: `<cenário → objetivo → valor>`

## 4. Roadmap por Fases
- Fase 0 — Bootstrap: skeleton, CI, docs, ambiente e qualidade.
- Fase 1 — MVP: funcionalidades essenciais para validar valor.
- Fase 2 — Iteração/Escala: robustez, performance, DX, novas features.

## 5. Requisitos Funcionais (User Stories)
- [ ] Como `<persona>`, quero `<ação>` para `<benefício>`.
- [ ] …

## 6. Requisitos Não Funcionais
- Confiabilidade: `<SLOs de uptime, MTTR>`
- Segurança: `<authn/authz, OWASP, secrets>`
- Observabilidade: `<logs, métricas, traces>`
- Performance: `<SLIs (p95), orçamentos (bundle, latência)>`
- Escalabilidade: `<estratégia horizontal/vertical>`
- Compatibilidade: `<browsers, plataformas>`
- Acessibilidade (a11y): `<critérios WCAG>`

## 7. Arquitetura Alvo
- Frontend: `<React/Next.js ou outro>`
- Backend: `<Node/Nest/Express ou Python/FastAPI/Django>`
- API: `<REST/GraphQL>`, versionamento `<v1>`, autenticação `<JWT/OAuth2>`
- Banco de dados: `<PostgreSQL recomendado>`, migrações `<Prisma/Knex/Alembic>`
- Mensageria/Jobs: `<opcional: Redis/Sidekiq/BullMQ/Celery>`
- Armazenamento de arquivos: `<S3/Cloud provider>`
- Infra: `<Docker Compose dev; deploy: Render/Fly/VM/K8s>`
- Diagrama de alto nível: `<descrever módulos e fluxos principais>`

## 8. Modelo de Dados (rótulos e relações)
- Entidades: `<Usuário, Projeto, Tarefa, …>`
- Campos chave: `<nome, email, …>`
- Relacionamentos: `<1:N, N:N>`
- Regras de integridade e índices: `<únicos, FKs, índices>`

## 9. Design de API
- Convenções: `<snake_case vs camelCase, envelopes>`
- Erros: formato padronizado `{ error: { code, message, details } }`
- Paginação/filtros/sort: `<padrões>`
- Versionamento: `</api/v1>`
- Contratos exemplares:
  - `POST /api/v1/auth/login`
  - `GET /api/v1/items?limit=&cursor=`
  - …

## 10. Frontend
- Páginas/rotas: `<lista>`
- Estado: `<React Query/Redux/etc.>`
- UI Kit/Design System: `<opcional>`
- i18n: `<linguagens>`
- Acessibilidade: `<requisitos>`

## 11. Segurança
- Autenticação: `<fluxo>`
- Autorização (RBAC/ABAC): `<papéis e políticas>`
- Proteções web: `<CSRF, XSS, rate‑limit>`
- Gestão de segredos: `<.env local; provedor em produção>`

## 12. Observabilidade e Operação
- Logs: `<níveis, correlação>`
- Métricas: `<técnicas e de negócio>`
- Traces: `<quando útil>`
- Alertas: `<limiares e destinos>`

## 13. Desenvolvimento e Ambientes
- Dev: `make setup` → `make dev`
- Test: `make test` (unit/integration/e2e)
- Lint/Format: `make lint`/`make fmt`
- Ambientes: dev / staging / prod; flags de recurso
- Configuração por ambiente: `<12‑factor, env vars>`

## 14. CI/CD
- CI: lint → test → build → policy‑check → artefatos
- CD: staging automatizado; prod com aprovação
- Estratégia de migrações DB: `<migrar antes/depois, safe‑migrate>`

## 15. Testes
- Pirâmide: unit > integração > e2e
- Cobertura alvo: `<ex.: 80%>`
- Testes de contrato de API e snapshot de UI (quando aplicável)

## 16. Internacionalização e SEO
- Idiomas: `<pt‑BR, en‑US, …>`
- SEO: `<metatags, sitemap, robots>` (se web pública)

## 17. Riscos e Mitigações
- `<risco>` → `<mitigação>`

## 18. Critérios de Aceitação
- Demonstrações: `<o que deve ser possível>`
- Checks automáticos: CI verde; `scripts/validate.sh` OK

## 19. Entregáveis por Fase
- Fase 0: skeleton `src/`, `tests/`, `docs/`, `README`, CI verde
- Fase 1: MVP funcional com deploy em `<plataforma>`
- Fase 2: otimizações, SLOs cumpridos, observabilidade completa

---

## Instruções para LLM
1) Leia PRD.md e gere um resumo + plano com etapas curtas.
2) Obedeça AGENTS.md e `.codex/policy.json` (paths permitidos, limites de diff).
3) Fase 0 — Bootstrap (permitido criar/editar):
   - `src/**`, `tests/**`, `docs/**`, `README.md`, `CONTRIBUTING.md`, `Makefile`,
     `scripts/**`, `.github/workflows/**`, `.gitignore`, `.editorconfig`, `AGENTS.md`, `PRD.md`.
4) Não tocar: `secrets/**`, `infra/prod/**`. Nunca inserir segredos.
5) Mantenha mudanças pequenas e focadas; atualize docs e testes junto do código.
6) Valide localmente com `bash scripts/validate.sh`. CI deve ficar verde.
7) Abra PR descrevendo: resumo do PRD, escopo, riscos, validação e próximos passos.
8) Após aprovação, avance para Fase 1 conforme este PRD.
