import { formatearTiempo } from "./timer.js";

// Función para renderizar el tablero
export const renderTablero = (tablero, cambios) => {
    const tabla = document.getElementById("tablero-sudoku");
    tabla.innerHTML = "";

    for (let i = 0; i < 9; i++) {
        const fila = document.createElement("tr");

        for (let j = 0; j < 9; j++) {
            const celda = document.createElement("td");
            const input = document.createElement("input");

            // Configuración para números
            input.type = "text";
            input.inputMode = "numeric";
            input.pattern = "[1-9]";
            input.maxLength = 1;
            input.value = tablero[i][j] === 0 ? "" : tablero[i][j];
            input.dataset.fila = i;
            input.dataset.col = j;

            // Evento de input: actualiza tablero y guarda cambios
            input.addEventListener("input", () => {
                tablero[i][j] = parseInt(input.value) || 0;
                if (cambios) cambios(tablero);
            });

            // Determinar si la celda es editable
            if (tablero[i][j] !== 0 && input.value !== "") {
                input.disabled = true;          // celdas originales no editables
                input.style.backgroundColor = "#ddd";
            } else {
                input.disabled = false;
                input.style.backgroundColor = "#fff";
            }

            celda.appendChild(input);
            fila.appendChild(celda);
        }

        tabla.appendChild(fila);
    }
};

// Función para renderizar tiempo
export const renderTiempo = (segundos) => {
    document.getElementById("timer").textContent = `Tiempo: ${formatearTiempo(segundos)}`;
};
