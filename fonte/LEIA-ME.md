# Fonte do Pulso

Tudo o que está publicado sai **daqui**. Não edite os arquivos gerados: eles são
sobrescritos pelos scripts.

## Os arquivos

| arquivo | o que é |
|---|---|
| `pagina-equipe.html` | **A fonte da verdade.** Estilo, corpo da versão de equipe e toda a lógica (diagnóstico, calculadora, simulador de pacotes, relatório). |
| `corpo-cliente.html` | Só o corpo da versão de cliente. Puxa o diagnóstico e a calculadora da fonte acima pelos marcadores `<!-- BLOCO: ... -->`. |
| `site-cabeca.html` / `site-rodape.html` | O `<head>` e o fechamento, comuns às duas páginas. |
| `logo.svg` | Logotipo oficial, vetor extraído do site. Gradiente `#2A71E5 → #140DBF`. |
| `gerar-site.py` | Monta as duas páginas estáticas. |
| `gerar-v0.py` | Monta o aplicativo Next.js (`app/`) a partir da mesma fonte. |

## Gerar

```
python3 gerar-site.py     # site/index.html (cliente) e site/equipe/index.html
python3 gerar-v0.py       # app/logo.js, app/html.js, app/logica.js, app/page.jsx, app/globals.css
```

## Duas audiências, um código só

A página do cliente e a da equipe compartilham estilo e lógica. O que muda é o
corpo e um punhado de frases que falavam do advogado em terceira pessoa — a lista
está em `CLIENTE` e `CLIENTE_JS`, dentro de `gerar-site.py`.

**Há uma trava e ela é proposital.** Antes de escrever a página do cliente, o
gerador procura termos internos (`objeção`, `não prometa`, `vendedor`,
`perfil ideal`, `escritório-piloto`, `Pergunte quantos`) e **falha a build** se
algum aparecer. Ela já pegou três vazamentos reais, incluindo um texto na tela que
mandava o leitor "perguntar quantos processos ele tem ao todo" — que o cliente
leria. Se você acrescentar conteúdo interno, acrescente também o termo à lista
`VAZAMENTOS`.

## O diagnóstico

Consulta a API pública do DJEN/CNJ **direto do navegador**, sem backend:

```
https://comunicaapi.pje.jus.br/api/v1/comunicacao
  ?numeroOab=&ufOab=&dataDisponibilizacaoInicio=&dataDisponibilizacaoFim=
  &pagina=&itensPorPagina=100
```

Ela responde `access-control-allow-origin: *`, por isso roda client-side. Três
coisas que custaram tempo para descobrir:

1. **A mesma decisão vem repetida uma vez por destinatário** (um ato apareceu 14
   vezes). Deduplicar por processo + data + hash do teor.
2. **`count` é o total do intervalo, e satura em 10.000.** Lido na primeira
   página, serve para disparar as demais em paralelo — o ano inteiro sai em
   segundos. Em páginas profundas ele muda de significado; não use.
3. **Cobrir não é trazer o conteúdo.** Medido em 16/10/2026: os 27 tribunais
   estaduais, os 6 TRFs, os TRTs, TST, STJ e STM devolvem publicação. Mas cerca de
   **55% dos eventos chegam sem o teor** — só o aviso. Ler exige entrar nos autos
   com certificado digital.

## Classificação de desfecho

O relatório diz se o processo foi ganho, perdido ou está em andamento, e **por que**
foi perdido. Três armadilhas já corrigidas, todas inflando as perdas:

- `"transitada em julgado, arquive-se"` depois de uma **procedência** era contado
  como derrota. Por isso a vitória exige `condeno o requerido` entre os gatilhos.
- `"inércia"` aparece em **citação doutrinária** e em advertência futura.
- `"sob pena de arquivamento"` é **prazo correndo**, não derrota. As frases com
  "sob pena de" são descartadas antes de classificar (`operativo()`).

Derrota só com **verbo operativo no presente** (`R.opDerrota`). No mês medido, isso
levou as perdas de 27 para 15 e zerou a causa "não identificada".

## Preços e pacotes

Valores de tabela, validade conferida no banco em 19/10/2026. O saldo do pacote é
**monetário** — o Pulso debita reais, não contagem de serviços.

| pacote | preço | serviços | validade | saldo/mês |
|---|---|---|---|---|
| Start | R$ 640 | 4 | 12 meses | R$ 53 |
| Premium | R$ 1.960 | 14 | 12 meses | R$ 163 |
| Infinity | R$ 8.400 | 70 | 12 meses | R$ 700 |
| Soberano | R$ 10.000 | 142 | **60 dias** | R$ 5.000 |

O Infinity cobre até ~120 processos; acima disso, Soberano. A diferença é a
**validade**, não o preço.
