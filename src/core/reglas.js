export const esValido = (tablero, fila, col, num) => {
  // Verificar fila
  for (let x = 0; x < 9; x++) {
    if (tablero[fila][x] === num) 
        return false;
  }

  // Verificar columna
  for (let y = 0; y < 9; y++) {
    if (tablero[y][col] === num) 
        return false;
  }

  // Verificar sub-cuadrante 3x3
  const inicioFila = Math.floor(fila / 3) * 3;
  const inicioColumna = Math.floor(col / 3) * 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (tablero[inicioFila + i][inicioColumna + j] === num) 
        return false;
    }
  }

  return true;
};
