(function () {
  'use strict';
 
  /* ============================================================
     1. Dados — categorias e eventos
     ============================================================ */
 
  var CATEGORIAS = {
    resultados:   { rotulo: 'Divulgação de Resultados', cor: '#22a05b' },
    conferencias: { rotulo: 'Conferências',             cor: '#1d4ed8' },
    assembleia:   { rotulo: 'Assembléia Geral',         cor: '#ea580c' },
    outros:       { rotulo: 'Outros',                   cor: '#6b7280' }
  };
 
  // duracao em minutos. inicio no horário de Brasília.
  var EVENTOS = [
    { titulo: 'Divulgação de Resultados 3T25', categoria: 'resultados',   inicio: '2025-11-11T22:00', duracao: 60 },
    { titulo: 'Conference Call do 3T25',       categoria: 'conferencias', inicio: '2025-11-12T10:00', duracao: 60 },
 
    { titulo: 'Divulgação de Resultados 4T25', categoria: 'resultados',   inicio: '2026-02-25T22:00', duracao: 60 },
    { titulo: 'Conference Call do 4T25',       categoria: 'conferencias', inicio: '2026-02-26T10:00', duracao: 60 },
    { titulo: 'Assembleia Geral Ordinária',    categoria: 'assembleia',   inicio: '2026-04-28T11:00', duracao: 120 },
    { titulo: 'Divulgação de Resultados 1T26', categoria: 'resultados',   inicio: '2026-05-12T22:00', duracao: 60 },
    { titulo: 'Conference Call do 1T26',       categoria: 'conferencias', inicio: '2026-05-13T10:00', duracao: 60 },
    { titulo: 'Formulário de Referência 2026',   categoria: 'outros',       inicio: '2026-05-29T18:00', duracao: 60 },
    { titulo: 'Divulgação de Resultados 2T26', categoria: 'resultados',   inicio: '2026-08-11T22:00', duracao: 60 },
    { titulo: 'Conference Call do 2T26',       categoria: 'conferencias', inicio: '2026-08-12T10:00', duracao: 60 },
    { titulo: 'Reunião Pública Anual',         categoria: 'outros',       inicio: '2026-09-16T14:00', duracao: 90 },
    { titulo: 'Divulgação de Resultados 3T26', categoria: 'resultados',   inicio: '2026-11-10T22:00', duracao: 60 },
    { titulo: 'Conference Call do 3T26',       categoria: 'conferencias', inicio: '2026-11-11T10:00', duracao: 60 },
 
    { titulo: 'Divulgação de Resultados 4T26', categoria: 'resultados',   inicio: '2027-02-24T22:00', duracao: 60 },
    { titulo: 'Conference Call do 4T26',       categoria: 'conferencias', inicio: '2027-02-25T10:00', duracao: 60 }
  ];
 
  var MESES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho',
               'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  var MESES_CURTOS = ['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'];
  var DIAS_SEMANA = ['DOM','SEG','TER','QUA','QUI','SEX','SÁB'];
 
  /* ============================================================
     2. Utilitários
     ============================================================ */
 
  function paraData(iso) {
    var p = iso.split(/[-T:]/);
    return new Date(+p[0], +p[1] - 1, +p[2], +p[3], +p[4]);
  }
 
  function somaMinutos(data, minutos) {
    return new Date(data.getTime() + minutos * 60000);
  }
 
  function dois(n) { return n < 10 ? '0' + n : '' + n; }
 
  function horaLocal(data) {
    return dois(data.getHours()) + ':' + dois(data.getMinutes());
  }
 
  // 20261110T220000 (usado com ctz na URL do Google)
  function carimboGoogle(data) {
    return data.getFullYear() + dois(data.getMonth() + 1) + dois(data.getDate()) +
           'T' + dois(data.getHours()) + dois(data.getMinutes()) + '00';
  }
 
  // 2026-11-10T22:00:00-03:00
  function carimboOutlook(data) {
    return data.getFullYear() + '-' + dois(data.getMonth() + 1) + '-' + dois(data.getDate()) +
           'T' + dois(data.getHours()) + ':' + dois(data.getMinutes()) + ':00-03:00';
  }
 
  function linkGoogle(evento) {
    var inicio = paraData(evento.inicio);
    var fim = somaMinutos(inicio, evento.duracao);
    return 'https://calendar.google.com/calendar/render?action=TEMPLATE' +
           '&text=' + encodeURIComponent(evento.titulo) +
           '&dates=' + carimboGoogle(inicio) + '/' + carimboGoogle(fim) +
           '&ctz=America/Sao_Paulo' +
           '&details=' + encodeURIComponent(CATEGORIAS[evento.categoria].rotulo);
  }
 
  function linkOutlook(evento) {
    var inicio = paraData(evento.inicio);
    var fim = somaMinutos(inicio, evento.duracao);
    return 'https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent' +
           '&subject=' + encodeURIComponent(evento.titulo) +
           '&startdt=' + encodeURIComponent(carimboOutlook(inicio)) +
           '&enddt=' + encodeURIComponent(carimboOutlook(fim)) +
           '&body=' + encodeURIComponent(CATEGORIAS[evento.categoria].rotulo);
    }
 
  /* ============================================================
     3. Legenda
     ============================================================ */
 
  var legenda = document.getElementById('legenda');
  Object.keys(CATEGORIAS).forEach(function (chave) {
    var li = document.createElement('li');
    var ponto = document.createElement('span');
    ponto.className = 'ponto';
    ponto.style.setProperty('--cor', CATEGORIAS[chave].cor);
    li.appendChild(ponto);
    li.appendChild(document.createTextNode(CATEGORIAS[chave].rotulo));
    legenda.appendChild(li);
  });
 
  /* ============================================================
     4. Calendário (FullCalendar)
     ============================================================ */
 
  var eventosFC = EVENTOS.map(function (evento, indice) {
    var inicio = paraData(evento.inicio);
    return {
      id: String(indice),
      title: evento.titulo,
      start: inicio,
      end: somaMinutos(inicio, evento.duracao),
      extendedProps: { categoria: evento.categoria, indice: indice }
    };
  });
 
  var elCalendario = document.getElementById('calendario');
  var titulo = document.getElementById('tituloCalendario');
  var selectAno = document.getElementById('selectAno');
 
  var calendario = new FullCalendar.Calendar(elCalendario, {
    initialView: 'dayGridMonth',
    headerToolbar: false,
    firstDay: 0,
    fixedWeekCount: true,
    showNonCurrentDates: true,
    height: 'auto',
    dayMaxEvents: false,
    events: eventosFC,
 
    dayHeaderContent: function (info) {
      return DIAS_SEMANA[info.date.getDay()];
    },
 
    dayCellContent: function (info) {
      return String(info.date.getDate());
    },
 
    eventContent: function (info) {
      var categoria = CATEGORIAS[info.event.extendedProps.categoria] || CATEGORIAS.outros;
 
      var ponto = document.createElement('span');
      ponto.className = 'ponto ponto--evento';
      ponto.style.setProperty('--cor', categoria.cor);
      ponto.tabIndex = 0;
      ponto.dataset.titulo = info.event.title;
      ponto.dataset.hora = horaLocal(info.event.start) + ' \u2022 Hor\u00e1rio de Bras\u00edlia';
      ponto.setAttribute('aria-label', info.event.title + ', ' + ponto.dataset.hora);
 
      return { domNodes: [ponto] };
    },
 
    datesSet: function () { atualizarTopo(); }
  });
 
  function atualizarTopo() {
    var data = calendario.getDate();
    titulo.textContent = MESES[data.getMonth()] + ' ' + data.getFullYear();
    if (selectAno.value !== String(data.getFullYear())) {
      selectAno.value = String(data.getFullYear());
    }
  }
 
  /* ============================================================
     5. Seletor de ano
     ============================================================ */
 
  var anos = EVENTOS.map(function (e) { return +e.inicio.slice(0, 4); });
  var anoAtual = new Date().getFullYear();
  anos.push(anoAtual);
  anos = anos.filter(function (ano, i, lista) { return lista.indexOf(ano) === i; })
             .sort(function (a, b) { return b - a; });
 
  anos.forEach(function (ano) {
    var opcao = document.createElement('option');
    opcao.value = String(ano);
    opcao.textContent = String(ano);
    selectAno.appendChild(opcao);
  });
 
  selectAno.addEventListener('change', function () {
    var data = calendario.getDate();
    calendario.gotoDate(new Date(+selectAno.value, data.getMonth(), 1));
  });
 
  document.getElementById('btnAnterior').addEventListener('click', function () { calendario.prev(); });
  document.getElementById('btnProximo').addEventListener('click', function () { calendario.next(); });
 
  /* ============================================================
     6. Próximos eventos
     ============================================================ */
 
  var ICONE_GOOGLE =
    '<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">' +
    '<rect x="2.5" y="5" width="19" height="14" rx="2" fill="#fff" stroke="#ea4335" stroke-width="2"/>' +
    '<path d="M3.5 6.5 12 13l8.5-6.5" fill="none" stroke="#ea4335" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';
 
  var ICONE_OUTLOOK =
    '<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">' +
    '<rect x="3" y="4.5" width="18" height="15" rx="2" fill="#fff" stroke="#0f6cbd" stroke-width="2"/>' +
    '<path d="M3 9h18" stroke="#0f6cbd" stroke-width="2"/>' +
    '<rect x="6" y="11.5" width="5" height="5" rx="1" fill="#0f6cbd"/>' +
    '</svg>';
 
  function criarBotao(href, rotulo, icone) {
    var a = document.createElement('a');
    a.className = 'botao-agenda';
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.setAttribute('aria-label', rotulo);
    a.title = rotulo;
    a.innerHTML = icone;
    return a;
  }
 
  function renderizarProximos() {
    var lista = document.getElementById('listaProximos');
    var agora = new Date();
 
    var proximos = EVENTOS
      .map(function (evento) { return { dados: evento, data: paraData(evento.inicio) }; })
      .filter(function (item) { return item.data >= agora; })
      .sort(function (a, b) { return a.data - b.data; })
      .slice(0, 4);
 
    lista.innerHTML = '';
 
    if (!proximos.length) {
      var vazio = document.createElement('li');
      vazio.className = 'proximos__vazio';
      vazio.textContent = 'Nenhum evento agendado no momento. Consulte o calendário para as datas já divulgadas.';
      lista.appendChild(vazio);
      return;
    }
 
    proximos.forEach(function (item) {
      var li = document.createElement('li');
 
      var caixa = document.createElement('div');
      caixa.className = 'item';
 
      var data = document.createElement('div');
      data.className = 'item__data';
      data.innerHTML =
        '<span class="item__dia">' + dois(item.data.getDate()) + '</span>' +
        '<span class="item__mes">' + MESES_CURTOS[item.data.getMonth()] + '</span>';
 
      var conteudo = document.createElement('div');
      conteudo.className = 'item__conteudo';
 
      var tituloEvento = document.createElement('p');
      tituloEvento.className = 'item__titulo';
      tituloEvento.textContent = item.dados.titulo;
 
      var hora = document.createElement('p');
      hora.className = 'item__hora';
      hora.innerHTML =
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
        '<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>' +
        '<span>' + horaLocal(item.data) + ' • Horário de Brasília</span>';
 
      conteudo.appendChild(tituloEvento);
      conteudo.appendChild(hora);
 
      var acoes = document.createElement('div');
      acoes.className = 'item__acoes';
      acoes.appendChild(criarBotao(linkGoogle(item.dados), 'Adicionar ao Google Agenda', ICONE_GOOGLE));
      acoes.appendChild(criarBotao(linkOutlook(item.dados), 'Adicionar ao Outlook', ICONE_OUTLOOK));
 
      caixa.appendChild(data);
      caixa.appendChild(conteudo);
      caixa.appendChild(acoes);
      li.appendChild(caixa);
      lista.appendChild(li);
    });
  }
 
  /* ============================================================
     7. Tooltip dos eventos no calendário
     ============================================================ */
 
  var dica = document.createElement('div');
  dica.className = 'dica';
  dica.setAttribute('role', 'tooltip');
  dica.innerHTML = '<span class="dica__titulo"></span><span class="dica__hora"></span>';
  document.body.appendChild(dica);
 
  var dicaTitulo = dica.querySelector('.dica__titulo');
  var dicaHora = dica.querySelector('.dica__hora');
 
  function mostrarDica(alvo) {
    dicaTitulo.textContent = alvo.dataset.titulo || '';
    dicaHora.textContent = alvo.dataset.hora || '';
    dica.setAttribute('data-visivel', 'true');
 
    var caixa = alvo.getBoundingClientRect();
    var medida = dica.getBoundingClientRect();
    var margem = 8;
 
    var esquerda = caixa.left + caixa.width / 2 - medida.width / 2;
    esquerda = Math.max(margem, Math.min(esquerda, window.innerWidth - medida.width - margem));
 
    var topo = caixa.top - medida.height - margem;
    if (topo < margem) { topo = caixa.bottom + margem; }
 
    dica.style.left = esquerda + 'px';
    dica.style.top = topo + 'px';
  }
 
  function esconderDica() {
    dica.removeAttribute('data-visivel');
  }
 
  function alvoEvento(elemento) {
    return elemento && elemento.closest ? elemento.closest('.ponto--evento') : null;
  }
 
  elCalendario.addEventListener('mouseover', function (e) {
    var alvo = alvoEvento(e.target);
    if (alvo) { mostrarDica(alvo); }
  });
 
  elCalendario.addEventListener('mouseout', function (e) {
    if (alvoEvento(e.target)) { esconderDica(); }
  });
 
  elCalendario.addEventListener('focusin', function (e) {
    var alvo = alvoEvento(e.target);
    if (alvo) { mostrarDica(alvo); }
  });
 
  elCalendario.addEventListener('focusout', esconderDica);
 
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { esconderDica(); }
  });
 
  window.addEventListener('scroll', esconderDica, true);
  window.addEventListener('resize', esconderDica);
 
 
  /* ============================================================
     8. Eventos realizados
     ============================================================ */
 
  var selectAnoRealizados = document.getElementById('selectAnoRealizados');
  var listaRealizados = document.getElementById('listaRealizados');
 
  function dataCurta(data) {
    return dois(data.getDate()) + '/' + dois(data.getMonth() + 1) + '/' + data.getFullYear();
  }
 
  anos.forEach(function (ano) {
    var opcao = document.createElement('option');
    opcao.value = String(ano);
    opcao.textContent = String(ano);
    selectAnoRealizados.appendChild(opcao);
  });
  selectAnoRealizados.value = String(anoAtual);
 
  function renderizarRealizados() {
    var agora = new Date();
    var ano = +selectAnoRealizados.value;
 
    var realizados = EVENTOS
      .map(function (evento) { return { dados: evento, data: paraData(evento.inicio) }; })
      .filter(function (item) { return item.data < agora && item.data.getFullYear() === ano; })
      .sort(function (a, b) { return b.data - a.data; });
 
    listaRealizados.innerHTML = '';
 
    if (!realizados.length) {
      var vazio = document.createElement('li');
      vazio.className = 'realizados__vazio';
      vazio.textContent = 'Nenhum evento realizado em ' + ano + '.';
      listaRealizados.appendChild(vazio);
      return;
    }
 
    realizados.forEach(function (item) {
      var li = document.createElement('li');
      li.className = 'realizado';
 
      var data = document.createElement('time');
      data.className = 'realizado__data';
      data.dateTime = item.dados.inicio;
      data.textContent = dataCurta(item.data);
 
      var titulo = document.createElement('p');
      titulo.className = 'realizado__titulo';
      titulo.textContent = item.dados.titulo;
 
      li.appendChild(data);
      li.appendChild(titulo);
      listaRealizados.appendChild(li);
    });
  }
 
  selectAnoRealizados.addEventListener('change', renderizarRealizados);
 
  /* ============================================================
     9. Inicialização
     ============================================================ */
 
  calendario.render();
  atualizarTopo();
  renderizarProximos();
  renderizarRealizados();
})();