# PRD — Documento de Requisitos do Produto

Este PRD é a única fonte de verdade do projeto. Ele orienta humanos e LLMs.

## 1. Visão Geral
- Contexto:
- Objetivo do produto:
- Métricas de sucesso:

## 2. Problema e Objetivos
- Problema principal:
- Objetivos mensuráveis (OKRs):

## 3. Público-Alvo e Personas
- Personas:
- Principais cenários de uso:

## 4. Escopo por Fases
- Fase 0 (Bootstrap): esqueletos, CI, docs, ambiente.
- Fase 1 (MVP): funcionalidades essenciais.
- Fase 2 (Iteração): melhorias, perf, DX.

## 5. Requisitos Funcionais (User Stories)
- [ ] Como <persona>, quero <ação> para <benefício>.

## 6. Requisitos Não Funcionais
- Confiabilidade, segurança, observabilidade, escalabilidade, compatibilidade, acessibilidade.

## 7. Arquitetura (proposta/esperada)
- Módulos, limites, integrações.
- Preferências/Restrições de stack:

## 8. Critérios de Aceitação
- Casos de teste de alto nível.

## 9. Entregáveis e Marcos
- Entrega Fase 0: skeleton, CI verde, docs básicos.

## 10. Dados e Integrações
- Fontes de dados, APIs externas, formatos.

## 11. Fluxo de Dev e Deploy
- Branching, PR, revisão, release, deploy, rollback.

---

## Instruções para LLM
1) Leia este PRD por completo e produza um breve resumo e plano de execução em etapas curtas.
2) Obedeça estrictamente o arquivo AGENTS.md e a política em .codex/policy.json.
3) Para o Bootstrap (Fase 0), você PODE criar/editar:
   - src/**, tests/**, docs/**, README.md, CONTRIBUTING.md, Makefile,
     scripts/**, .github/workflows/**, .gitignore, .editorconfig, AGENTS.md, PRD.md.
4) Você NÃO DEVE tocar em: secrets/**, infra/prod/** (e nunca inserir segredos).
5) Mantenha mudanças pequenas e focadas; atualize docs e testes junto com o código.
6) Valide localmente com: scripts/validate.sh (ou make check). CI deve ficar verde.
7) Abra um PR descrevendo:
   - Resumo do PRD, escopo, riscos, validação, próximos passos.
   - Arquivos alterados relevantes e justificativas.
8) Após aprovação, prossiga para Fase 1 conforme PRD.
