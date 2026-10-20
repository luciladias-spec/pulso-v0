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

# Confere a chave antes do build, para nao esperar o build inteiro e falhar no fim.
verifica() { curl -s -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" "https://api.cloudflare.com/client/v4/$1" | grep -q '"status":"active"'; }
verifica user/tokens/verify || verifica "accounts/$CLOUDFLARE_ACCOUNT_ID/tokens/verify" || {
  echo "ERRO: a chave da Cloudflare e invalida ou foi desativada. Peca uma nova ao Tiago." >&2
  exit 1
}

[ -d node_modules ] || npm ci
rm -rf out
npx next build
# Roda de dentro de out/: na raiz, o wrangler tenta converter o projeto Next sozinho.
cd out
npx --yes wrangler@4 pages deploy . --project-name pulso-vendas --branch "$RAMO" --commit-dirty=true
