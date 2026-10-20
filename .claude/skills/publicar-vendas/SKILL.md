---
name: publicar-vendas
description: Publica as telas de venda do Pulso (este repositório) para a equipe de vendas em https://pulso-vendas.pages.dev e devolve o link pronto para mandar aos consultores. Use quando a Lucila disser "publica para vendas", "sobe para os vendedores", "atualiza a página de vendas", "cria uma tela nova para vendas", "manda uma prévia" ou "volta a versão anterior".
---

# Publicar telas para a equipe de vendas

O site dos vendedores é este repositório (Next.js, gerado como site estático em `out/`) publicado no Cloudflare Pages:

- **Link dos vendedores:** https://pulso-vendas.pages.dev
- **Prévia (só para conferir antes):** https://previa.pulso-vendas.pages.dev

Material interno: as páginas não aparecem no Google (`robots: noindex` em `app/layout.jsx`), mas quem tiver o link abre. Não ponha nome de cliente, CPF, número de processo real nem senha nas telas.

## Fluxo

1. **Atualize o repositório:** `git pull`.
2. **Faça a mudança pedida** (texto, tela nova etc., ver "Tela nova" abaixo).
3. **Prévia:** rode `npm run previa`. Se o comando falhar, leia o erro, corrija e rode de novo. Não publique com erro.
4. **Confira a prévia** em https://previa.pulso-vendas.pages.dev (e na rota da tela nova, se houver):
   - a página abre (`curl -s -o /dev/null -w "%{http_code}" <link>` dá `200`);
   - o texto novo aparece (`curl -s <link> | grep "<trecho novo>"`);
   - se mexeu no diagnóstico ou na calculadora, abra no navegador e teste uma vez.
   Mostre o link da prévia à Lucila e pergunte se pode publicar para os vendedores. Se ela já disse "publica direto", pule a pergunta.
   Se ela recusar, desfaça a mudança (`git checkout -- . && git clean -fd public app`) e rode `npm run previa` de novo, para a prévia voltar a ficar igual ao que os vendedores veem.
5. **Grave no GitHub:** `git add -A && git commit -m "<o que mudou, em português>" && git push`.
6. **Publique:** `npm run publicar`.
7. **Confira no ar** https://pulso-vendas.pages.dev do mesmo jeito do passo 4.
8. **Responda à Lucila** com o link final (e o da tela nova), pronto para ela colar no grupo dos vendedores. Uma ou duas frases, sem termo técnico.

## Tela nova

Cada tela nova vira um endereço próprio, por exemplo `https://pulso-vendas.pages.dev/diagnostico`.

- **Página HTML avulsa** (a Lucila mandou um `.html` ou pediu uma tela simples em texto): salve em `public/<nome>.html` (crie a pasta `public/` se não existir). Ela abre em `/<nome>`. Garanta que o `<head>` tem `<meta name="robots" content="noindex">`.
- **Página no padrão do site** (mesmo visual da principal): crie `app/<nome>/page.jsx` seguindo `app/page.jsx`. Ela abre em `/<nome>`.
- Use nomes curtos, minúsculos, sem acento e sem espaço (`calculadora`, `objecoes`).
- Não apague nem renomeie uma tela que já está com os vendedores sem a Lucila pedir: o link deles para de funcionar.
- Tela apagada pode continuar abrindo por até 7 dias (cache da Cloudflare). Para tirar do ar na hora, não apague o arquivo: troque o conteúdo por um aviso curto ("Esta página saiu do ar") e publique.

## Voltar a versão anterior

O Cloudflare guarda todas as publicações. Para voltar, use o rollback dele (não republique um commit antigo: os anteriores a esta skill nem têm o script):

1. Liste as publicações de produção (a mais recente primeiro):
   ```bash
   T=$(security find-generic-password -s pulso-vendas-cloudflare -w); A=ec73382d6c6b043c8338b0821832329e
   curl -s -H "Authorization: Bearer $T" "https://api.cloudflare.com/client/v4/accounts/$A/pages/projects/pulso-vendas/deployments?env=production" \
     | python3 -c 'import json,sys; [print(d["id"], d["created_on"][:16], d.get("deployment_trigger",{}).get("metadata",{}).get("commit_message","")[:60]) for d in json.load(sys.stdin)["result"]]'
   ```
   Horários em UTC (BRT = UTC−3). Confirme com a Lucila qual é a versão boa.
2. Volte para ela:
   ```bash
   curl -s -X POST -H "Authorization: Bearer $T" "https://api.cloudflare.com/client/v4/accounts/$A/pages/projects/pulso-vendas/deployments/<id>/rollback" | python3 -c 'import json,sys; print(json.load(sys.stdin)["success"])'
   ```
   Deve imprimir `True`. Leva segundos.
3. Confira no ar. Depois corrija o problema na `main` e publique de novo.

## Configuração única (no Mac da Lucila)

Precisa de Node.js com npm (`node -v` deve responder; se não, instale de https://nodejs.org, versão LTS). Na primeira publicação o comando baixa as dependências e o `wrangler`; pode levar alguns minutos.

O script `scripts/publicar.sh` lê a chave da Cloudflare no Chaveiro do Mac. Se ele disser "chave da Cloudflare nao encontrada", peça a chave ao Tiago e, com a Lucila colando a chave quando o terminal pedir, rode:

```bash
security add-generic-password -a "$USER" -s pulso-vendas-cloudflare -w
```

Depois rode `npm run previa` para testar. Nunca grave a chave em arquivo do repositório nem a mostre na conversa.

## Gotchas

- Rode sempre pelos comandos `npm run previa` e `npm run publicar`. Rodar `wrangler` direto na raiz do projeto faz ele "converter" o site para Workers e alterar `package.json`, `next.config.mjs` e `.gitignore`. Se isso acontecer, desfaça com `git checkout -- .` e apague os arquivos novos (`open-next.config.ts`, `wrangler.jsonc`, `.open-next/`, `.dev.vars`).
- Não passe `--force` ao `wrangler`, nem crie projeto novo: o projeto `pulso-vendas` já existe.
- O diagnóstico consulta o diário oficial (DJEN) direto do navegador do vendedor. Se ele disser que o diário está limitando, é o limite de consultas do próprio diário: esperar um minuto e rodar de novo.
- Se o erro for de permissão ou chave inválida, a chave pode ter sido trocada: peça uma nova ao Tiago.
