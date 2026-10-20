#!/bin/bash
# Publica o site no Cloudflare Pages (https://pulso-vendas.pages.dev).
# Uso: scripts/publicar.sh          -> link dos vendedores
#      scripts/publicar.sh previa   -> prévia em https://previa.pulso-vendas.pages.dev
# A chave da Cloudflare fica no Chaveiro do Mac (servico "pulso-vendas-cloudflare").
set -euo pipefail
cd "$(dirname "$0")/.."

RAMO=main
[ "${1:-}" = "previa" ] && RAMO=previa

if [ -z "${CLOUDFLARE_API_TOKEN:-}" ]; then
  CLOUDFLARE_API_TOKEN=$(security find-generic-password -s pulso-vendas-cloudflare -w 2>/dev/null) || {
    echo "ERRO: chave da Cloudflare nao encontrada no Chaveiro (servico pulso-vendas-cloudflare)." >&2
    echo "Veja 'Configuracao unica' em .claude/skills/publicar-vendas/SKILL.md" >&2
    exit 1
  }
fi
export CLOUDFLARE_API_TOKEN
export CLOUDFLARE_ACCOUNT_ID=ec73382d6c6b043c8338b0821832329e

[ -d node_modules ] || npm install
rm -rf out
npx next build
# Roda de dentro de out/: na raiz, o wrangler tenta converter o projeto Next sozinho.
cd out
npx --yes wrangler@4 pages deploy . --project-name pulso-vendas --branch "$RAMO" --commit-dirty=true
