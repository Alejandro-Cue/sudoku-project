import { tableros, crearTableroVacio } from "../core/tablero.js";
import { renderTablero, renderTiempo } from "./render.js";
import { solveSudoku } from "../core/solver.js";
import { iniciarTimer, detenerTimer } from "./timer.js";

// Clave para guardar en localStorage
const STORAGE_KEY = "sudoku-estado";

// Función para guardar estado en localStorage
export const guardarEstado = (estado) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
};

// Función para recuperar tablero guardado
export const recuperarEstado = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

export function limpiarEstado() {
    localStorage.removeItem(STORAGE_KEY);
}

export const iniciarEventos = (estado, cambios) => {

    const reiniciarTiempo = () => {
      detenerTimer();
      estado.tiempo = 0;
      renderTiempo(estado.tiempo);
      iniciarTimer(estado, renderTiempo);
    };


    const cargarTablero = (nuevoTablero) => {
        estado.tablero = nuevoTablero.map(row => [...row]);
        renderTablero(estado.tablero, cambios);
        reiniciarTiempo();
        guardarEstado(estado);
    };



  // Botones de dificultad
  document.getElementById("facil-btn").addEventListener("click", () => {
    cargarTablero(tableros.facil);
  });

  document.getElementById("moderado-btn").addEventListener("click", () => {
    cargarTablero(tableros.moderado);
  });

  document.getElementById("dificil-btn").addEventListener("click", () => {
    cargarTablero(tableros.dificil);
  });

  // Botón resolver
  document.getElementById("resolver-btn").addEventListener("click", () => {
    const inputs = document.querySelectorAll("#tablero-sudoku input");
    inputs.forEach(input => {
      const fila = input.dataset.fila;
      const col = input.dataset.col;
      estado.tablero[fila][col] = input.value ? parseInt(input.value) : 0;
    });

    const copia = estado.tablero.map(row => [...row]);

    if (solveSudoku(copia)) {
      estado.tablero = copia;
      renderTablero(estado.tablero, cambios);
      guardarEstado(estado);
      detenerTimer();
    } else {
      alert("Este contiene errores.");
    }
  });

  // Guardar automáticamente al modificar un input
  document.getElementById("tablero-sudoku").addEventListener("input", (e) => {
    if (e.target.tagName === "INPUT") {
      const fila = e.target.dataset.fila;
      const col = e.target.dataset.col;
      estado.tablero[fila][col] = e.target.value ? parseInt(e.target.value) : 0;
      cambios(estado.tablero);
    }
  });
};
