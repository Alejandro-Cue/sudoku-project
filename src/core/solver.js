import { esValido } from "./reglas.js";
// Función para resolver el Sudoku usando backtracking
export const solveSudoku = (tablero) => {
  for (let fila = 0; fila < 9; fila++) {
    // Buscar una celda vacía
    for (let col = 0; col < 9; col++) {
        // Si la celda está vacía
      if (tablero[fila][col] === 0) {
        // Probar números del 1 al 9
        for (let num = 1; num <= 9; num++) {
            // Verificar si el número es válido
          if (esValido(tablero, fila, col, num)) {
            // Colocar el número y continuar resolviendo
            tablero[fila][col] = num;
            if (solveSudoku(tablero)) return true;
            // Si no funciona, resetear la celda
            tablero[fila][col] = 0; // backtrack
          }
        }
        return false; // no hay número válido
      }
    }
  }
  return true; // tablero completado
};
