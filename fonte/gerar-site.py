# Gera as duas paginas a partir do MESMO codigo:
#   site/index.html         -> versao do CLIENTE  (corpo-cliente.html)
#   site/equipe/index.html  -> versao da EQUIPE   (pagina-equipe.html)
# O estilo e a logica sao unicos; muda o corpo e alguns textos.
import os, re, pathlib
SP = os.path.dirname(os.path.abspath(__file__))
le = lambda n: open(os.path.join(SP, n)).read()

mestre  = le('pagina-equipe.html')
cabeca  = le('site-cabeca.html')
rodape  = le('site-rodape.html')
estilo  = re.search(r'<style>.*?</style>', mestre, re.S).group(0)
script  = re.search(r'<script>.*?</script>', mestre, re.S).group(0)
corpoEq = re.search(r'<div class="wrap">.*</div>\s*(?=<script>)', mestre, re.S).group(0)

def secao(titulo, texto=mestre):
    i = texto.index('<h2>'+titulo)
    return texto[texto.rindex('<section', 0, i) : texto.index('</section>', i)+len('</section>')]

# --- corpo do cliente: encaixa as duas ferramentas vindas do mestre
corpoCl = le('corpo-cliente.html')
corpoCl = corpoCl.replace('<!-- BLOCO: diagnostico -->', secao('Diagnóstico ao vivo'))
corpoCl = corpoCl.replace('<!-- BLOCO: calculadora -->', secao('Calculadora de consumo'))

# --- textos que falam do advogado em terceira pessoa, ou que sao instrucao ao vendedor
CLIENTE = [
 ('Digite a OAB dele e veja o que aconteceu nos processos nos últimos 30 dias. Busca direto no Diário de Justiça Eletrônico Nacional, que é público — leva segundos e pode ser feito durante a ligação.',
  'Digite o número da sua OAB e veja o que aconteceu nos seus processos nos últimos 30 dias. A busca é feita direto no Diário de Justiça Eletrônico Nacional, que é público, e leva segundos. No fim, sai um relatório completo em PDF.'),
 ('Rodando o diagnóstico acima, os números saem <strong>medidos no diário da OAB dele</strong>. Sem OAB, a calculadora estima pelo tamanho da carteira, com as proporções do escritório-piloto.',
  'Rodando o diagnóstico acima, os números saem <strong>medidos no diário da sua OAB</strong>. Sem isso, a calculadora estima pelo tamanho da carteira.'),
 ('O advogado quase nunca sabe esse número de cabeça. <button type="button" class="link" id="irDiag">Levante pela OAB</button> e estes valores passam a ser medidos, não estimados.',
  'Não sabe o número de cabeça? <button type="button" class="link" id="irDiag">Levante pela sua OAB</button> e estes valores passam a ser medidos, não estimados.'),
 ('<h3>Referências rápidas, para não precisar da calculadora na ligação</h3>',
  '<h3>Referências rápidas</h3>'),
 ('<strong>Trate como estimativa</strong> e confirme com o diagnóstico ao vivo da OAB dele.',
  '<strong>Trate como estimativa</strong> e confirme com o diagnóstico da sua OAB, acima.'),
 ('As proporções saem de um escritório previdenciário com 600 processos ativos, medido entre 16/09 e 16/10/2026. Carteira trabalhista tende a publicar mais; carteira cível, menos.',
  'As proporções vêm de um escritório previdenciário com 600 processos ativos, medido ao longo de 30 dias. Carteira trabalhista tende a publicar mais; carteira cível, menos.'),
 ('Ver relatório de acompanhamento', 'Ver exemplo do relatório diário'),
 ('<em style="color:var(--ink-3);font-style:normal;font-size:12px">(o piloto, real)</em>',
  '<em style="color:var(--ink-3);font-style:normal;font-size:12px">(medido)</em>'),
]

# textos que o cliente LE na tela, mas que foram escritos para o vendedor
CLIENTE_JS = [
 ("no escritório-piloto, o diário mostrou pouco mais da metade do que o advogado tinha. ",
  "em um escritório que medimos, o diário mostrou pouco mais da metade da carteira. "),
 ("Pergunte quantos processos ele tem ao todo — <b>a diferença é a carteira parada</b>, e é exatamente o diagnóstico de R$ 30 por processo.",
  "Se você tem mais processos do que isso, <b>a diferença é a sua carteira parada</b> — e é exatamente o que o diagnóstico de R$ 30 por processo resolve."),
]

for v, n in CLIENTE:
    assert corpoCl.count(v) == 1, 'texto de cliente nao encontrado: %r (%d)' % (v[:55], corpoCl.count(v))
    corpoCl = corpoCl.replace(v, n)

# a nota do simulador tem uma frase que so serve para a equipe
scriptCl = script.replace(
  "+ 'condição negociada — fale comigo antes de dar número.'",
  "+ 'condição negociada — fale com a Facilita para montar o plano.'")
assert scriptCl != script, 'nota do simulador nao encontrada no script'
scriptCl = scriptCl.replace("'Ver relatório de acompanhamento'", "'Ver exemplo do relatório diário'")
for a, b in CLIENTE_JS:
    assert scriptCl.count(a) == 1, 'texto de script nao encontrado: %r (%d)' % (a[:50], scriptCl.count(a))
    scriptCl = scriptCl.replace(a, b)

def montar(corpo, script_, destino, proibidos, titulo):
    saida = cabeca.replace('<title>Vender Pulso</title>', '<title>'+titulo+'</title>')
    assert '<title>'+titulo+'</title>' in saida, 'titulo nao trocado'
    saida = saida + estilo + corpo + '\n' + script_ + rodape
    for t in proibidos:
        assert t not in saida, 'VAZOU conteudo interno em %s: %r' % (destino, t)
    pathlib.Path(os.path.dirname(destino)).mkdir(parents=True, exist_ok=True)
    open(destino, 'w').write(saida)
    print('%-26s %7d bytes' % (os.path.relpath(destino, SP), len(saida)))

# nada disso pode aparecer na pagina do cliente
VAZAMENTOS = ['objeç', 'Objeç', 'não prometa', 'Não prometa', 'vendedor', 'Material interno',
              'na ligação', 'Na ligação', 'perfil ideal', 'Perfil ideal', 'fale comigo',
              'o cliente dele', 'carteira dele', 'OAB dele', 'escritório-piloto',
              'Pergunte quantos', 'o piloto, real', 'vocês']
montar(corpoCl, scriptCl, os.path.join(SP,'site','index.html'), VAZAMENTOS,
       'Pulso · Facilita Jurídico')
montar(corpoEq, script,   os.path.join(SP,'site','equipe','index.html'), [],
       'Pulso · material de venda')
