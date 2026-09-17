/* ============================================
   Bingo del Sagrado — lógica de la app
   ============================================ */

(function () {
  'use strict';

  // --- Configuración ---
  var TOTAL_NUMEROS = 90;
  var CLAVE_GUARDADO = 'bingoSagradoMarked';

  // --- Elementos del DOM ---
  var grid = document.getElementById('grid');
  var calledList = document.getElementById('calledList');
  var countEl = document.getElementById('count');
  var resetBtn = document.getElementById('resetBtn');

  // --- Estado: números marcados, en el orden en que salieron ---
  var marcados = [];

  /* --- Guardado en el navegador --- */

  function cargarEstado() {
    try {
      var guardado = localStorage.getItem(CLAVE_GUARDADO);
      marcados = guardado ? JSON.parse(guardado) : [];
    } catch (e) {
      marcados = [];
    }
    if (!Array.isArray(marcados)) marcados = [];
  }

  function guardarEstado() {
    try {
      localStorage.setItem(CLAVE_GUARDADO, JSON.stringify(marcados));
    } catch (e) {
      // Si el navegador bloquea el almacenamiento, la partida sigue
      // funcionando igual, solo que no se recupera al recargar.
    }
  }

  /* --- Construcción de la grilla --- */

  function construirGrilla() {
    for (var n = 1; n <= TOTAL_NUMEROS; n++) {
      var boton = document.createElement('button');
      boton.className = 'num';
      boton.type = 'button';
      boton.textContent = n;
      boton.dataset.num = n;
      boton.setAttribute('aria-pressed', 'false');
      boton.addEventListener('click', alTocarNumero);
      grid.appendChild(boton);
    }
  }

  function alTocarNumero(evento) {
    alternarNumero(Number(evento.currentTarget.dataset.num));
  }

  /* --- Marcar y desmarcar --- */
  function alternarNumero(n) {
    var posicion = marcados.indexOf(n);
    if (posicion === -1) {
      marcados.push(n);
      mostrarSpotlight(n);
    } else {
      marcados.splice(posicion, 1);
    }
    guardarEstado();
    dibujar();
  }


  function reiniciar() {
    marcados = [];
    guardarEstado();
    dibujar();
  }

  /* --- Número grande al marcar (dura 4 segundos) --- */

  function mostrarSpotlight(n) {
    // Si había uno en curso, lo cortamos para arrancar de cero.
    if (temporizadorSpotlight) {
      clearTimeout(temporizadorSpotlight);
    }
    spotlight.innerHTML = '';

    var numGrande = document.createElement('div');
    numGrande.className = 'num-grande';
    numGrande.textContent = n;
    spotlight.appendChild(numGrande);

    temporizadorSpotlight = setTimeout(function () {
      spotlight.innerHTML = '';
      temporizadorSpotlight = null;
    }, 4000);
  }

  function reiniciar() {
    marcados = [];
    guardarEstado();
    dibujar();
  }
  /* --- Dibujado --- */

  function dibujar() {
    dibujarGrilla();
    countEl.textContent = marcados.length;
    dibujarLista();
  }

  function dibujarGrilla() {
    var botones = grid.querySelectorAll('.num');
    for (var i = 0; i < botones.length; i++) {
      var boton = botones[i];
      var estaMarcado = marcados.indexOf(Number(boton.dataset.num)) !== -1;
      boton.classList.toggle('marked', estaMarcado);
      boton.setAttribute('aria-pressed', estaMarcado ? 'true' : 'false');
    }
  }

  function dibujarLista() {
    calledList.innerHTML = '';

    if (marcados.length === 0) {
      var vacio = document.createElement('span');
      vacio.className = 'empty';
      vacio.textContent = 'Todavía no marcaste ningún número';
      calledList.appendChild(vacio);
      return;
    }

    marcados.forEach(function (n) {
      calledList.appendChild(crearChip(n));
    });
  }

  function crearChip(n) {
    var chip = document.createElement('div');
    chip.className = 'chip';
    chip.textContent = n;

    var quitar = document.createElement('button');
    quitar.type = 'button';
    quitar.textContent = '\u00D7';
    quitar.setAttribute('aria-label', 'Quitar número ' + n);
    quitar.addEventListener('click', function (evento) {
      evento.stopPropagation();
      alternarNumero(n);
    });

    chip.appendChild(quitar);
    return chip;
  }

  /* --- Arranque --- */

  resetBtn.addEventListener('click', reiniciar);
  cargarEstado();
  construirGrilla();
  dibujar();
})();
