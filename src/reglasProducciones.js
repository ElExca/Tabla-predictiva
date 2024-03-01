function obtenerProduccion(noTerminal, next) {
    switch (noTerminal) {
      case 'A':
        return ['T', 'L', 'M', ';'];
      case 'N':
        return ['L', 'R'];
      case 'R':
        return /[a-z]/.test(next) ? ['L', 'R'] : ['ε'];
      case 'M':
        return ['[', 'E', ']'];
      case 'E':
        return ['D', 'X'];
      case 'D':
        return /\d+(\s+\d+)*/.test(next) ? [next] : null;
      case 'C':
        return /\s+/.test(next) || /,/.test(next) ? ['X', 'D', 'C'] : ['ε'];
      case 'T':
        return ['let'];
      case 'L':
        return /[a-z]/.test(next) ? [next] : null;
      case 'X':
        return /,/.test(next) ? [',', 'D', 'X'] : ['ε'];
      default:
        return null;
    }
  }
  
  export { obtenerProduccion };
  