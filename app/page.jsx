"use client";

import { useEffect } from "react";

const HTML = `
<div class="wrap">

<header>
  <span class="tagline">Produto novo · material de venda · out 2026</span>
  <h1>Pulso</h1>
  <p class="promessa">Da procuração ao protocolo, <b>o escritório anda sozinho.</b></p>
  <div class="fitas">
    <span class="fita">24 horas por dia</span>
    <span class="fita">7 dias por semana</span>
    <span class="fita">Sem folha fixa</span>
    <span class="fita aberta">Só no pacote Soberano</span>
  </div>
</header>

<section class="col">
  <h2>A frase que abre a conversa</h2>
  <p class="lede"><strong>Depois que o cliente assina a procuração, a Facilita faz o resto.</strong> Pegamos os documentos onde o advogado já os deixa, cadastramos, escrevemos a peça, organizamos tudo no formato do tribunal, distribuímos ou protocolamos, acompanhamos as publicações todos os dias e damos qualquer andamento que o processo pedir — guia, RPV, manifestação, recurso.</p>
  <p>O advogado entra em dois momentos: para conferir a peça e para autorizar o protocolo. Dois cliques. O resto do dia dele volta a ser dele.</p>
</section>

<section>
  <div class="col"><h2>O que a Facilita faz</h2>
  <p class="lede">Esta é a lista que vocês devem decorar. É o produto inteiro, na ordem em que acontece.</p></div>

  <div class="esteira">
    <div class="passo"><span class="n">1</span><div><b>Capta os documentos</b><span>Pegamos o que ele colheu do cliente, de onde ele já deixa — pasta no Drive, OneDrive ou o WhatsApp da Facilita. Ele não organiza nada.</span></div></div>
    <div class="passo"><span class="n">2</span><div><b>Cadastra na plataforma</b><span>A solicitação é aberta por nós. Ele não preenche formulário.</span></div></div>
    <div class="passo"><span class="n">3</span><div><b>Escreve a peça</b><span>Inicial, contestação, manifestação, recurso, parecer, cálculo. A mesma esteira que ele já conhece.</span></div></div>
    <div class="passo"><span class="n">4</span><div><b>Organiza os documentos</b><span>Na ordem e no formato que aquele tribunal exige — separados, nomeados e dentro do limite de tamanho dele.</span></div></div>
    <div class="passo"><span class="n">5</span><div><b>Verifica pendência e encaminha</b><span>Se falta documento para instruir o caso, dizemos exatamente qual, em qual processo e como resolver — e cobramos até chegar.</span></div></div>
    <div class="passo"><span class="n">6</span><div><b>Distribui ou protocola</b><span>No nome dele, com o certificado dele, depois da autorização dele. Volta com número e comprovante.</span></div></div>
    <div class="passo"><span class="n">7</span><div><b>Acompanha as publicações</b><span>Todo dia. Lemos, dizemos o que o juiz mandou fazer e até quando — com o prazo lido de dentro do processo, nunca calculado.</span></div></div>
    <div class="passo"><span class="n">8</span><div><b>Dá qualquer andamento</b><span>Providencia a guia, cadastra o RPV, cumpre a diligência, peticiona o que o processo pedir. Não para na peça.</span></div></div>
    <div class="passo"><span class="n">9</span><div><b>Avisa e relata</b><span>Audiência e perícia no WhatsApp do escritório. Relatório no fim do dia com tudo o que andou e o que vence a seguir.</span></div></div>
  </div>
</section>

<section>
  <div class="col"><h2>A linha</h2>
  <p class="lede">Desenhe isto na frente dele. De um lado, o que só ele pode fazer. Do outro, tudo o que hoje come o dia dele sem precisar.</p></div>

  <div class="linha">
    <div class="lado frente">
      <h4>Fica com ele</h4>
      <span class="quem">O fronte</span>
      <ul>
        <li>Captar e atender o cliente</li>
        <li>Decidir a estratégia do caso</li>
        <li>Audiência e sustentação oral</li>
        <li>Conferir a peça e autorizar o protocolo</li>
        <li>Assinar — tudo sai no nome dele</li>
      </ul>
    </div>
    <div class="divisor"><span>Pulso</span></div>
    <div class="lado tras">
      <h4>Passa para a Facilita</h4>
      <span class="quem">A retaguarda</span>
      <ul>
        <li>Captar e cadastrar os documentos</li>
        <li>Escrever a peça</li>
        <li>Organizar os anexos no padrão do tribunal</li>
        <li>Distribuir e protocolar</li>
        <li>Ler as publicações todos os dias</li>
        <li>Achar o prazo real dentro dos autos</li>
        <li>Guia, RPV, diligência, andamento</li>
        <li>Cobrar a pendência até resolver</li>
        <li>Avisar audiência e perícia</li>
        <li>Relatar o dia</li>
      </ul>
    </div>
  </div>
</section>

<section class="col">
  <h2>A âncora: ele não quer folha</h2>
  <p class="lede">Este é o centro da venda, e o lugar onde quase todo vendedor erra.</p>
  <p>O advogado que compra o Pulso <strong>não quer funcionário</strong>. Já teve, ou tem, e sabe o preço: salário todo mês caia ou não caia serviço, encargos, férias, treinar de novo quando a pessoa sai, e a semana inteira perdida quando ela falta. <strong>Folha fixa é custo que não some quando o movimento cai.</strong></p>
  <p>O que ele quer são três coisas, e vocês devem dizê-las com essas palavras: <strong>mais eficiência, menos dor de cabeça e mais dinheiro no bolso.</strong></p>

  <div class="caixa ok">
    <span class="rotulo">A promessa, em uma linha</span>
    <p><strong>O Pulso é a operação do escritório sem folha de pagamento.</strong> Custo que só existe quando o processo anda: mês parado não gera conta. Nada de encargo, de rescisão, de alguém que adoece no meio do prazo. E roda 24 horas por dia, 7 dias por semana.</p>
  </div>

  <div class="caixa">
    <span class="rotulo">A pergunta que abre tudo</span>
    <p>“Hoje, quem lê suas publicações?” — e depois, qualquer que seja a resposta: <strong>“e está dando conta?”</strong></p>
    <p>Nunca ouvimos um sim. É essa pergunta que faz o cliente descrever o problema com as palavras dele, e o resto da conversa fica fácil.</p>
  </div>

  <p>Os três ganhos têm número, e é assim que vocês devem fechar: <strong>eficiência</strong>, porque nada fica sem leitura; <strong>menos dor de cabeça</strong>, porque ele deixa de administrar gente e sistema; e <strong>dinheiro no bolso</strong>, porque processo que anda é processo que gera honorário — e porque o custo acompanha o movimento em vez de correr todo mês.</p>
</section>

<section>
  <div class="col">
    <h2>A prova, e ela é real</h2>
    <p class="lede">Rodamos a triagem de 30 dias no primeiro escritório antes de vender para o segundo. Números medidos, não estimados.</p>
  </div>

  <div class="prova">
    <div class="p-item"><b>166</b><i>publicações em 30 dias</i></div>
    <div class="p-item"><b>101</b><i>processos com movimentação</i></div>
    <div class="p-item mau"><b>31</b><i>exigiam um ato dele</i></div>
    <div class="p-item mau"><b>5</b><i>processos perdidos no mês</i></div>
    <div class="p-item bom"><b>11</b><i>vitórias que ele ainda não sabia que tinha</i></div>
  </div>

  <div class="col">
    <div class="caixa nao">
      <span class="rotulo">O argumento mais forte que temos</span>
      <p>Em trinta dias, esse escritório teve <strong>três petições iniciais indeferidas e dois processos arquivados</strong>. Emenda não cumprida, comprovante de endereço não juntado, procuração não regularizada.</p>
      <p><strong>Nenhum perdeu no mérito. Perdeu porque a publicação não foi lida — ou foi lida e não cumprida, por falta de tempo.</strong></p>
      <p>É isso que o Pulso impede. Não é “nós protocolamos para você” — é <strong>“nós não deixamos seu processo morrer por um comprovante de residência”</strong>.</p>
    </div>
    <div class="caixa ok">
      <span class="rotulo">E o outro lado da mesma moeda</span>
      <p>No mesmo mês ele ganhou <strong>duas apelações no TRF1</strong>, teve um benefício assistencial concedido com liminar e <strong>um pagamento já depositado esperando ele sacar</strong>. Publicação sem leitura não é só prazo perdido — é dinheiro parado e boa notícia que o cliente dele não recebe.</p>
    </div>
  </div>
</section>

<section>
  <div class="col">
    <h2>Diagnóstico ao vivo</h2>
    <p class="lede">Digite a OAB dele e veja o que aconteceu nos processos nos últimos 30 dias. Busca direto no Diário de Justiça Eletrônico Nacional, que é público — leva segundos e pode ser feito durante a ligação.</p>
  </div>

  <div class="calc">
    <span class="rotulo">Diagnóstico do escritório · últimos 30 dias</span>
    <div class="diag-form">
      <div class="campo">
        <label for="oab">Número da OAB</label>
        <input type="text" id="oab" inputmode="numeric" placeholder="48702" autocomplete="off">
      </div>
      <div class="campo">
        <label for="uf">UF</label>
        <select id="uf">
          <option>AC</option><option>AL</option><option>AP</option><option>AM</option><option>BA</option>
          <option>CE</option><option>DF</option><option>ES</option><option selected>GO</option><option>MA</option>
          <option>MT</option><option>MS</option><option>MG</option><option>PA</option><option>PB</option>
          <option>PR</option><option>PE</option><option>PI</option><option>RJ</option><option>RN</option>
          <option>RS</option><option>RO</option><option>RR</option><option>SC</option><option>SP</option>
          <option>SE</option><option>TO</option>
        </select>
      </div>
      <button class="btn" id="btnDiag">Rodar diagnóstico</button>
    </div>
    <p class="diag-msg" id="diagMsg">Fonte: DJEN/CNJ. A consulta sai do seu navegador direto para o diário — nada passa por nós e nada fica gravado.</p>

    <div id="diagRes">
      <div class="dgrid" id="dgrid"></div>
      <div class="leitura" id="leitura"></div>
      <div class="lista-proc" id="listaProc"></div>
      <p class="calc-nota" id="diagRodape"></p>
    </div>
  </div>

  <div class="col">
    <div class="caixa">
      <span class="rotulo">Como usar na ligação</span>
      <p>Rode <strong>antes</strong> de ligar, com a OAB que está no cadastro dele. Chegue dizendo o que encontrou: “Doutor, o senhor teve 47 publicações nos últimos 30 dias, 9 pedem alguma providência e 2 são sentença. Quer que eu te mande a lista?”</p>
      <p>É o abridor mais forte que o produto tem. E funciona porque não é promessa — é a carteira dele na tela.</p>
    </div>
  </div>
</section>

<section>
  <div class="col"><h2>Preço</h2>
  <p class="lede">Tudo debitado do pacote Soberano. Não há mensalidade nova e não há fatura à parte — o que muda é o consumo do pacote que ele já tem.</p></div>

  <div class="tabela-wrap">
    <table>
      <thead><tr><th>Item</th><th class="v">Valor</th><th>Como cobra</th></tr></thead>
      <tbody>
        <tr><td><strong>Configuração do escritório</strong></td><td class="v">R$ 1.500</td><td>Uma única vez. Certificado no cofre, conexão com os tribunais, captura das publicações e agente no WhatsApp</td></tr>
        <tr><td><strong>Triagem</strong></td><td class="v">R$ 10,00</td><td><strong>Por publicação.</strong> Capturar a publicação e ler</td></tr>
        <tr><td><strong>Acompanhamento</strong></td><td class="v">R$ 10,00</td><td><strong>Por publicação.</strong> Decidir o que precisa ser feito, cadastrar o caso na plataforma, lançar no relatório do dia, mandar a pendência no WhatsApp e cadastrar no sistema de gestão dele</td></tr>
        <tr><td><strong>Protocolo ou distribuição</strong></td><td class="v">R$ 5,00</td><td>Por ato protocolado</td></tr>
        <tr class="destaque"><td><strong>Diagnóstico de processo parado</strong></td><td class="v">R$ 30,00</td><td>Por processo, sob demanda. Para a carteira que <em>não</em> teve publicação</td></tr>
        <tr><td><strong>Peças, pareceres e cálculos</strong></td><td class="v">tabela</td><td>Preço normal do pacote, sem mudança — ele já pagaria por isso de qualquer forma</td></tr>
      </tbody>
    </table>
  </div>

  <div class="col">
    <div class="caixa">
      <span class="rotulo">A conta que vocês precisam saber de cor</span>
      <p><strong>Toda publicação custa R$ 20</strong> — R$ 10 de triagem e R$ 10 de acompanhamento. São as duas metades do mesmo trabalho: ler o que saiu, e decidir o que fazer com aquilo. Mesmo quando a publicação não gera ato nenhum, o processo foi lido e entrou no relatório do dia dele.</p>
      <p>Some R$ 5 por protocolo. <strong>Processo que não publicou no mês não gera conta nenhuma.</strong></p>
    </div>
    <div class="caixa">
      <span class="rotulo">Leia antes de falar número</span>
      <p>O que o Pulso acrescenta ao consumo dele são <strong>triagem, acompanhamento e protocolo</strong>. As peças que saírem daí já estavam no pacote — ele as encomendaria de qualquer jeito quando descobrisse o prazo. <strong>Deixe isso explícito</strong>, ou o cliente soma tudo e acha que o produto custa o dobro.</p>
    </div>
  </div>
</section>

<section class="col">
  <h2>Diagnóstico de processo parado</h2>
  <p class="lede">O serviço que resolve a outra metade da carteira — a que não aparece em publicação nenhuma, e por isso ninguém olha.</p>
  <p>Publicação só mostra o processo que se mexeu. O que está <strong>parado</strong> continua parado, em silêncio, às vezes por anos. É aí que mora o dinheiro esquecido do escritório: execução que ninguém impulsionou, cumprimento de sentença que não foi iniciado, RPV que ninguém sacou.</p>
  <p>Por <strong>R$ 30 por processo</strong>, a Facilita baixa os autos, lê o caso inteiro e responde duas perguntas, só duas:</p>
  <div class="caixa">
    <span class="rotulo">O que o cliente recebe por processo</span>
    <ul>
      <li><strong>Em que fase está</strong> — do que se trata a ação e onde ela parou.</li>
      <li><strong>O que fazer para impulsionar</strong> — o ato concreto que destrava, nomeado.</li>
    </ul>
  </div>
  <p>Tudo isso vira <strong>um relatório único</strong> com a carteira analisada. O advogado lê, marca o que quer que ande e <strong>autoriza os impulsionamentos de uma vez</strong> — ou nenhum, se preferir. Cada impulsionamento autorizado vira peça pela tabela normal do pacote.</p>
  <div class="caixa ok">
    <span class="rotulo">Por que isso vende sozinho</span>
    <p>É o único item da tabela que <strong>o cliente compra olhando para o retorno, não para o custo</strong>. R$ 30 para descobrir se um processo parado há dois anos ainda tem dinheiro dentro é barato em qualquer conta que ele faça. Ofereça para a carteira antiga, e ofereça em lote.</p>
  </div>
</section>

<section>
  <div class="col">
    <h2>Calculadora de consumo</h2>
    <p class="lede">Quanto o Pulso consome do pacote por mês, a partir do tamanho da carteira. As proporções vêm do escritório-piloto, medidas em 30 dias reais.</p>
  </div>

  <div class="calc">
    <span class="rotulo">Estimativa mensal de consumo</span>
    <div>
      <label for="qtd">Processos ativos na carteira do escritório</label>
      <div class="calc-campo">
        <input type="number" id="qtd" value="500" min="20" max="3000" step="10" aria-label="Processos ativos">
        <input type="range" id="slider" value="500" min="20" max="3000" step="10" aria-label="Ajustar processos ativos">
        <span class="un">processos</span>
      </div>
    </div>

    <div class="calc-out">
      <div class="linha-out">
        <span class="oque">Triagem<em>capturar e ler · 22,7 publicações por 100 processos ativos</em></span>
        <span class="qt" id="q1">—</span><span class="vl" id="v1">—</span>
      </div>
      <div class="linha-out">
        <span class="oque">Acompanhamento<em>decidir o que fazer · uma por publicação</em></span>
        <span class="qt" id="q2">—</span><span class="vl" id="v2">—</span>
      </div>
      <div class="linha-out">
        <span class="oque">Protocolos e distribuições<em>5,2 por 100 processos ativos ao mês</em></span>
        <span class="qt" id="q3">—</span><span class="vl" id="v3">—</span>
      </div>
      <div class="linha-out total">
        <span class="oque">Por mês</span><span class="qt"></span><span class="vl" id="vt">—</span>
      </div>
    </div>

    <p class="calc-nota"><strong>Fora disso:</strong> R$ 1.500 de configuração, uma única vez. O diagnóstico de processo parado, a R$ 30 cada, só quando ele pedir. E as peças que a triagem gerar, no preço normal do pacote — essas ele já pagaria de qualquer forma.</p>
  </div>

  <div class="col"><h3>Referências rápidas, para não precisar da calculadora na ligação</h3></div>

  <div class="tabela-wrap">
    <table>
      <thead><tr><th>Carteira</th><th class="v">Publicações</th><th class="v">Protocolos</th><th class="v">Por mês</th></tr></thead>
      <tbody>
        <tr><td>100 processos</td><td class="v">23</td><td class="v">5</td><td class="v">R$ 485</td></tr>
        <tr><td>250 processos</td><td class="v">57</td><td class="v">13</td><td class="v">R$ 1.205</td></tr>
        <tr class="destaque"><td><strong>500 processos</strong></td><td class="v">113</td><td class="v">26</td><td class="v">R$ 2.390</td></tr>
        <tr><td>600 processos <em style="color:var(--ink-3);font-style:normal;font-size:12px">(o piloto, real)</em></td><td class="v">136</td><td class="v">31</td><td class="v">R$ 2.875</td></tr>
        <tr><td>1.000 processos</td><td class="v">227</td><td class="v">52</td><td class="v">R$ 4.800</td></tr>
      </tbody>
    </table>
  </div>

  <div class="col">
    <div class="caixa">
      <span class="rotulo">Como usar isso na conversa</span>
      <p>Um escritório de <strong>500 processos ativos</strong> consome <strong>cerca de R$ 2.400 por mês</strong>. Diga o número e pare. Se ele achar alto, a próxima frase não é desconto — é: <strong>“e quanto custa hoje a pessoa que deveria estar fazendo isso, com encargos, no mês em que ela falta?”</strong></p>
      <p>Lembre que esse valor <strong>não é cobrança nova</strong>: sai do pacote Soberano que ele já contratou. E que <strong>mês parado não gera conta</strong> — diferente de folha.</p>
    </div>
    <p style="font-size:13.5px;color:var(--ink-3);line-height:1.55">As proporções saem de um escritório previdenciário com 600 processos ativos, medido entre 16/09 e 16/10/2026. Carteira trabalhista tende a publicar mais; carteira cível, menos. <strong>Trate como estimativa</strong> e confirme com o diagnóstico ao vivo da OAB dele.</p>
  </div>
</section>

<section class="col">
  <h2>Para quem oferecer</h2>
  <div class="caixa ok">
    <span class="rotulo">Ofereça quando ouvir</span>
    <p>“Eu capto bem, o problema é dar conta.” · “Não quero contratar mais ninguém.” · “Já tive funcionário e não compensa.” · “Tenho processo parado que eu nem sei em que pé está.” · “Já perdi prazo.” · “Fico o dia inteiro no sistema do tribunal.” · “Tenho caso pronto para distribuir há meses.”</p>
  </div>
  <div class="caixa nao">
    <span class="rotulo">Segure quando</span>
    <p>O volume é baixo demais. Advogado com vinte processos ativos não sente a dor que o produto cura e vai achar caro por publicação — para ele, venda a esteira de peças, que é o que resolve.</p>
  </div>
  <p><strong>Perfil ideal:</strong> advogado ou banca pequena com <strong>carteira de 100 processos para cima</strong>, forte em captação, que não quer montar nem manter estrutura administrativa. Previdenciário e trabalhista sofrem mais, porque o volume de publicações é alto e repetitivo.</p>
</section>

<section class="col">
  <h2>As seis objeções que vão aparecer</h2>
  <div class="obj">
    <div class="o">
      <p class="fala">Vou ter que entregar meu certificado digital para vocês?</p>
      <p class="resp">O certificado fica num <strong>cofre digital com senha, e continua sendo dele</strong> — pode revogar a qualquer hora, sozinho, sem falar com ninguém. Todo protocolo sai no nome do advogado responsável pela causa, nunca no nosso. E o mais importante: <strong>ele continua entrando no tribunal normalmente, pelo aplicativo dele.</strong> Nada no dia a dia do escritório muda.</p>
      <p class="nota">É a objeção que mais mata venda. Trate antes que ele pergunte — quem esconde o assunto cria desconfiança.</p>
    </div>
    <div class="o">
      <p class="fala">E se vocês perderem meu prazo?</p>
      <p class="resp">Três respostas, nessa ordem. <strong>O prazo nunca é calculado por nós</strong> — é lido dentro do processo, onde o próprio tribunal gravou a data final. <strong>Só assumimos o que ainda tem prazo hábil com folga</strong>: chegando em cima da hora, recusamos e avisamos, em vez de arriscar. E <strong>o protocolo só sai depois que ele autoriza</strong> — a decisão final é dele, registrada com data e hora.</p>
    </div>
    <div class="o">
      <p class="fala">A OAB permite isso?</p>
      <p class="resp">Permite, e o desenho é exatamente para isso. Entregamos uma <strong>minuta</strong>; quem revisa, aprova e autoriza é o advogado. O protocolo só sai do clique dele. <strong>Nós não exercemos advocacia e não assinamos nada</strong> — somos estrutura, como o contador ou o sistema de gestão dele.</p>
    </div>
    <div class="o">
      <p class="fala">Eu já assino o Jus Brasil, já recebo as publicações.</p>
      <p class="resp">Receber a publicação é o fácil — nós fazemos isso de graça, direto do diário oficial. <strong>O problema dele nunca foi receber, foi o que vem depois:</strong> ler, entender o que o juiz mandou fazer, descobrir até quando, escrever a peça e protocolar. O Jus Brasil entrega o aviso e para aí. <strong>Pergunte quantas publicações estão não lidas na caixa dele agora.</strong></p>
      <p class="nota">Dado útil: no piloto, <strong>56% das publicações do tribunal estadual chegam sem o conteúdo</strong> — só o aviso de que algo aconteceu. Nós abrimos o processo para descobrir o quê. Nenhum serviço de publicação faz isso.</p>
    </div>
    <div class="o">
      <p class="fala">Quanto fica por mês?</p>
      <p class="resp">Não há valor fixo novo: <strong>sai do pacote Soberano que ele já tem.</strong> Use a calculadora com a carteira dele e dê o número de uma vez — cerca de R$ 2.400 para 500 processos. E a frase que desarma: <strong>“mês parado não gera conta”</strong>, que é o contrário de folha.</p>
    </div>
    <div class="o">
      <p class="fala">Vocês atendem o meu tribunal?</p>
      <p class="resp">Para <strong>ler publicações e acompanhar prazos, atendemos o Brasil inteiro</strong> — a fonte é nacional. Para <strong>protocolar</strong>, a cobertura ainda cresce tribunal a tribunal. <strong>Confirme com o time antes de prometer.</strong> Se o dele ainda não estiver pronto, venda a triagem e as peças agora e o protocolo quando entrar. Protocolo prometido e não entregue destrói a confiança neste produto.</p>
    </div>
  </div>
</section>

<section class="col">
  <h2>O que não prometer</h2>
  <div class="caixa nao">
    <span class="rotulo">Limites honestos</span>
    <ul>
      <li><strong>Não prometa cobertura total de protocolo.</strong> Está em construção. Pergunte antes de afirmar.</li>
      <li><strong>Não prometa prazo recuperado.</strong> O que venceu antes de entrarmos, analisamos e dizemos o que ainda cabe — sem garantir reverter.</li>
      <li><strong>Não diga que ele não precisa olhar mais nada.</strong> Ele confere a peça e autoriza o protocolo. É exigência da OAB e é o que protege os dois.</li>
      <li><strong>Não prometa resultado no diagnóstico de processo parado.</strong> Os R$ 30 pagam a análise e a indicação do caminho, não a garantia de que há dinheiro lá dentro.</li>
      <li><strong>Não prometa data de implantação apertada.</strong> O escritório entra em operação depois da configuração, que depende do certificado digital dele chegar.</li>
      <li><strong>Não cite o nome de outro cliente.</strong> Os números desta página são internos. Diga “um escritório previdenciário em Goiás”.</li>
    </ul>
  </div>
</section>

<section class="col">
  <h2>Como conduzir a conversa</h2>

  <div class="script">
    <span class="rotulo">Abertura — com o diagnóstico já rodado</span>
    <p>“Doutor, antes de ligar eu dei uma olhada nos seus processos. O senhor teve <strong>X publicações nos últimos 30 dias</strong>, e <strong>Y delas pedem alguma providência</strong>. Hoje, quem lê isso aí? … E está dando conta?”</p>
    <p class="acao">Deixe ele descrever o problema inteiro antes de falar da solução. Quanto mais ele falar, menos você precisa argumentar.</p>
  </div>

  <div class="script">
    <span class="rotulo">A virada</span>
    <p>“A gente lançou um serviço novo chamado Pulso. <strong>Depois que o cliente assina a procuração, a gente faz o resto</strong> — pega os documentos, cadastra, escreve a peça, organiza os anexos, distribui ou protocola, lê as publicações todo dia e dá qualquer andamento que o processo pedir. O senhor entra em dois momentos: para conferir a peça e para autorizar o protocolo.”</p>
    <p class="acao">Aqui, pare. A primeira pergunta dele diz qual objeção tratar.</p>
  </div>

  <div class="script">
    <span class="rotulo">O número</span>
    <p>“Com a sua carteira, isso consome por volta de <strong>R$ 2.400 por mês do seu pacote</strong> — e não é cobrança nova, sai do Soberano que o senhor já tem. <strong>Mês que o processo não anda, não gera conta</strong> — o que é o contrário de ter funcionário. E roda 24 horas por dia, 7 dias por semana.”</p>
    <p class="acao">Rode a calculadora com a carteira real dele antes da ligação. Chegar com o número pronto vale mais do que qualquer argumento.</p>
  </div>

  <div class="script">
    <span class="rotulo">O fechamento</span>
    <p>“Me deixa fazer o seguinte: eu te mando <strong>a lista dos seus processos que pedem providência</strong>, com o que cada um precisa. Sem compromisso. Se não fizer sentido, a gente para por aí.”</p>
    <p class="acao">É o fechamento mais forte do produto e custa quase nada — o diagnóstico já está rodado. No piloto, revelou cinco processos perdidos e onze vitórias que o próprio advogado não conhecia. É muito difícil dizer não depois de ver a própria carteira na tela.</p>
  </div>

  <div class="script">
    <span class="rotulo">A segunda venda, para a carteira antiga</span>
    <p>“E o que está parado, doutor? Aquele processo que não publica nada há dois anos — o senhor sabe em que pé está? Por <strong>R$ 30 cada</strong> a gente abre, lê e te diz em que fase está e o que destrava. O senhor olha o relatório e manda tocar o que quiser.”</p>
    <p class="acao">Faça essa oferta depois que o Pulso estiver rodando, não junto. Primeiro ele vê o serviço funcionando; aí a carteira antiga vira a conversa seguinte.</p>
  </div>
</section>

<section class="col">
  <h2>Antes de ofertar</h2>
  <ol>
    <li><strong>Confirme que o cliente é Soberano.</strong> O Pulso não está disponível nos outros pacotes nesta fase.</li>
    <li><strong>Rode o diagnóstico</strong> com a OAB dele e leve o que encontrou.</li>
    <li><strong>Rode a calculadora</strong> com a carteira dele e leve o número pronto.</li>
    <li><strong>Confirme a cobertura de protocolo</strong> no tribunal onde ele atua.</li>
    <li><strong>Alinhe a implantação</strong> antes de prometer data: certificado digital, acesso aos tribunais e inclusão do nosso número no grupo de WhatsApp do escritório.</li>
  </ol>
  <p>Dúvida sobre caso específico, fale comigo antes de prometer. O produto é novo e estamos aprendendo com cada escritório — o que vocês ouvirem dos clientes muda o desenho, então me tragam.</p>
</section>

<footer>
  Material interno da Facilita Jurídico · outubro de 2026 · As proporções da calculadora vêm do primeiro escritório atendido, medidas sobre 30 dias de publicações reais. O diagnóstico consulta o DJEN/CNJ, que é público, direto do navegador. Não cite o nome do cliente fora de casa.
</footer>

</div>
`;

export default function Page() {
  useEffect(() => {

  /* ---------------- calculadora de consumo ---------------- */
  var POR100 = { pub: 136/600, prot: 31/600 };   // medido no escritório-piloto
  var PRECO  = { triagem: 10, acomp: 10, prot: 5 };
  var qtd = document.getElementById('qtd');
  var slider = document.getElementById('slider');

  function moeda(v){ return 'R$ ' + Math.round(v).toLocaleString('pt-BR'); }
  function plural(n, s, p){ return n + ' ' + (n === 1 ? s : p); }

  function calcular(n){
    n = Math.max(20, Math.min(3000, Math.round(n) || 0));
    var pub  = Math.round(n * POR100.pub);
    var prot = Math.round(n * POR100.prot);
    var v1 = pub * PRECO.triagem, v2 = pub * PRECO.acomp, v3 = prot * PRECO.prot;
    document.getElementById('q1').textContent = plural(pub, 'publicação', 'publicações');
    document.getElementById('q2').textContent = plural(pub, 'publicação', 'publicações');
    document.getElementById('q3').textContent = plural(prot, 'ato', 'atos');
    document.getElementById('v1').textContent = moeda(v1);
    document.getElementById('v2').textContent = moeda(v2);
    document.getElementById('v3').textContent = moeda(v3);
    document.getElementById('vt').textContent = moeda(v1 + v2 + v3);
  }
  qtd.addEventListener('input', function(){ slider.value = qtd.value; calcular(Number(qtd.value)); });
  slider.addEventListener('input', function(){ qtd.value = slider.value; calcular(Number(slider.value)); });
  calcular(500);

  /* ---------------- diagnóstico por OAB ---------------- */
  var API = 'https://comunicaapi.pje.jus.br/api/v1/comunicacao';
  var btn = document.getElementById('btnDiag');
  var msg = document.getElementById('diagMsg');
  var res = document.getElementById('diagRes');

  function iso(d){ return d.toISOString().slice(0,10); }
  function limpar(html){
    var t = String(html || '').replace(/<[^>]+>/g, ' ');
    var ta = document.createElement('textarea'); ta.innerHTML = t;
    return ta.value.replace(/\s+/g, ' ').trim();
  }
  function hash(s){ var h = 0, i; for (i = 0; i < s.length; i++){ h = (h*31 + s.charCodeAt(i)) | 0; } return h; }

  var RE = {
    semTeor: /ARQUIVOS DIGITAIS INDISPON|SEGREDO DE JUSTI/i,
    decisao: /SENTEN[ÇC]A|AC[ÓO]RD[ÃA]O|A C [ÓO] R D [ÃA] O|JULGO|INDEFIRO A PETI|HOMOLOGO|NEGAR PROVIMENTO|DAR PROVIMENTO|EXTINT/i,
    agenda:  /per[íi]cia|audi[êe]ncia|estudo social|pauta de julgamento|sess[ãa]o virtual/i,
    dinheiro:/\bRPV\b|requisi[çc][ãa]o de pequeno valor|precat[óo]rio|alvar[áa]|dep[óo]sito judicial/i,
    ato:     /intim(e-se|em-se|ada|ado|a[çc][ãa]o)[^.]{0,90}(parte autora|autor|exequente|requerente|patrono|advogad)/i,
    ato2:    /(manifest\w+|emend\w+|apresent\w+|especific\w+|requeir\w+|junt\w+|comprov\w+|impugn\w+|recolh\w+)[^.]{0,60}prazo de \d+/i,
    ato3:    /sob pena de (extin|indeferimento|arquivamento|preclus)/i,
    prazo:   /prazo de (\d+)\s*\(?\s*[a-zç]*\s*\)?\s*dias/i
  };

  function classificar(t){
    if (RE.semTeor.test(t) || t.length < 200) return { tipo:'cego', rotulo:'Sem teor' };
    if (RE.ato.test(t) || RE.ato2.test(t) || RE.ato3.test(t)) return { tipo:'ato', rotulo:'Pede providência' };
    if (RE.decisao.test(t)) return { tipo:'dec', rotulo:'Decisão' };
    if (RE.agenda.test(t))  return { tipo:'age', rotulo:'Agenda' };
    return { tipo:'dec', rotulo:'Andamento' };
  }

  async function buscar(oab, uf){
    var hoje = new Date(), ini = new Date(); ini.setDate(hoje.getDate() - 30);
    var todos = [], pagina = 1;
    while (pagina <= 6){
      var url = API + '?numeroOab=' + encodeURIComponent(oab) + '&ufOab=' + encodeURIComponent(uf)
              + '&dataDisponibilizacaoInicio=' + iso(ini) + '&dataDisponibilizacaoFim=' + iso(hoje)
              + '&pagina=' + pagina + '&itensPorPagina=100';
      var r = await fetch(url, { headers: { 'Accept':'application/json' } });
      if (!r.ok) throw new Error('O diário respondeu ' + r.status);
      var j = await r.json();
      var itens = (j && j.items) || [];
      todos = todos.concat(itens);
      if (itens.length < 100) break;
      pagina++;
    }
    return todos;
  }

  function render(brutas){
    var vistos = {}, eventos = [];
    brutas.forEach(function(it){
      var txt = limpar(it.texto);
      var k = it.numero_processo + '|' + it.data_disponibilizacao + '|' + hash(txt);
      if (vistos[k]) return;
      vistos[k] = 1;
      eventos.push({
        proc: it.numeroprocessocommascara || it.numero_processo,
        trib: it.siglaTribunal, orgao: it.nomeOrgao || '',
        data: it.datadisponibilizacao || it.data_disponibilizacao,
        txt: txt, cls: classificar(txt),
        prazo: (txt.match(RE.prazo) || [])[1] || null,
        dinheiro: RE.dinheiro.test(txt)
      });
    });

    var proc = {}; eventos.forEach(function(e){ proc[e.proc] = 1; });
    var nProc = Object.keys(proc).length;
    var atos  = eventos.filter(function(e){ return e.cls.tipo === 'ato'; });
    var cegos = eventos.filter(function(e){ return e.cls.tipo === 'cego'; });
    var decs  = eventos.filter(function(e){ return e.cls.tipo === 'dec'; });
    var agen  = eventos.filter(function(e){ return e.cls.tipo === 'age'; });
    var grana = eventos.filter(function(e){ return e.dinheiro; });

    var pctCego = eventos.length ? Math.round(cegos.length / eventos.length * 100) : 0;
    var custo = eventos.length * (PRECO.triagem + PRECO.acomp);

    document.getElementById('dgrid').innerHTML =
      kpi(brutas.length, 'publicações no diário') +
      kpi(eventos.length, 'eventos reais<br>(sem as repetições)') +
      kpi(nProc, 'processos') +
      kpi(atos.length, 'pedem providência', 'mau') +
      kpi(decs.length, 'decisões e sentenças', 'av') +
      kpi(cegos.length, 'sem teor no diário (' + pctCego + '%)', 'av');

    var frases = [];
    frases.push('<p>Em 30 dias saíram <b>' + brutas.length + ' publicações</b> para essa OAB. Deduplicadas — o diário repete a mesma decisão uma vez por destinatário — viram <b>' + eventos.length + ' eventos reais</b>, em <b>' + nProc + ' processos</b>.</p>');
    if (atos.length) frases.push('<p><b>' + atos.length + '</b> ' + (atos.length === 1 ? 'pede' : 'pedem') + ' alguma providência: manifestação, emenda, cálculo, documento. Cada um desses tem prazo correndo.</p>');
    if (cegos.length) frases.push('<p><b>' + cegos.length + ' chegaram sem o conteúdo</b> (' + pctCego + '% do total) — o tribunal publicou só o aviso e guardou o ato dentro do sistema. Ninguém consegue triar isso sem abrir o processo. É exatamente o que o Pulso faz.</p>');
    if (grana.length) frases.push('<p>Há <b>' + grana.length + '</b> ' + (grana.length === 1 ? 'publicação que menciona' : 'publicações que mencionam') + ' RPV, precatório, alvará ou depósito. Pode haver dinheiro parado esperando saque.</p>');
    if (agen.length) frases.push('<p><b>' + agen.length + '</b> ' + (agen.length === 1 ? 'envolve' : 'envolvem') + ' perícia, audiência ou pauta de julgamento — data que não pode passar em branco.</p>');
    frases.push('<p>No Pulso, esse mês custaria <b>' + moeda(custo) + '</b> de triagem e acompanhamento, mais R$ 5 por protocolo. <em style="color:#7E8BA5">Estimativa pelo que o diário mostra; o prazo real só sai dos autos.</em></p>');
    document.getElementById('leitura').innerHTML = frases.join('');

    var destaque = atos.concat(decs).slice(0, 12);
    document.getElementById('listaProc').innerHTML = destaque.length ? destaque.map(function(e){
      var det = e.orgao ? e.trib + ' · ' + e.orgao : e.trib;
      if (e.prazo) det += ' · prazo de ' + e.prazo + ' dias';
      return '<div class="lp"><span class="pr">' + e.proc + '<span class="ds">' + e.data + ' · ' + det + '</span></span>'
           + '<span class="tg ' + e.cls.tipo + '">' + e.cls.rotulo + '</span></div>';
    }).join('') : '';

    document.getElementById('diagRodape').innerHTML =
      'Mostrando ' + destaque.length + ' de ' + eventos.length + ' eventos. '
      + '<strong>Classificação automática por palavra-chave</strong> — serve para abrir a conversa, não para dar prazo. '
      + 'A triagem de verdade abre os autos e lê a data que o tribunal gravou.';
    res.style.display = 'block';
  }

  function kpi(n, rot, cls){
    return '<div class="dk' + (cls ? ' ' + cls : '') + '"><b>' + n + '</b><i>' + rot + '</i></div>';
  }

  btn.addEventListener('click', async function(){
    var oab = (document.getElementById('oab').value || '').replace(/\D/g, '');
    var uf  = document.getElementById('uf').value;
    if (!oab){ msg.className = 'diag-msg erro'; msg.textContent = 'Digite o número da OAB.'; return; }
    btn.disabled = true;
    msg.className = 'diag-msg';
    msg.textContent = 'Consultando o diário…';
    res.style.display = 'none';
    try {
      var brutas = await buscar(oab, uf);
      if (!brutas.length){
        msg.textContent = 'Nenhuma publicação para a OAB ' + oab + '/' + uf + ' nos últimos 30 dias. Confira o número e a UF — e lembre que carteira pequena ou mês parado realmente não publica.';
      } else {
        msg.textContent = 'Diagnóstico da OAB ' + oab + '/' + uf + ', últimos 30 dias.';
        render(brutas);
      }
    } catch (e) {
      msg.className = 'diag-msg erro';
      msg.textContent = 'Não consegui consultar agora: ' + e.message + '. Tente de novo em instantes.';
    }
    btn.disabled = false;
  });

  document.getElementById('oab').addEventListener('keydown', function(ev){
    if (ev.key === 'Enter') btn.click();
  });

  }, []);

  return <div dangerouslySetInnerHTML={{ __html: HTML }} />;
}
