     /* =====================================================================
         CALENDÁRIO DE EVENTOS — implementação manual (sem biblioteca)
 
         Fonte única de dados: array EVENTOS.
         Alimenta, ao mesmo tempo:
           1. a grade do calendário (pontos coloridos + tooltip);
           2. os cards de "Próximos eventos" (com links de agenda);
           3. a lista de "Eventos realizados" (filtrada pelo select de ano).
 
         Para integrar ao CMS, basta trocar o array EVENTOS por um JSON
         vindo do backend e chamar iniciar() depois de carregá-lo.
         ===================================================================== */
      (function () {
        'use strict';
 
        /* ---------- 1. Dados ------------------------------------------- */
 
        // As chaves devem bater com os modificadores .cal-dot--* da legenda.
        var CATEGORIAS = {
          conferencias: 'Conferências',
          divulgacao:   'Divulgação',
          assembleias:  'Assembléias',
          investorday:  'Investor Day',
          outros:       'Outros'
        };
 
        // data: 'AAAA-MM-DD' | hora: 'HH:MM' | duracao: minutos
        var EVENTOS = [
          { titulo: 'Investor Day 2026',                    categoria: 'investorday',  data: '2026-01-15', hora: '09:00', duracao: 480 },
          { titulo: 'Divulgação de resultados do 4T25',     categoria: 'divulgacao',   data: '2026-02-24', hora: '18:00', duracao: 60 },
          { titulo: 'Conference Call do 4T25',              categoria: 'conferencias', data: '2026-02-25', hora: '10:00', duracao: 60 },
          { titulo: 'Divulgação de resultados do 1T26',     categoria: 'divulgacao',   data: '2026-04-05', hora: '18:00', duracao: 60 },
          { titulo: 'Conference Call do 1T26',              categoria: 'conferencias', data: '2026-04-06', hora: '10:00', duracao: 60 },
          { titulo: 'Assembleia Geral Ordinária (AGO)',     categoria: 'assembleias',  data: '2026-04-16', hora: '11:00', duracao: 120 },
          { titulo: 'Formulário de Referência 2026',        categoria: 'outros',       data: '2026-05-29', hora: '18:00', duracao: 60 },
          { titulo: 'Divulgação de resultados do 2T26',     categoria: 'divulgacao',   data: '2026-08-11', hora: '18:00', duracao: 60 },
          { titulo: 'Conference Call do 2T26',              categoria: 'conferencias', data: '2026-08-12', hora: '10:00', duracao: 60 },
          { titulo: 'Reunião Pública Anual',                categoria: 'outros',       data: '2026-09-16', hora: '14:00', duracao: 90 },
          { titulo: 'Divulgação de resultados do 3T26',     categoria: 'divulgacao',   data: '2026-11-10', hora: '18:00', duracao: 60 },
          { titulo: 'Conference Call do 3T26',              categoria: 'conferencias', data: '2026-11-11', hora: '10:00', duracao: 60 },
 
          { titulo: 'Divulgação de resultados do 3T25',     categoria: 'divulgacao',   data: '2025-11-11', hora: '18:00', duracao: 60 },
          { titulo: 'Conference Call do 3T25',              categoria: 'conferencias', data: '2025-11-12', hora: '10:00', duracao: 60 },
          { titulo: 'Assembleia Geral Extraordinária (AGE)',categoria: 'assembleias',  data: '2025-09-30', hora: '11:00', duracao: 90 }
        ];
 
        var MESES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho',
                     'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
        var MESES_CURTOS = ['Jan','Fev','Mar','Abr','Mai','Jun',
                            'Jul','Ago','Set','Out','Nov','Dez'];
 
        var QTD_PROXIMOS = 3; // quantos cards mostrar ao lado do calendário
 
        /* ---------- 2. Utilitários -------------------------------------- */
 
        function pad(n) { return n < 10 ? '0' + n : '' + n; }
 
        function escapar(texto) {
          return String(texto)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;')
            .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        }
 
        // 'AAAA-MM-DD' + 'HH:MM' -> Date no fuso do navegador
        function paraData(evento) {
          var d = evento.data.split('-');
          var h = (evento.hora || '00:00').split(':');
          return new Date(+d[0], +d[1] - 1, +d[2], +h[0], +h[1]);
        }
 
        function somaMinutos(data, minutos) {
          return new Date(data.getTime() + minutos * 60000);
        }
 
        function horaFormatada(evento) {
          return evento.hora || '00:00';
        }
 
        // 20260416T110000 (usado junto de ctz=America/Sao_Paulo)
        function carimboGoogle(d) {
          return d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) +
                 'T' + pad(d.getHours()) + pad(d.getMinutes()) + '00';
        }
 
        // 2026-04-16T11:00:00-03:00
        function carimboOutlook(d) {
          return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) +
                 'T' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':00-03:00';
        }
 
        function linkGoogle(evento) {
          var inicio = paraData(evento);
          var fim = somaMinutos(inicio, evento.duracao || 60);
          return 'https://calendar.google.com/calendar/render?action=TEMPLATE' +
                 '&text=' + encodeURIComponent(evento.titulo) +
                 '&dates=' + carimboGoogle(inicio) + '/' + carimboGoogle(fim) +
                 '&ctz=America/Sao_Paulo' +
                 '&details=' + encodeURIComponent(CATEGORIAS[evento.categoria] || '');
        }
 
        function linkOutlook(evento) {
          var inicio = paraData(evento);
          var fim = somaMinutos(inicio, evento.duracao || 60);
          return 'https://outlook.live.com/calendar/0/deeplink/compose' +
                 '?path=/calendar/action/compose&rru=addevent' +
                 '&subject=' + encodeURIComponent(evento.titulo) +
                 '&startdt=' + encodeURIComponent(carimboOutlook(inicio)) +
                 '&enddt=' + encodeURIComponent(carimboOutlook(fim)) +
                 '&body=' + encodeURIComponent(CATEGORIAS[evento.categoria] || '');
        }
 
        // { '2026-04-16': [evento, ...] }
        var PORDATA = (function () {
          var mapa = {};
          EVENTOS.forEach(function (evento) {
            (mapa[evento.data] = mapa[evento.data] || []).push(evento);
          });
          Object.keys(mapa).forEach(function (chave) {
            mapa[chave].sort(function (a, b) { return paraData(a) - paraData(b); });
          });
          return mapa;
        })();
 
        var hoje = new Date();
        var atual = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
 
        /* ---------- 3. Grade do calendário ------------------------------ */
 
        var elTitulo = document.getElementById('cal-title');
        var elCorpo  = document.getElementById('cal-tbody');
        var elGrade  = elCorpo ? elCorpo.closest('.cal-grid') : null;
 
        function montarCelula(num, fora, chave) {
          var eventos = (!fora && chave && PORDATA[chave]) ? PORDATA[chave] : [];
 
          var ehHoje = !fora
            && atual.getFullYear() === hoje.getFullYear()
            && atual.getMonth() === hoje.getMonth()
            && num === hoje.getDate();
 
          var classes = fora ? 'cal-outside' : (ehHoje ? 'cal-today' : '');
 
          var pontos = eventos.map(function (evento) {
            var rotulo = evento.titulo + ' — ' + horaFormatada(evento) + ' (Horário de Brasília)';
            return '<span class="cal-dot cal-dot--' + evento.categoria + ' cal-dot--tip"'
                 + ' tabindex="0" role="img"'
                 + ' data-titulo="' + escapar(evento.titulo) + '"'
                 + ' data-hora="' + escapar(horaFormatada(evento)) + ' - Horário de Brasília"'
                 + ' aria-label="' + escapar(rotulo) + '"></span>';
          }).join('');
 
          return '<td' + (classes ? ' class="' + classes + '"' : '') + '>'
               + '<div class="cal-cell-inner">'
               + '<span class="cal-day-num">' + num + '</span>'
               + (pontos ? '<div class="cal-day-dots">' + pontos + '</div>' : '')
               + '</div></td>';
        }
 
        function renderizarCalendario() {
          var ano = atual.getFullYear(), mes = atual.getMonth();
          var primeiroDiaSemana = new Date(ano, mes, 1).getDay();      // 0 = domingo
          var diasNoMes         = new Date(ano, mes + 1, 0).getDate();
          var diasNoMesAnterior = new Date(ano, mes, 0).getDate();
 
          elTitulo.textContent = MESES[mes] + ' / ' + ano;
 
          var html = '', dia = 1, diaSeguinte = 1;
 
          for (var linha = 0; linha < 6; linha++) {
            var temDiaDoMes = false, tr = '';
 
            for (var coluna = 0; coluna < 7; coluna++) {
              var indice = linha * 7 + coluna, num, fora = false, chave = '';
 
              if (indice < primeiroDiaSemana) {          // sobra do mês anterior
                num = diasNoMesAnterior - primeiroDiaSemana + indice + 1;
                fora = true;
              } else if (dia > diasNoMes) {              // sobra do mês seguinte
                num = diaSeguinte++;
                fora = true;
              } else {                                   // dia do mês corrente
                num = dia++;
                temDiaDoMes = true;
                chave = ano + '-' + pad(mes + 1) + '-' + pad(num);
              }
 
              tr += montarCelula(num, fora, chave);
            }
 
            // interrompe antes de desenhar uma semana só com dias do mês seguinte
            if (linha > 0 && !temDiaDoMes) { break; }
            html += '<tr>' + tr + '</tr>';
          }
 
          elCorpo.innerHTML = html;
        }
 
        /* ---------- 4. Tooltip dos pontos ------------------------------- */
 
        var dica = document.createElement('div');
        dica.className = 'cal-tip';
        dica.setAttribute('role', 'tooltip');
        dica.innerHTML = '<span class="cal-tip-title"></span><span class="cal-tip-time"></span>';
        document.body.appendChild(dica);
 
        var dicaTitulo = dica.querySelector('.cal-tip-title');
        var dicaHora   = dica.querySelector('.cal-tip-time');
 
        function mostrarDica(alvo) {
          dicaTitulo.textContent = alvo.getAttribute('data-titulo') || '';
          dicaHora.textContent = alvo.getAttribute('data-hora') || '';
          dica.setAttribute('data-visivel', 'true');
 
          var caixa = alvo.getBoundingClientRect();
          var medida = dica.getBoundingClientRect();
          var margem = 8;
 
          var esquerda = caixa.left + caixa.width / 2 - medida.width / 2;
          esquerda = Math.max(margem, Math.min(esquerda, window.innerWidth - medida.width - margem));
 
          var topo = caixa.top - medida.height - margem;
          if (topo < margem) { topo = caixa.bottom + margem; }
 
          dica.style.left = esquerda + 'px';
          dica.style.top  = topo + 'px';
        }
 
        function esconderDica() { dica.removeAttribute('data-visivel'); }
 
        function alvoPonto(elemento) {
          return elemento && elemento.closest ? elemento.closest('.cal-dot--tip') : null;
        }
 
        if (elGrade) {
          elGrade.addEventListener('mouseover', function (e) {
            var alvo = alvoPonto(e.target); if (alvo) { mostrarDica(alvo); }
          });
          elGrade.addEventListener('mouseout', function (e) {
            if (alvoPonto(e.target)) { esconderDica(); }
          });
          elGrade.addEventListener('focusin', function (e) {
            var alvo = alvoPonto(e.target); if (alvo) { mostrarDica(alvo); }
          });
          elGrade.addEventListener('focusout', esconderDica);
        }
 
        document.addEventListener('keydown', function (e) {
          if (e.key === 'Escape' || e.key === 'Esc') { esconderDica(); }
        });
        window.addEventListener('scroll', esconderDica, true);
        window.addEventListener('resize', esconderDica);
 
        /* ---------- 5. Próximos eventos --------------------------------- */
 
        var elProximos = document.getElementById('cal-events');
 
        function cardEvento(evento, data) {
          return ''
            + '<div class="cal-event-card">'
            +   '<div>'
            +     '<span class="cal-event-date">' + pad(data.getDate()) + ' / ' + MESES_CURTOS[data.getMonth()] + '</span>'
            +     '<h5 class="cal-event-title">' + escapar(evento.titulo) + '</h5>'
            +     '<span class="cal-event-time">' + horaFormatada(evento) + ' - Horário de Brasília</span>'
            +   '</div>'
            +   '<div class="cal-event-actions">'
            +     '<a href="' + escapar(linkGoogle(evento)) + '" class="cal-event-icon" target="_blank" rel="noopener noreferrer"'
            +       ' title="Adicionar ao Google Agenda" aria-label="Adicionar ' + escapar(evento.titulo) + ' ao Google Agenda">'
            +       '<img src="images/icon-gmail.png" alt="Google Agenda" width="16" height="16" />'
            +     '</a>'
            +     '<a href="' + escapar(linkOutlook(evento)) + '" class="cal-event-icon" target="_blank" rel="noopener noreferrer"'
            +       ' title="Adicionar ao Outlook" aria-label="Adicionar ' + escapar(evento.titulo) + ' ao Outlook">'
            +       '<img src="images/icon-outlook.png" alt="Outlook" width="16" height="16" />'
            +     '</a>'
            +   '</div>'
            + '</div>';
        }
 
        function renderizarProximos() {
          if (!elProximos) { return; }
 
          var proximos = EVENTOS
            .map(function (evento) { return { dados: evento, data: paraData(evento) }; })
            .filter(function (item) { return item.data >= hoje; })
            .sort(function (a, b) { return a.data - b.data; })
            .slice(0, QTD_PROXIMOS);
 
          if (!proximos.length) {
            elProximos.innerHTML = '<p class="cal-events-empty">Nenhum evento agendado no momento.</p>';
            return;
          }
 
          elProximos.innerHTML = proximos.map(function (item) {
            return cardEvento(item.dados, item.data);
          }).join('');
        }
 
        /* ---------- 6. Eventos realizados ------------------------------- */
 
        var elFiltroAno = document.getElementById('filterYear');
        var elRealizados = document.getElementById('realizados-list');
 
        function anosComHistorico() {
          var anos = EVENTOS
            .filter(function (evento) { return paraData(evento) < hoje; })
            .map(function (evento) { return +evento.data.slice(0, 4); });
 
          anos = anos.filter(function (ano, i, lista) { return lista.indexOf(ano) === i; });
          return anos.sort(function (a, b) { return b - a; });
        }
 
        function preencherFiltroAno() {
          if (!elFiltroAno) { return; }
 
          var anos = anosComHistorico();
          if (!anos.length) { anos = [hoje.getFullYear()]; }
 
          elFiltroAno.innerHTML = anos.map(function (ano) {
            return '<option value="' + ano + '">' + ano + '</option>';
          }).join('');
 
          elFiltroAno.value = String(
            anos.indexOf(hoje.getFullYear()) > -1 ? hoje.getFullYear() : anos[0]
          );
        }
 
        function renderizarRealizados() {
          if (!elRealizados) { return; }
 
          var ano = elFiltroAno ? +elFiltroAno.value : hoje.getFullYear();
 
          var realizados = EVENTOS
            .map(function (evento) { return { dados: evento, data: paraData(evento) }; })
            .filter(function (item) {
              return item.data < hoje && item.data.getFullYear() === ano;
            })
            .sort(function (a, b) { return b.data - a.data; });
 
          if (!realizados.length) {
            elRealizados.innerHTML =
              '<li class="doc-list-item"><div class="d-flex align-items-center">'
              + '<span>Nenhum evento realizado em ' + ano + '.</span></div></li>';
            return;
          }
 
          elRealizados.innerHTML = realizados.map(function (item) {
            var d = item.data;
            return ''
              + '<li class="doc-list-item js-animate-up">'
              +   '<div class="d-flex align-items-center">'
              +     '<span class="doc-list-date">' + pad(d.getDate()) + ' / ' + pad(d.getMonth() + 1) + ' / ' + d.getFullYear() + '</span>'
              +     '<span class="doc-list-sep">&ndash;</span>'
              +     '<span>' + escapar(item.dados.titulo) + '</span>'
              +   '</div>'
              + '</li>';
          }).join('');
        }
 
        /* ---------- 7. Navegação e inicialização ------------------------ */
 
        document.getElementById('cal-prev').addEventListener('click', function () {
          atual = new Date(atual.getFullYear(), atual.getMonth() - 1, 1);
          esconderDica();
          renderizarCalendario();
        });
 
        document.getElementById('cal-next').addEventListener('click', function () {
          atual = new Date(atual.getFullYear(), atual.getMonth() + 1, 1);
          esconderDica();
          renderizarCalendario();
        });
 
        if (elFiltroAno) {
          elFiltroAno.addEventListener('change', renderizarRealizados);
        }
 
        renderizarCalendario();
        renderizarProximos();
        preencherFiltroAno();
        renderizarRealizados();
      })();