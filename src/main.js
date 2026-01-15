// src/main.js
import { crearTableroVacio } from "./core/tablero.js";
import { renderTablero, renderTiempo } from "./ui/render.js";
import { guardarEstado, iniciarEventos, recuperarEstado } from "./ui/eventos.js";
import { iniciarTimer } from "./ui/timer.js";

// Recuperar estado guardado
const estadoGuardado = recuperarEstado();

const estado = {
  tablero: estadoGuardado?.tablero || crearTableroVacio(),
  tiempo: estadoGuardado?.tiempo || 0,
};

// Callback de cambios: solo actualiza estado y guarda
const cambios = (tablero) => {
  estado.tablero = tablero.map(row => [...row]); // crear copia profunda
  guardarEstado(estado);
};

// Render inicial del tablero
renderTablero(estado.tablero, cambios);

// Render inicial del timer
renderTiempo(estado.tiempo);

// Inicializar eventos (botones, resolver, dificultad)
iniciarEventos(estado, cambios);

// Iniciar timer
iniciarTimer(estado, renderTiempo);
