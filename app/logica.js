// Calculadora de consumo e diagnostico por OAB. Gerado de vender-retaguarda.html.
import { LOGO } from "./logo";

export function iniciar() {
  document.getElementById('logoFJ').innerHTML = LOGO;

  (function(){
    /* ================= calculadora de consumo ================= */
    var POR100 = { pub: 136/600, prot: 31/600 };
    var PRECO  = { triagem: 10, acomp: 10, prot: 5 };
    var qtd = document.getElementById('qtd'), slider = document.getElementById('slider');
    var modo = 'estimado', medida = null;

    function moeda(v){ return 'R$ ' + Math.round(v).toLocaleString('pt-BR'); }
    function plural(n,s,p){ return n + ' ' + (n===1?s:p); }
    function num(id, padrao){
      var v=(document.getElementById(id).value||'').replace(/[^0-9]/g,'');
      return v ? Number(v) : padrao;
    }
    function tempo(min){
      if (min < 60) return Math.round(min) + ' min';
      var h = min/60;
      return (h<10 ? h.toFixed(1).replace('.',',') : String(Math.round(h))) + 'h';
    }

    function calcular(){
      var pub, prot, e1, e2, e3;
      if (modo === 'medido' && medida){
        pub = medida.pubMes; prot = medida.protMes;
        e1 = 'medido no diário · média dos últimos 12 meses';
        e2 = 'uma por publicação';
        e3 = 'atos com prazo, contados no próprio diário';
      } else {
        var n = Math.max(20, Math.min(6000, Math.round(Number(qtd.value))||0));
        pub  = Math.round(n*POR100.pub);
        prot = Math.round(n*POR100.prot);
        e1 = 'capturar e ler · 22,7 publicações por 100 processos ativos';
        e2 = 'decidir o que fazer · uma por publicação';
        e3 = '5,2 por 100 processos ativos ao mês';
      }
      var v1=pub*PRECO.triagem, v2=pub*PRECO.acomp, v3=prot*PRECO.prot;
      document.getElementById('e1').textContent = e1;
      document.getElementById('e2').textContent = e2;
      document.getElementById('e3').textContent = e3;
      document.getElementById('q1').textContent = plural(pub,'publicação','publicações');
      document.getElementById('q2').textContent = plural(pub,'publicação','publicações');
      document.getElementById('q3').textContent = plural(prot,'ato','atos');
      document.getElementById('v1').textContent = moeda(v1);
      document.getElementById('v2').textContent = moeda(v2);
      document.getElementById('v3').textContent = moeda(v3);
      document.getElementById('vt').textContent = moeda(v1+v2+v3);
      pintarPacotes(v1+v2+v3);
    }
    /* Valores de tabela. A quantidade de serviços e a validade conferidas no banco
       da Facilita em 19/10/2026. O saldo é monetário: o Pulso debita reais, não
       contagem de serviços. Soberano em 60 dias, como a casa pratica. */
    var PACOTES = [
      { nome:'Start',    preco:640,   servicos:4,   meses:12 },
      { nome:'Premium',  preco:1960,  servicos:14,  meses:12 },
      { nome:'Infinity', preco:8400,  servicos:70,  meses:12 },
      { nome:'Soberano', preco:10000, servicos:142, meses:2  }
    ];

    /* Quanto o Pulso custa por processo ativo ao mês, pelas proporções do piloto.
       É o que permite dizer até que carteira cada pacote aguenta. */
    function custoPorProcesso(){
      return POR100.pub*(PRECO.triagem+PRECO.acomp) + POR100.prot*PRECO.prot;
    }

    function pintarPacotes(custoPulso){
      var linhas = ['<div class="pacL cab"><span>Pacote</span><span>Saldo por mês</span>'
                  + '<span>Pulso</span><span>Sobra ou falta</span><span>Cobre até</span><span></span></div>'];
      var ideal = null, porProc = custoPorProcesso();
      PACOTES.forEach(function(k){
        var saldo = k.preco / k.meses;
        var porPeca = k.preco / k.servicos;
        var sobra = saldo - custoPulso;
        var cabe  = sobra >= porPeca;          // sobra ao menos uma peça
        if (cabe && !ideal) ideal = k.nome;
        // maior carteira que ainda deixa uma peça de folga
        k._cobre = Math.max(0, Math.floor((saldo - porPeca) / porProc));
        k._saldo=saldo; k._sobra=sobra; k._cabe=cabe; k._peca=porPeca;
      });
      PACOTES.forEach(function(k){
        var cls = k._cabe ? 'cabe' : (k._sobra >= 0 ? 'justo' : 'nao');
        var np  = Math.floor(k._sobra/k._peca);
        var txt = k._cabe ? (np + (np===1 ? ' peça' : ' peças')) : (k._sobra >= 0 ? 'não sobra peça' : 'não cabe');
        // a pergunta que importa: falta quanto?
        var col4 = k._sobra >= 0
          ? '<b>+'+moeda(k._sobra)+'</b>'
          : '<b style="color:#F08C7E">faltam '+moeda(-k._sobra)+'</b>';
        linhas.push('<div class="pacL'+(k.nome===ideal?' ideal':'')+'">'
          + '<span class="pn">'+k.nome+(k.nome===ideal?' &middot; ideal':'')+'</span>'
          + '<span class="pv"><b>'+moeda(k._saldo)+'</b></span>'
          + '<span class="pv">'+moeda(custoPulso)+'</span>'
          + '<span class="pv">'+col4+'</span>'
          + '<span class="pv">'+(k._cobre ? k._cobre+' proc.' : '—')+'</span>'
          + '<span class="tag '+cls+'">'+txt+'</span></div>');
      });
      document.getElementById('pacotes').innerHTML = linhas.join('');
      document.getElementById('pacoteNota').innerHTML = ideal
        ? 'Com esse volume, o menor pacote que comporta o Pulso <b>e ainda deixa saldo para peças</b> é o <b>'
          + ideal + '</b>. Abaixo dele, o Pulso consome o pacote inteiro e não sobra nada para petição — '
          + 'o que na prática significa que o cliente vai precisar comprar avulso.'
        : 'Com esse volume, <b>nenhum pacote comporta o Pulso sozinho</b>. É carteira para Soberano com '
          + 'condição negociada — fale comigo antes de dar número.';
      document.getElementById('pacoteNota').innerHTML +=
        '<br><br>Saldo por mês = preço do pacote dividido pela validade. Start, Premium e Infinity em 12 meses; '
        + '<b>Soberano em 60 dias</b>, que é como a casa pratica — por isso o saldo mensal dele é tão maior. '
        + 'O que sobra está em reais e em quantas peças cabem, pelo preço por serviço daquele pacote '
        + '(Start R$ 160, Premium R$ 140, Infinity R$ 120, Soberano R$ 70).'
        + '<br><br><b>Por que o Infinity cobre tão menos que o Soberano?</b> Não é o preço, é a validade. '
        + 'O Infinity são R$ 8.400 para <b>12 meses</b> — R$ 700 por mês. O Soberano são R$ 10.000 para '
        + '<b>60 dias</b> — R$ 5.000 por mês. Sete vezes mais saldo mensal por um preço 19% maior. '
        + 'A coluna <b>Cobre até</b> diz a maior carteira que cada pacote aguenta deixando ainda uma peça de folga.';
    }

    function manual(v){ modo='estimado'; qtd.value=v; slider.value=Math.min(3000,Math.max(20,v)); calcular(); }
    qtd.addEventListener('input', function(){ manual(Number(qtd.value)); });
    slider.addEventListener('input', function(){ manual(Number(slider.value)); });
    calcular();

    /* ================= diagnóstico por OAB ================= */
    var API='https://comunicaapi.pje.jus.br/api/v1/comunicacao';
    var btn=document.getElementById('btnDiag'), msg=document.getElementById('diagMsg'), res=document.getElementById('diagRes');
    var campoOab=document.getElementById('oab');
    var ultimo=null;

    function iso(d){ return d.toISOString().slice(0,10); }
    function limpar(h){
      var t=String(h||'').replace(/<[^>]+>/g,' ');
      var ta=document.createElement('textarea'); ta.innerHTML=t;
      return ta.value.replace(/\s+/g,' ').trim();
    }
    function hash(s){ var h=0,i; for(i=0;i<s.length;i++){ h=(h*31+s.charCodeAt(i))|0; } return h; }
    function dataBR(s){ var p=(s||'').split('/'); return p.length===3 ? new Date(+p[2],+p[1]-1,+p[0]) : null; }

    var R = {
      segredo   : /SEGREDO DE JUSTI/i,
      cego      : /ARQUIVOS DIGITAIS INDISPON/i,
      procedente: /JULGO\s+(totalmente\s+|parcialmente\s+)?PROCEDENTE|julgo.{0,30}procedente/i,
      concessao : /\bCONCEDO\b|DEFIRO\s+(a\s+tutela|o\s+pedido|a\s+liminar|a\s+antecipa)|conceder\s+o\s+benef|implante\s+o\s+benef|implanta[çc][ãa]o\s+do\s+benef|antecipo\s+os\s+efeitos\s+da\s+tutela/i,
      acordo    : /HOMOLOGO.{0,45}(acordo|transa|propost)|acordo.{0,25}homologad/i,
      provGanho : /(dou|dar|dando)\s+provimento(?![^.]{0,60}do\s+INSS)|(nego|negar)\s+provimento[^.]{0,70}(do\s+INSS|da\s+(Uni[ãa]o|Fazenda|CEF|Caixa)|da\s+parte\s+r[ée])/i,
      provPerda : /(nego|negar)\s+provimento[^.]{0,70}(da\s+parte\s+autora|do\s+autor|da\s+apela[çc][ãa]o\s+da\s+parte\s+autora)|desprovid|n[ãa]o\s+provid/i,
      improc    : /IMPROCEDENTE|improcedente/i,
      indeferido: /INDEFIRO\s+A\s+PETI|indeferimento\s+da\s+(peti|inicial)|INDEFIRO\s+o\s+pedido/i,
      extinto   : /JULGO\s+EXTINT|EXTINT[OA]\s+o\s+(processo|feito)|extin[çc][ãa]o\s+do\s+(processo|feito)|sem\s+resolu[çc][ãa]o\s+(do\s+)?m[ée]rito/i,
      arquivado : /ARQUIVAMENTO|arquivem-se|arquive-se|ao\s+arquivo|baixa\s+definitiva/i,
      audiencia : /audi[êe]ncia/i,
      pericia   : /per[íi]cia|estudo\s+social/i,
      dinheiro  : /\bRPV\b|requisi[çc][ãa]o\s+de\s+pequeno\s+valor|precat[óo]rio|alvar[áa]|dep[óo]sito\s+judicial|levantamento/i,
      ato       : /intim(e-se|em-se|ada|ado|a[çc][ãa]o)[^.]{0,90}(parte\s+autora|autor|exequente|requerente|patrono|advogad)/i,
      ato2      : /(manifest\w+|emend\w+|apresent\w+|especific\w+|requeir\w+|junt\w+|comprov\w+|impugn\w+|recolh\w+)[^.]{0,60}prazo\s+de\s+\d+/i,
      ato3      : /sob\s+pena\s+de\s+(extin|indeferimento|arquivamento|preclus)/i,
      prazoN    : /prazo\s+de\s+(\d+)\s*\(?\s*[a-zç]*\s*\)?\s*dias/i,
      /* causa da derrota — é o que separa perda de tese de falha de acompanhamento */
      cEmenda   : /emend\w+[^.]{0,80}(n[ãa]o\s+(foi\s+)?(cumprid|atendid|sanad)|sem\s+cumprimento)|n[ãa]o\s+emendou|deixou\s+de\s+emendar|n[ãa]o\s+sanou/i,
      cPreparo  : /deser[çc][ãa]o|\bdeserto\b|custas[^.]{0,50}n[ãa]o\s+(recolhid|pag)|aus[êe]ncia\s+de\s+preparo/i,
      cAbandono : /abandono\s+da\s+causa|in[ée]rcia|aus[êe]ncia\s+de\s+(provid[êe]ncia|impulso)|n[ãa]o\s+promoveu\s+os\s+atos|deixou\s+de\s+promover/i,
      cPrescr   : /prescri[çc][ãa]o|decad[êe]ncia|prescrit/i,
      cIlegit   : /ilegitimidade|aus[êe]ncia\s+de\s+(interesse|legitimidade)|falta\s+de\s+interesse/i,
      cDoc      : /(n[ãa]o\s+(juntou|apresentou|comprovou)|aus[êe]ncia\s+de)[^.]{0,60}(documento|comprovante|procura[çc][ãa]o|endere[çc]o)/i,

      /* Vitória. "condeno o requerido" faltava, e por isso sentença procedente que
         terminava em "transitada em julgado, arquive-se" era contada como derrota. */
      ganho : /JULGO\s+(totalmente\s+|parcialmente\s+)?PROCEDENTE|julgo\s+[^.]{0,30}procedente|\bCONCEDO\b|DEFIRO\s+(a\s+tutela|o\s+pedido|a\s+liminar|a\s+antecipa)|conceder\s+o\s+benef|implante\s+o\s+benef|HOMOLOGO[^.]{0,45}(acordo|transa|propost)|acordo[^.]{0,25}homologad|condeno\s+(o|a)\s+(requerid|r[ée]u|INSS|parte\s+r[ée])|(dou|dar|dando)\s+provimento(?![^.]{0,60}do\s+INSS)/i,

      /* Derrota só com VERBO OPERATIVO no presente. "arquive-se" sozinho é
         encerramento de rotina — inclusive depois de uma vitória. */
      opDerrota : /JULGO\s+IMPROCEDENTE|julgo\s+[^.]{0,30}improcedente|IMPROCEDENTE\s+o\s+pedido|INDEFIRO\s+A\s+PETI|indefiro\s+a\s+(inicial|peti)|indeferimento\s+da\s+(peti|inicial)|JULGO\s+EXTINT|EXTINGO\s+o\s+(processo|feito)|extin[çc][ãa]o\s+do\s+(processo|feito)|DETERMINO\s+O\s+ARQUIVAMENTO|determino\s+o\s+arquivamento|(nego|negar)\s+provimento|desprovid|n[ãa]o\s+provid/i,

      /* "sob pena de arquivamento" é advertência futura: isso é prazo correndo. */
      aviso : /sob\s+pena\s+de/i,
      /* ato que só anda com documento do cliente — vira aviso no WhatsApp dele */
      pendCliente : /(junt\w+|apresent\w+|comprov\w+|regulariz\w+)[^.]{0,70}(documento|comprovante|procura[çc][ãa]o|endere[çc]o|c[óo]pia|certid[ãa]o|contrato|laudo|carteira|CTPS|CNIS|RG|CPF)/i
    };

    /* Descarta as frases de advertência antes de classificar. Sem isso, despacho
       que ameaça extinguir vira extinção, e o relatório mente para o advogado. */
    function operativo(t){
      return t.split('.').filter(function(f){ return !R.aviso.test(f); }).join('. ');
    }

    /* Classifica POR QUE o processo caiu. O advogado não precisa da lista de
       processos; precisa saber se perdeu por tese fraca ou por acompanhamento. */
    var CAUSAS = [
      ['emenda não cumprida',   /(emenda|irregularidade|determina[çc][ãa]o)[^.]{0,90}(n[ãa]o\s+(foi\s+)?(cumprid|atendid|sanad)|permaneceu\s+iner|n[ãa]o\s+sanou|sem\s+manifesta)/i],
      ['falta de impulso',      /permaneceu\s+inerte|abandono\s+da\s+causa|aus[êe]ncia\s+de\s+provid[êe]ncia|n[ãa]o\s+promoveu\s+os\s+atos|deixando\s+transcorrer\s+o\s+prazo/i],
      ['documento não juntado', /(n[ãa]o\s+(juntou|apresentou|comprovou)|aus[êe]ncia\s+de)[^.]{0,60}(documento|comprovante|procura[çc][ãa]o|endere[çc]o)/i],
      ['custas ou preparo',     /deser[çc][ãa]o|\bdeserto\b|custas[^.]{0,50}n[ãa]o\s+(recolhid|pag)|aus[êe]ncia\s+de\s+preparo/i],
      ['ilegitimidade ou falta de interesse', /(reconhe[çc]o|declaro|julgo)[^.]{0,60}ilegitimidade|aus[êe]ncia\s+de\s+(interesse|legitimidade)/i],
      ['prescrição ou decadência', /(reconhe[çc]o|declaro|pronuncio|julgo)[^.]{0,60}(prescri[çc][ãa]o|decad[êe]ncia)|prescri[çc][ãa]o\s+(intercorrente\s+)?(reconhecid|consumad)/i],
      ['mérito',                /JULGO\s+IMPROCEDENTE|julgo\s+[^.]{0,30}improcedente|IMPROCEDENTE\s+o\s+pedido|(nego|negar)\s+provimento|desprovid|n[ãa]o\s+provid/i],
      ['inicial indeferida',    /INDEFIRO\s+A\s+PETI|indefiro\s+a\s+(inicial|peti)|indeferimento\s+da\s+(peti|inicial)/i],
      ['extinção sem mérito',   /JULGO\s+EXTINT|EXTINGO|extin[çc][ãa]o\s+do\s+(processo|feito)|sem\s+resolu[çc][ãa]o\s+(do\s+)?m[ée]rito/i]
    ];
    function causaDaDerrota(op){
      for (var i=0;i<CAUSAS.length;i++) if (CAUSAS[i][1].test(op)) return CAUSAS[i][0];
      return 'não identificada';
    }

    // Marca cada evento com tudo o que ele é — um mesmo ato pode ser sentença e conter prazo.
    function marcar(e){
      var t=e.txt, f={};
      f.segredo   = R.segredo.test(t);
      f.cego      = R.cego.test(t) || (t.length<200 && !f.segredo);
      if (f.segredo || f.cego) { e.f=f; e.rotulo = f.segredo ? 'Segredo de justiça' : 'Ilegível no diário'; return; }
      var op      = operativo(t);
      f.ganho     = R.ganho.test(t);
      f.perdido   = !f.ganho && R.opDerrota.test(op);
      f.arquivado = false;
      f.prazo     = R.ato.test(t) || R.ato2.test(t) || R.ato3.test(t);
      f.dinheiro  = R.dinheiro.test(t);
      f.audiencia = R.audiencia.test(t);
      f.pericia   = R.pericia.test(t);
      // data marcada só conta se for daqui para frente
      if (f.audiencia || f.pericia) {
        var base = dataBR(e.data) || new Date();
        (t.match(/\d{2}\/\d{2}\/\d{4}/g)||[]).forEach(function(d){
          var dt=dataBR(d);
          if (dt && dt >= base && (!f.quando || dt < dataBR(f.quando))) f.quando=d;
        });
      }
      var m=t.match(R.prazoN); if (m) f.dias=m[1];
      if (f.perdido) {
        f.causa  = causaDaDerrota(op);
        f.merito = (f.causa === 'mérito');
      }
      f.pendente = f.prazo && R.pendCliente.test(op);
      e.f=f;
      e.rotulo = f.ganho ? 'Ganho' : f.perdido ? 'Perda' : f.arquivado ? 'Arquivado'
               : f.prazo ? 'Prazo correndo' : (f.quando ? (f.pericia?'Perícia marcada':'Audiência marcada')
               : (f.dinheiro ? 'Pagamento' : 'Andamento'));
    }

    function espera(ms){ return new Promise(function(r){ setTimeout(r, ms); }); }

    /* O diário limita a 20 requisições por janela (cabeçalho X-RateLimit-Limit).
       O navegador NÃO consegue ler esse cabeçalho — a API não manda
       Access-Control-Expose-Headers —, então não dá para contar o saldo: resta ir
       devagar e recuar quando levar 429. Três páginas por vez, com pausa. */
    var LOTE = 3, PAUSA = 400, RECUO = [3000, 8000, 15000, 30000];

    async function buscar(oab, uf, dias, aviso){
      var fim=new Date(), ini=new Date(); ini.setDate(fim.getDate()-dias);
      var base=API+'?numeroOab='+encodeURIComponent(oab)+'&ufOab='+encodeURIComponent(uf)
        +'&dataDisponibilizacaoInicio='+iso(ini)+'&dataDisponibilizacaoFim='+iso(fim)
        +'&itensPorPagina=100&pagina=';

      async function pag(n, tent){
        tent = tent || 0;
        var r = await fetch(base+n, {headers:{Accept:'application/json'}});
        if (r.status === 429) {
          if (tent >= RECUO.length) {
            throw new Error('o diário está limitando as consultas. Espere um minuto e rode de novo');
          }
          if (aviso) aviso(-1, Math.round(RECUO[tent]/1000));   // -1 avisa que está esperando
          await espera(RECUO[tent]);
          return pag(n, tent+1);
        }
        if (!r.ok) throw new Error('o diário respondeu '+r.status);
        return r.json();
      }

      var p1=await pag(1), todos=((p1&&p1.items)||[]).slice();
      /* A API devolve no máximo 10.000 itens por intervalo; não adianta pedir mais. */
      var total=(p1&&p1.count)||todos.length, paginas=Math.min(Math.ceil(total/100), 100);
      for(var i=2;i<=paginas;i+=LOTE){
        var lote=[];
        for(var k=i;k<i+LOTE&&k<=paginas;k++) lote.push(pag(k));
        var rs=await Promise.all(lote);
        rs.forEach(function(j){ todos=todos.concat((j&&j.items)||[]); });
        if(aviso) aviso(todos.length, total);
        if (i+LOTE <= paginas) await espera(PAUSA);
      }
      return todos;
    }

    /* Levanta a carteira: quantos processos distintos se mexeram em 12 meses,
       quantas publicações por mês e quantos atos com prazo por mês. */
    function carteira(brutas){
      var procs={}, vistos={}, eventos=0, prazo=0, derrotas=0, evitaveis=0, ganhos=0;
      brutas.forEach(function(it){
        var txt=limpar(it.texto);
        var k=it.numero_processo+'|'+it.data_disponibilizacao+'|'+hash(txt);
        if(vistos[k]) return; vistos[k]=1; eventos++;
        procs[it.numero_processo]=1;
        if(R.ato.test(txt)||R.ato2.test(txt)||R.ato3.test(txt)) prazo++;
        /* mesma classificação do diagnóstico, agora sobre os 12 meses:
           assim a perda anual é CONTADA, não um mês multiplicado por doze */
        if (R.segredo.test(txt) || R.cego.test(txt) || txt.length<200) return;
        if (R.ganho.test(txt)) { ganhos++; return; }
        var op = operativo(txt);
        if (R.opDerrota.test(op)) {
          derrotas++;
          var c = causaDaDerrota(op);
          if (c !== 'mérito' && c !== 'não identificada') evitaveis++;
        }
      });
      return { procs:Object.keys(procs).length, eventos:eventos, prazo:prazo,
               derrotas:derrotas, evitaveis:evitaveis, ganhos:ganhos };
    }

    async function levantar(oab, uf){
      var el=document.getElementById('medido');
      el.hidden=false;
      el.innerHTML='<span class="rot">Levantando a carteira</span><p>Lendo 12 meses do diário da OAB '+oab+'/'+uf+'…</p>';
      try{
        var brutas=await buscar(oab, uf, 365, function(lidas, total){
          el.innerHTML = (lidas === -1)
            ? '<span class="rot">Levantando a carteira</span><p>O diário limita o número de consultas por minuto. '
              + 'Aguardando '+total+' segundos para continuar de onde parou…</p>'
            : '<span class="rot">Levantando a carteira</span><p>'+lidas+' de '+total+' publicações lidas…</p>';
        });
        if(!brutas.length){
          el.innerHTML='<span class="rot">Carteira não levantada</span><p>O diário não tem publicação dessa OAB nos últimos 12 meses.</p>';
          return;
        }
        var c=carteira(brutas);
        medida={ carteira:c.procs, pubMes:Math.round(c.eventos/12), protMes:Math.round(c.prazo/12),
                 derrotasAno:c.derrotas, evitaveisAno:c.evitaveis, ganhosAno:c.ganhos };
        if (ultimo) { ultimo.ano = medida; relatorio(); }
        modo='medido';
        qtd.value=c.procs; slider.value=Math.min(3000, Math.max(20, c.procs));
        el.innerHTML='<span class="rot">Medido na OAB '+oab+'/'+uf+'</span>'
          +'<p><b>'+c.procs+' processos</b> tiveram movimentação nos últimos 12 meses, com média de <b>'
          +Math.round(c.eventos/12)+' publicações por mês</b>. Os valores abaixo saem desses números — não são estimativa.</p>'
          +'<p class="aviso"><b>Esse é o piso, não a carteira inteira.</b> Processo que não publicou em 12 meses não aparece no diário: '
          +'no escritório-piloto, o diário mostrou pouco mais da metade do que o advogado tinha. '
          +'Pergunte quantos processos ele tem ao todo — <b>a diferença é a carteira parada</b>, e é exatamente o diagnóstico de R$ 30 por processo.</p>';
        calcular();
      }catch(e){
        el.innerHTML='<span class="rot">Não consegui levantar a carteira</span><p>'+e.message
          +'. O diagnóstico de 30 dias acima continua válido; a calculadora segue no modo estimado.</p>';
      }
    }

    function apurar(brutas){
      var vistos={}, ev=[];
      brutas.forEach(function(it){
        var txt=limpar(it.texto);
        var k=it.numero_processo+'|'+it.data_disponibilizacao+'|'+hash(txt);
        if(vistos[k]) return; vistos[k]=1;
        var e={ proc: it.numeroprocessocommascara||it.numero_processo, trib: it.siglaTribunal,
                orgao: it.nomeOrgao||'', data: it.datadisponibilizacao||it.data_disponibilizacao, txt: txt };
        marcar(e); ev.push(e);
      });
      function por(fn){ return ev.filter(fn); }
      function procs(lista){ var o={}; lista.forEach(function(e){o[e.proc]=1;}); return Object.keys(o).length; }
      var g = {
        ev: ev,
        nProc: procs(ev),
        ganhos:    por(function(e){return e.f.ganho;}),
        perdas:    por(function(e){return e.f.perdido;}),
        arquivados:[],
        prazos:    por(function(e){return e.f.prazo && !e.f.cego && !e.f.segredo;}),
        agenda:    por(function(e){return e.f.quando;}),
        dinheiro:  por(function(e){return e.f.dinheiro;}),
        pendencias:por(function(e){return e.f.pendente;}),
        segredo:   por(function(e){return e.f.segredo;}),
        cegos:     por(function(e){return e.f.cego;})
      };
      g.ilegiveis = procs(g.segredo.concat(g.cegos));
      g.pctIlegivel = ev.length ? Math.round((g.segredo.length+g.cegos.length)/ev.length*100) : 0;

      // derrotas agrupadas por causa, da mais frequente para a menos
      g.derrotas = g.perdas;
      g.evitaveis = g.derrotas.filter(function(e){
        return e.f.causa && e.f.causa !== 'mérito' && e.f.causa !== 'não identificada';
      });
      g.pctEvitavel = g.derrotas.length
        ? Math.round(g.evitaveis.length / g.derrotas.length * 100) : 0;
      var conta = {};
      g.derrotas.forEach(function(e){
        var c = e.f.causa || 'não identificada';
        conta[c] = (conta[c]||0) + 1;
      });
      g.causas = Object.keys(conta).map(function(c){ return { causa:c, n:conta[c] }; })
                       .sort(function(a,b){ return b.n - a.n; });
      return g;
    }

    function premissas(){
      return { hon:num('hon',5000), triar:num('tTriar',10), lancar:num('tLancar',5),
               docs:num('tDocs',20), prot:num('tProt',15), autos:num('tAutos',15) };
    }
    function contaTempo(g,p){
      var a = g.ev.length*p.triar, b = g.ev.length*p.lancar,
          c = g.prazos.length*p.docs, d = g.prazos.length*p.prot, e = g.ilegiveis*p.autos;
      return { ler:a, lancar:b, docs:c, prot:d, autos:e, total:a+b+c+d+e };
    }

    function li(lista, lim){
      return lista.slice(0,lim||6).map(function(e){
        return '<div class="lp"><span class="pr">'+e.proc+'<span class="ds">'+e.data+' · '+e.trib
          +(e.orgao?' · '+e.orgao:'')+(e.f.quando?' · <b>'+e.f.quando+'</b>':'')
          +(e.f.dias?' · prazo de '+e.f.dias+' dias':'')+'</span></span></div>';
      }).join('');
    }

    function pintar(){
      if(!ultimo) return;
      var g=ultimo.g, p=premissas(), T=contaTempo(g,p);
      ultimo.p=p; ultimo.T=T;
      ultimo.risco  = g.prazos.length*p.hon;
      ultimo.escuro = g.ilegiveis*p.hon;

      document.getElementById('dgrid').innerHTML =
          '<div class="dk"><b>'+ultimo.brutas+'</b><i>publicações no diário</i></div>'
        + '<div class="dk"><b>'+g.ev.length+'</b><i>eventos reais<br>(sem repetições)</i></div>'
        + '<div class="dk"><b>'+g.nProc+'</b><i>processos</i></div>'
        + '<div class="dk bom"><b>'+g.ganhos.length+'</b><i>ganhos</i></div>'
        + '<div class="dk mau"><b>'+(g.perdas.length+g.arquivados.length)+'</b><i>perdas e arquivamentos</i></div>'
        + '<div class="dk mau"><b>'+g.prazos.length+'</b><i>com prazo correndo</i></div>'
        + '<div class="dk av"><b>'+g.agenda.length+'</b><i>audiências e perícias</i></div>'
        + '<div class="dk av"><b>'+g.ilegiveis+'</b><i>processos ilegíveis ('+g.pctIlegivel+'%)</i></div>';

      document.getElementById('mesa').innerHTML =
          '<div class="mz"><b>'+moeda(ultimo.risco)+'</b><i>exposto agora</i><em>'
            +g.prazos.length+' processos dependem de um ato com prazo correndo</em></div>'
        + '<div class="mz"><b>'+moeda(ultimo.escuro)+'</b><i>fora do seu radar</i><em>'
            +g.ilegiveis+' processos que ninguém consegue ler sem entrar no sistema com certificado</em></div>'
        + '<div class="mz neutro"><b>'+tempo(T.total)+'</b><i>de trabalho no mês</i><em>'
            +(T.total/480).toFixed(1).replace('.',',')+' dias úteis só para manter a carteira andando</em></div>'
        + '<div class="mz"><b>'+moeda(g.evitaveis.length*p.hon)+'</b><i>perdido por acompanhamento</i><em>'
            +g.evitaveis.length+' das '+g.derrotas.length+' perdas do mês não foram de mérito</em></div>'
        + '<div class="mz ok"><b>'+g.dinheiro.length+'</b><i>com pagamento mencionado</i><em>'
            +'RPV, precatório, alvará ou depósito a conferir</em></div>';

      var frases=[];
      frases.push('<p>Em 30 dias saíram <b>'+ultimo.brutas+' publicações</b> nessa OAB. Sem as repetições do diário, são <b>'
        +g.ev.length+' eventos</b> em <b>'+g.nProc+' processos</b>.</p>');
      if(g.ganhos.length)  frases.push('<p><b>'+g.ganhos.length+' decisões favoráveis</b> — procedência, benefício concedido, tutela deferida ou acordo homologado.</p>');
      if(g.perdas.length||g.arquivados.length) frases.push('<p><b>'+(g.perdas.length+g.arquivados.length)+' desfechos negativos</b>: '
        +g.perdas.length+' perdas e '+g.arquivados.length+' arquivamentos.</p>');
      if(g.prazos.length)  frases.push('<p><b>'+g.prazos.length+' com prazo correndo</b> agora.</p>');
      if(g.agenda.length)  frases.push('<p><b>'+g.agenda.length+' audiências ou perícias com data</b> — a mais próxima em '+g.agenda[0].f.quando+'.</p>');
      if(g.ilegiveis)      frases.push('<p><b>'+g.ilegiveis+' processos ilegíveis no diário</b> ('+g.segredo.length
        +' em segredo de justiça). O tribunal publica o aviso e guarda o documento dentro do sistema: <b>só se lê entrando com certificado digital</b>.</p>');
      document.getElementById('leitura').innerHTML = frases.join('');

      document.getElementById('listaProc').innerHTML = li(g.prazos.concat(g.agenda), 10);
      document.getElementById('diagRodape').innerHTML =
        'Classificação automática pelo texto da publicação — serve para dimensionar, não para fixar prazo. '
        +'A triagem de verdade abre os autos e lê a data final que o tribunal gravou.';
      res.style.display='block';
      relatorio();
    }

    /* O que ainda cabe em cada motivo de perda. É o que transforma a classificação
       em providência — sem isso a tabela só informa, e informação sem saída não vende. */
    var SAIDA = {
      'emenda não cumprida'  : 'Emenda ainda cabe enquanto não houver trânsito; depois, ação nova.',
      'falta de impulso'     : 'Desarquivamento por simples petição, com o ato que faltava.',
      'documento não juntado': 'Juntada do documento e pedido de reconsideração ou desarquivamento.',
      'custas ou preparo'    : 'Recolhimento com justificativa, ou gratuidade se couber.',
      'inicial indeferida'   : 'Apelação no prazo, ou nova inicial corrigida.',
      'extinção sem mérito'  : 'Nova ação: extinção sem mérito não faz coisa julgada material.',
      'ilegitimidade ou falta de interesse': 'Nova ação contra a parte certa ou com o pedido corrigido.',
      'prescrição ou decadência': 'Verificar marco interruptivo e causa de suspensão antes de desistir.',
      'mérito'               : 'Recurso no prazo — é a única perda que se discute no mérito.',
      'não identificada'     : 'Abrir os autos e ler a decisão inteira.'
    };

    function juntar(a){
      if (a.length <= 1) return a[0] || '';
      return a.slice(0,-1).join(', ') + ' e ' + a[a.length-1];
    }

    /* Até três processos nomeados, em prosa. Âncora concreta para o relatório não
       soar genérico — e só isso: inventário de processos ele já tem no diário. */
    function exemplos(lista, n, preferirData){
      return juntar(lista.slice(0, n||3).map(function(e){
        if (preferirData && e.f.quando) return e.proc + ' (em '+e.f.quando+')';
        if (e.f.dias)   return e.proc + ' (prazo de '+e.f.dias+' dias)';
        if (e.f.quando) return e.proc + ' (em '+e.f.quando+')';
        return e.proc;
      }));
    }

    /* O relatório tem duas fases, e a ordem muda com ela.
       VENDA: ganhou, perdeu, em andamento, o que pode ser feito.
       ACOMPANHAMENTO: o mais urgente primeiro — o que precisa ser feito agora. */
    var faseRel = 'venda';

    function relatorio(){
      if (faseRel === 'acompanhamento') return relatorioAcomp();
      return relatorioVenda();
    }

    function relatorioAcomp(){
      if(!ultimo) return;
      var g=ultimo.g, p=ultimo.p, hoje=new Date().toLocaleDateString('pt-BR');
      var h=[];
      h.push('<div class="cabeca">' + document.getElementById('logoFJ').innerHTML
        + '<span class="produto">Pulso &middot; relatório do dia</span></div>');
      h.push('<h1>Relatório de acompanhamento</h1>');
      h.push('<p class="sub">OAB '+ultimo.oab+'/'+ultimo.uf+' &middot; '+hoje
        +' &middot; '+ultimo.brutas+' publicações lidas, '+g.ev.length+' eventos em '+g.nProc+' processos</p>');

      /* 1. o que trava, primeiro */
      h.push('<h2>Precisa da sua decisão</h2>');
      if (g.prazos.length) {
        h.push('<div class="destaque"><p><b>'+g.prazos.length+(g.prazos.length===1?' processo está':' processos estão')
          +' com prazo correndo.</b> As peças estão sendo produzidas e entram para sua revisão na plataforma. '
          +'O protocolo só sai depois da sua autorização.</p></div>');
        h.push('<p>Mais próximos: '+exemplos(g.prazos,3)+'.</p>');
        h.push('<p class="nota">O prazo de cada um é a data final gravada pelo tribunal no processo, lida dentro dos '
          +'autos — nunca calculada a partir da publicação.</p>');
      } else {
        h.push('<p>Nenhum ato novo exige decisão sua hoje.</p>');
      }

      /* 2. o que depende do cliente */
      h.push('<h2>Depende de documento seu</h2>');
      if (g.pendencias.length) {
        h.push('<p><b>'+g.pendencias.length+(g.pendencias.length===1?' processo depende':' processos dependem')
          +' de documento que só você tem.</b> O pedido de cada um foi enviado no WhatsApp do escritório, '
          +'com o nome das partes, o número do processo, a publicação, a pendência e como resolver.</p>');
        h.push('<p>'+exemplos(g.pendencias,3)+'.</p>');
        h.push('<p class="nota">Enquanto o documento não chega, a peça fica parada — e o prazo continua correndo.</p>');
      } else {
        h.push('<p>Nada pendente do seu lado.</p>');
      }

      /* 3. agenda */
      h.push('<h2>Na sua agenda</h2>');
      if (g.agenda.length) {
        h.push('<p><b>'+g.agenda.length+(g.agenda.length===1?' data marcada':' datas marcadas')
          +'</b>, a mais próxima em <b>'+g.agenda[0].f.quando+'</b>: '+exemplos(g.agenda,3,true)+'.</p>');
      } else {
        h.push('<p>Nenhuma audiência ou perícia com data nova.</p>');
      }

      /* 4. dinheiro a levantar */
      if (g.dinheiro.length) {
        h.push('<h2>Dinheiro a conferir</h2>');
        h.push('<p><b>'+g.dinheiro.length+' processos mencionam pagamento</b> — RPV, precatório, alvará ou depósito. '
          +'Vamos conferir um a um se há valor disponível e avisamos o que puder ser levantado.</p>');
      }

      /* 5. o que mudou */
      h.push('<h2>O que mudou nos seus processos</h2>');
      var mud=[];
      if (g.ganhos.length)   mud.push('<b>'+g.ganhos.length+'</b> com decisão favorável');
      if (g.derrotas.length) mud.push('<b>'+g.derrotas.length+'</b> com desfecho negativo');
      if (mud.length) {
        h.push('<p>'+juntar(mud)+'. ');
        if (g.evitaveis.length) h.push(g.evitaveis.length+' das perdas não foram de mérito — vamos analisar '
          +'uma a uma o que ainda cabe e trazer a proposta no relatório de amanhã.</p>');
        else h.push('</p>');
      } else {
        h.push('<p>Nenhum desfecho novo no período.</p>');
      }

      /* 6. o que foi lido e não exige nada */
      var semAcao = g.ev.length - g.prazos.length - g.agenda.length - g.derrotas.length - g.ganhos.length;
      if (semAcao > 0) {
        h.push('<p class="nota">Outras <b>'+semAcao+' publicações</b> foram lidas e não exigem ação — '
          +'andamento de rotina, intimação da parte contrária, despacho de mero expediente. '
          +'Ficam registradas no seu histórico.</p>');
      }

      /* 7. o que exigiu entrar nos autos */
      if (g.ilegiveis) {
        h.push('<h2>O que o diário não mostrou</h2>');
        h.push('<p><b>'+g.ilegiveis+' processos</b> publicaram apenas o aviso, sem o conteúdo — '
          +g.segredo.length+' deles em segredo de justiça. <b>Entramos no sistema do tribunal com o certificado '
          +'e lemos cada um</b>; o que foi determinado já está refletido nas seções acima.</p>');
      }

      h.push('<div class="rodape">Facilita Jurídico &middot; Pulso — acompanhamento processual &middot; '+hoje+'. '
        +'Dúvida sobre qualquer item, responda no grupo do WhatsApp.</div>');
      document.getElementById('relatorio').innerHTML = h.join('');
    }

    function relatorioVenda(){
      if(!ultimo) return;
      var g=ultimo.g, p=ultimo.p, T=ultimo.T, hoje=new Date().toLocaleDateString('pt-BR');
      var nG=g.ganhos.length, nD=g.derrotas.length, nE=g.evitaveis.length;
      var nM=g.derrotas.filter(function(e){ return e.f.causa==='mérito'; }).length;
      var vGanho=nG*p.hon, vPerda=nD*p.hon, vDeixou=nE*p.hon, vExposto=g.prazos.length*p.hon;
      var h=[];

      h.push('<div class="cabeca">' + document.getElementById('logoFJ').innerHTML
        + '<span class="produto">Pulso · acompanhamento processual</span></div>');
      h.push('<h1>Diagnóstico do escritório</h1>');
      h.push('<p class="sub">OAB '+ultimo.oab+'/'+ultimo.uf+' · últimos 30 dias · emitido em '+hoje+'</p>');

      /* ---- o retrato, em números, antes de qualquer texto ---- */
      h.push('<h2>O retrato do mês</h2>');
      h.push('<div class="kpis">'
        + '<div><b>'+g.nProc+'</b><span>processos se mexeram</span></div>'
        + '<div><b>'+nG+'</b><span>ganhos</span></div>'
        + '<div><b>'+nD+'</b><span>perdas e arquivamentos</span></div>'
        + '<div><b>'+g.prazos.length+'</b><span>com prazo correndo</span></div>'
        + '<div><b>'+g.agenda.length+'</b><span>audiências e perícias</span></div>'
        + '<div><b>'+g.ilegiveis+'</b><span>que você não consegue ler</span></div>'
        + '</div>');
      h.push('<p class="nota">Base: '+ultimo.brutas+' publicações no diário, que viram '+g.ev.length
        +' eventos reais depois de removidas as repetições. Os valores usam a premissa de <b>'+moeda(p.hon)
        +' de honorário médio por processo</b> — troque pela sua média e tudo recalcula.</p>');

      /* ---- 1. o que ganhou ---- */
      h.push('<h2>O que você ganhou</h2>');
      if (nG) {
        h.push('<p>No período, <b>'+nG+(nG===1?' decisão foi favorável':' decisões foram favoráveis')
          +'</b> — procedência, benefício concedido, tutela deferida ou acordo homologado. '
          +'Pela premissa acima, <b>'+moeda(vGanho)+'</b> em causas que chegaram a resultado.</p>');
        h.push('<p>Decisão favorável publicada não é o fim da história: é o começo de um prazo. '
          +'Benefício a implantar, honorário a executar, valor a levantar. '
          +'<b>Cada uma dessas '+nG+' depende de um ato seu para virar dinheiro</b> — e esse ato só acontece '
          +'se alguém tiver lido a publicação no dia em que ela saiu.</p>');
      } else {
        h.push('<p>Nenhuma decisão favorável saiu nos últimos 30 dias. Em uma janela de um mês isso é comum e '
          +'não diz nada sobre a carteira. O que importa é que, no dia em que sair, ela seja lida — porque é '
          +'dela que nasce o prazo para executar o que você ganhou.</p>');
      }

      /* ---- 2. o que perdeu, e sobretudo POR QUE ---- */
      h.push('<h2>O que você perdeu — e por quê</h2>');
      if (nD) {
        h.push('<p><b>'+nD+(nD===1?' processo terminou':' processos terminaram')
          +' em perda ou arquivamento</b>, o equivalente a <b>'+moeda(vPerda)+'</b>.</p>');
        h.push('<p>O número importa menos que a causa. Lendo o que o tribunal escreveu em cada um: '
          + juntar(g.causas.map(function(c){ return '<b>'+c.n+'</b> por '+c.causa; })) + '.</p>');
        if (nE) {
          h.push('<div class="destaque"><p><b>'+nE+' das '+nD+' perdas — '+g.pctEvitavel
            +'% — não foram de mérito.</b> '
            + (nM ? 'Apenas '+nM+(nM===1?' caiu':' caíram')+' por tese; o resto caiu por prazo, documento, emenda ou impulso. '
                  : 'Nenhuma tese sua caiu: foi prazo, documento, emenda e impulso. ')
            +'São <b>'+moeda(vDeixou)+'</b> que deixaram de entrar por motivo que não tem relação '
            +'com a qualidade do seu trabalho jurídico.</p></div>');
          h.push('<p>Essa é a parte recuperável, e é a razão de este relatório existir. Perda de mérito se '
            +'discute no recurso. Perda por acompanhamento se evita antes — e, em boa parte dos casos, se '
            +'desfaz depois: arquivamento por inércia volta com simples petição, inicial indeferida se refaz, '
            +'emenda não cumprida ainda cabe enquanto não houver trânsito.</p>');
        } else {
          h.push('<p>Todas as perdas do período foram de mérito ou não puderam ser classificadas pelo texto '
            +'da publicação. Perda de mérito é a única que o acompanhamento não evita — ela se discute no '
            +'recurso, e o prazo para recorrer é justamente o que não pode passar em branco.</p>');
        }
        if (ultimo.ano && ultimo.ano.derrotasAno) {
          var A=ultimo.ano;
          h.push('<p><b>E o mês não é exceção.</b> Lendo <b>os doze meses</b> do diário dessa OAB: '
            +'<b>'+A.derrotasAno+' perdas</b> no ano, das quais <b>'+A.evitaveisAno+' não foram de mérito</b>. '
            +'Pela mesma premissa, <b>'+moeda(A.derrotasAno*p.hon)+'</b> em valor de causa perdido no ano, '
            +'sendo <b>'+moeda(A.evitaveisAno*p.hon)+'</b> por motivo que o acompanhamento evita.</p>');
          h.push('<div class="destaque"><p>Na média, <b>'+moeda(Math.round(A.evitaveisAno*p.hon/12))
            +' por mês</b> deixam de entrar por falha de acompanhamento — '
            +(A.evitaveisAno/12).toFixed(1).replace('.',',')+' processos por mês, todo mês. '
            +'<b>Isso não é projeção de um mês multiplicado por doze: é a contagem dos doze meses.</b></p></div>');
        }
        /* classificação das perdas: o que foi, quanto custou e o que ainda cabe */
        h.push('<table><tr><th>Motivo da perda</th><th>Quantos</th><th>Valor</th><th>O que ainda cabe</th></tr>'
          + g.causas.map(function(c){
              return '<tr><td>'+c.causa+'</td><td>'+c.n+'</td><td>'+moeda(c.n*p.hon)+'</td><td>'
                   + (SAIDA[c.causa] || 'Depende da leitura dos autos.') +'</td></tr>';
            }).join('')
          + '</table>');
        h.push('<p class="nota">A classificação sai do texto da própria decisão. '
          + 'Cada linha precisa ser conferida nos autos antes de virar providência — aqui ela serve para '
          + 'mostrar onde está a perda, não para decidir o recurso.</p>');
      } else {
        h.push('<p>Nenhum processo foi perdido ou arquivado nos últimos 30 dias. É um bom mês — e vale dizer '
          +'o que isso não significa: arquivamento costuma vir depois de uma intimação não cumprida, '
          +'semanas antes. O que protege o mês que vem é o que se lê hoje.</p>');
      }

      /* ---- 3. o que está em andamento ---- */
      h.push('<h2>O que está em andamento</h2>');
      if (g.prazos.length) {
        h.push('<p><b>'+g.prazos.length+(g.prazos.length===1?' processo está':' processos estão')
          +' com prazo correndo neste momento</b>, com <b>'+moeda(vExposto)
          +'</b> dependendo de um ato que ainda não foi praticado. Cada um deles é, hoje, uma das perdas '
          +'administrativas do mês que vem.</p>');
        h.push('<p class="nota">Exemplos: '+exemplos(g.prazos,3)+'. A lista completa fica no relatório diário — '
          +'aqui interessa a ordem de grandeza.</p>');
      } else {
        h.push('<p>Nenhuma intimação do período pede um ato seu com prazo em aberto.</p>');
      }
      if (g.agenda.length) {
        h.push('<p><b>'+g.agenda.length+(g.agenda.length===1?' audiência ou perícia marcada':' audiências ou perícias marcadas')
          +'</b>, a mais próxima em <b>'+g.agenda[0].f.quando+'</b>. Data de perícia perdida não se remarca sem custo: '
          +'o processo volta para a fila.</p>');
      }
      if (g.dinheiro.length) {
        h.push('<p><b>'+g.dinheiro.length+' processos mencionam pagamento</b> — RPV, precatório, alvará ou depósito judicial. '
          +'Vale conferir um a um se há valor disponível para levantamento: é dinheiro que já é seu e está parado no tribunal.</p>');
      }

      /* ---- 4. o que você não consegue ler ---- */
      if (g.ilegiveis) {
        h.push('<h2>O que você não consegue ler</h2>');
        h.push('<p>São <b>'+g.ilegiveis+' processos</b>, '+g.pctIlegivel+'% dos eventos do mês. Em <b>'+g.segredo.length
          +'</b> deles o processo corre em <b>segredo de justiça</b>; nos demais, o tribunal publicou apenas o aviso '
          +'e manteve o documento dentro do sistema.</p>');
        h.push('<p>O conteúdo existe e está disponível — <b>mas só para quem entra no sistema do tribunal com '
          +'certificado digital</b>, abre o processo e lê o que foi determinado. '
          +'Nenhum serviço de monitoramento de publicações faz isso, porque o diário não traz o texto. '
          +'Na prática, <b>'+moeda(g.ilegiveis*p.hon)+' da sua carteira estão fora do seu campo de visão</b> — '
          +'não por falta de ferramenta, mas porque a ferramenta certa é entrar nos autos.</p>');
      }

      /* ---- 5. o que pode ser feito ---- */
      h.push('<h2>O que pode ser feito</h2>');
      var acoes=[];
      if (nE) acoes.push('<li><b>Reabrir o que caiu por acompanhamento.</b> '+nE+' processos caíram por causa '
        +'administrativa. Cada um precisa ser lido para dizer se ainda cabe desarquivamento, emenda ou ação nova.</li>');
      if (g.prazos.length) acoes.push('<li><b>Cumprir o que está correndo.</b> '+g.prazos.length+' atos com prazo aberto, '
        +'com a data final lida de dentro do processo — nunca calculada a partir da publicação.</li>');
      if (g.ilegiveis) acoes.push('<li><b>Abrir os '+g.ilegiveis+' processos ilegíveis</b> com certificado digital e '
        +'descobrir o que foi determinado em cada um.</li>');
      if (g.dinheiro.length) acoes.push('<li><b>Conferir os '+g.dinheiro.length+' processos com pagamento mencionado</b> '
        +'e levantar o que estiver disponível.</li>');
      if (nG) acoes.push('<li><b>Executar o que você ganhou.</b> '+nG+' decisões favoráveis esperando o ato seguinte.</li>');
      acoes.push('<li><b>Fazer isso todos os dias</b>, para que o mês que vem não repita este.</li>');
      h.push('<ul>'+acoes.join('')+'</ul>');

      /* ---- 6. quanto custa manter isso em dia ---- */
      h.push('<h2>Quanto tempo isso consome</h2>');
      h.push('<table><tr><th>Atividade</th><th>Volume</th><th>Minutos cada</th><th>Total</th></tr>'
        + '<tr><td>Ler e triar as publicações</td><td>'+g.ev.length+'</td><td>'+p.triar+'</td><td>'+tempo(T.ler)+'</td></tr>'
        + '<tr><td>Lançar o andamento nos sistemas</td><td>'+g.ev.length+'</td><td>'+p.lancar+'</td><td>'+tempo(T.lancar)+'</td></tr>'
        + '<tr><td>Organizar os documentos do ato</td><td>'+g.prazos.length+'</td><td>'+p.docs+'</td><td>'+tempo(T.docs)+'</td></tr>'
        + '<tr><td>Protocolar ou distribuir</td><td>'+g.prazos.length+'</td><td>'+p.prot+'</td><td>'+tempo(T.prot)+'</td></tr>'
        + '<tr><td>Abrir os autos dos processos ilegíveis</td><td>'+g.ilegiveis+'</td><td>'+p.autos+'</td><td>'+tempo(T.autos)+'</td></tr>'
        + '<tr><td><b>Total no mês</b></td><td></td><td></td><td><b>'+tempo(T.total)+'</b></td></tr></table>');
      h.push('<p class="nota">São <b>'+(T.total/480).toFixed(1).replace('.',',')+' dias úteis</b> de alguém dedicado só a isso. '
        +'Não entra aqui escrever a peça, falar com o cliente nem ir à audiência — é apenas o trabalho de manter a '
        +'carteira organizada e em dia.</p>');

      /* ---- 7. conclusão ---- */
      h.push('<h2>Conclusão</h2>');
      h.push('<div class="conclusao">'
        + '<p>Em trinta dias, '+g.nProc+' dos seus processos se mexeram. '
        + (nG ? nG+' trouxeram decisão favorável. ' : '')
        + (nD ? nD+' terminaram em perda ou arquivamento'
              + (nE ? ', e '+g.pctEvitavel+'% dessas perdas não foram de mérito. ' : '. ') : '')
        + (g.prazos.length ? g.prazos.length+' seguem com prazo correndo agora. ' : '')
        + (g.ilegiveis ? 'E '+g.ilegiveis+' continuam fora do seu alcance, porque o diário não publica o conteúdo.' : '')
        + '</p>'
        + '<p>O que esses números descrevem <b>não é um problema de competência jurídica</b>. '
        + 'Nada aqui se perde por tese fraca. Perde-se porque a publicação não foi lida a tempo, porque o documento '
        + 'não foi juntado, porque o prazo correu enquanto o dia era ocupado por outra coisa, ou porque ninguém abriu '
        + 'o processo que o diário não deixa ler. <b>É um problema de visibilidade e de organização</b> — e esse tem solução.</p>'
        + '<p>Manter essa carteira em dia custa <b>'+tempo(T.total)+' por mês</b>, todo mês, sem falhar uma semana. '
        + 'É um trabalho que não aparece, não gera honorário e não pode parar — e é o primeiro a ficar para trás '
        + 'quando o escritório tem um mês cheio.</p>'
        + '<p><b>É exatamente esse trabalho que o Pulso assume.</b> Lemos as publicações todos os dias, abrimos os autos '
        + 'que o diário não mostra e dizemos o que cada processo exige e até quando. <b>Todos os dias você recebe um '
        + 'relatório com tudo o que foi triado e feito</b>, e entra no sistema da Facilita apenas para <b>revisar as '
        + 'petições e confirmar o protocolo</b>. O resto do seu dia volta a ser seu.</p>'
        + '</div>');

      /* ---- 8. o investimento ---- */
      h.push('<h2>O investimento</h2>');
      h.push('<p>Pelo volume deste diagnóstico, o acompanhamento ficaria em torno de <b>'
        + moeda(g.ev.length*20 + g.prazos.length*5)+' no mês</b>, debitado do pacote contratado. '
        + 'Para que não haja dúvida sobre o que esse valor cobre:</p>');
      h.push('<div class="inclui">'
        + '<div class="sim"><span>Está incluso nessa estimativa</span><ul>'
          + '<li>Captura e triagem de todas as publicações, todos os dias</li>'
          + '<li>Leitura dos autos quando o diário não traz o conteúdo</li>'
          + '<li>Decisão do que precisa ser feito, com o prazo lido do processo</li>'
          + '<li>Cadastro do caso na plataforma e no seu sistema de gestão</li>'
          + '<li>Aviso de pendência e relatório diário</li>'
          + '<li>Protocolo e distribuição</li>'
        + '</ul></div>'
        + '<div class="nao"><span>Não está incluso</span><ul>'
          + '<li><b>Petições, guias e cálculos</b></li>'
          + '<li>Pareceres e demais peças</li>'
        + '</ul>'
        + '<p>A Facilita produz tudo isso para você — e os valores <b>seguem a tabela do pacote contratado</b>, '
        + 'variando conforme o serviço. Não são cobrados à parte: saem do mesmo pacote.</p></div>'
        + '</div>');

      /* ---- 9. fontes e limites ---- */
      h.push('<h2>Como lemos isso</h2>');
      h.push('<p class="nota">Fonte: <b>Diário de Justiça Eletrônico Nacional do CNJ</b>, público, consultado pelo número '
        + 'da OAB nos últimos 30 dias. O diário repete a mesma decisão uma vez por destinatário — por isso '
        + ultimo.brutas+' publicações correspondem a '+g.ev.length+' eventos reais.</p>');
      h.push('<p class="nota">A classificação do desfecho e da causa é automática, pela leitura do texto da publicação, '
        + 'e pode errar em redação incomum. <b>Serve para dimensionar, não para fixar prazo.</b> '
        + 'O prazo que vale é a data final que o próprio tribunal grava no processo, e ela só se lê abrindo os autos.</p>');
      h.push('<p class="nota">Os valores em dinheiro multiplicam a quantidade de processos pela premissa de '
        + moeda(p.hon)+' de honorário médio; os de tempo usam '+p.triar+', '+p.lancar+', '+p.docs+', '+p.prot
        + ' e '+p.autos+' minutos por atividade. São premissas editáveis, não medições do seu escritório.</p>');

      h.push('<div class="rodape">Facilita Jurídico · Pulso — acompanhamento processual. '
        + 'Gerado a partir de dados públicos do DJEN/CNJ em '+hoje+'.</div>');

      document.getElementById('relatorio').innerHTML = h.join('');
    }

    async function rodar(){
      var oab=(campoOab.value||'').replace(/\D/g,''), uf=document.getElementById('uf').value;
      if(!oab){ msg.className='diag-msg erro'; msg.textContent='Digite o número da OAB.'; return; }
      btn.disabled=true; msg.className='diag-msg'; msg.textContent='Consultando o diário…'; res.style.display='none';
      try{
        var brutas=await buscar(oab,uf,30);
        if(!brutas.length){
          msg.textContent='Nenhuma publicação para a OAB '+oab+'/'+uf+' nos últimos 30 dias. Confira o número e a UF.';
        } else {
          ultimo={ brutas:brutas.length, g:apurar(brutas), oab:oab, uf:uf };
          msg.textContent='Diagnóstico da OAB '+oab+'/'+uf+', últimos 30 dias.';
          pintar();
          levantar(oab, uf);
        }
      }catch(e){
        msg.className='diag-msg erro';
        msg.textContent='Não consegui consultar agora: '+e.message+'.';
      }
      btn.disabled=false;
    }

    btn.addEventListener('click', rodar);
    campoOab.addEventListener('keydown', function(ev){ if(ev.key==='Enter') rodar(); });
    ['hon','tTriar','tLancar','tDocs','tProt','tAutos'].forEach(function(id){
      document.getElementById(id).addEventListener('input', pintar);
    });
    document.getElementById('btnPdf').addEventListener('click', function(){ window.print(); });
    document.getElementById('btnFase').addEventListener('click', function(){
      faseRel = (faseRel === 'venda') ? 'acompanhamento' : 'venda';
      this.textContent = (faseRel === 'venda') ? 'Ver relatório de acompanhamento' : 'Ver relatório de venda';
      relatorio();
      window.print();
    });
    document.getElementById('irDiag').addEventListener('click', function(){
      campoOab.scrollIntoView({behavior:'smooth', block:'center'});
      campoOab.focus();
    });
  })();
}
