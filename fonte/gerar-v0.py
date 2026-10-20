# Gera o app Next.js do v0 a partir do HTML mestre, em modulos:
#   app/logo.js    o vetor do logotipo       (quase nunca muda)
#   app/html.js    a marcacao da pagina      (muda pouco)
#   app/logica.js  calculadora e diagnostico (muda sempre)
#   app/page.jsx   so a montagem             (fixo)
#   app/globals.css
import re, os, pathlib

SP   = os.path.dirname(os.path.abspath(__file__))
src  = open(os.path.join(SP, 'pagina-equipe.html')).read()
logo = open(os.path.join(SP, 'logo.svg')).read().strip()
out  = os.path.join(SP, 'v0app', 'app')
pathlib.Path(out).mkdir(parents=True, exist_ok=True)

css = re.search(r'<style>(.*?)</style>', src, re.S).group(1).strip()
js  = re.search(r'<script>(.*?)</script>', src, re.S).group(1).strip()
m   = re.search(r'(<div class="wrap">.*?</div>)\s*<script>', src, re.S)
assert m, 'nao achei o corpo da pagina'
corpo = re.sub(r'<div id="logoFJ" hidden>.*?</div>', '<div id="logoFJ" hidden></div>',
               m.group(1), flags=re.S)
assert '<div id="logoFJ" hidden></div>' in corpo and '<div id="relatorio"></div>' in corpo

def tmpl(s):
    return s.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')

arquivos = {
 'logo.js':
   '// Logotipo oficial da Facilita Juridico, vetor extraido do site.\n'
   '// Gradiente azul #2A71E5 -> navy #140DBF; "JURIDICO" em #383838.\n'
   'export const LOGO = `' + tmpl(logo) + '`;\n',

 'html.js':
   '// Marcacao da pagina de venda do Pulso. Gerado de pagina-equipe.html.\n'
   'export const HTML = `\n' + tmpl(corpo) + '\n`;\n',

 'logica.js':
   '// Calculadora de consumo e diagnostico por OAB. Gerado de pagina-equipe.html.\n'
   'import { LOGO } from "./logo";\n\n'
   'export function iniciar() {\n'
   "  document.getElementById('logoFJ').innerHTML = LOGO;\n\n"
   + '\n'.join(('  ' + l) if l.strip() else '' for l in js.split('\n')) + '\n'
   '}\n',

 'page.jsx':
   '"use client";\n\n'
   'import { useEffect } from "react";\n'
   'import { HTML } from "./html";\n'
   'import { iniciar } from "./logica";\n\n'
   'export default function Page() {\n'
   '  useEffect(() => { iniciar(); }, []);\n'
   '  return <div dangerouslySetInnerHTML={{ __html: HTML }} />;\n'
   '}\n',

 'globals.css': css + '\n',
}

for nome, conteudo in arquivos.items():
    open(os.path.join(out, nome), 'w').write(conteudo)
    print('%-12s %6d bytes' % (nome, len(conteudo.encode())))
