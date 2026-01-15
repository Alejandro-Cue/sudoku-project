import { guardarEstado } from "./eventos.js";

let interval = null;

export const iniciarTimer = (estado, renderTiempo) => {
    detenerTimer();
    // Inicializar tiempo si no existe
    if (typeof estado.tiempo !== "number") {
        estado.tiempo = 0;
    }

    let contadorGuardado = 0;

    interval = setInterval(() => {
        estado.tiempo++;
        renderTiempo(estado.tiempo);
        contadorGuardado++;

        // Guardar cada 5 segundos
        if (contadorGuardado >= 5) {
            guardarEstado(estado);
            contadorGuardado = 0;
        }

    }, 1000);
};

export const detenerTimer = () => {
    if (interval) clearInterval(interval);
};

export const formatearTiempo = (segundos) => {
    const min = Math.floor(segundos / 60);
    const sec = segundos % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
};
