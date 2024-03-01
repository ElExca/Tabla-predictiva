import { obtenerProduccion } from './reglasProducciones';

function analizadorSintactico(cadena) {
  const tokens = cadena.match(/\b\w+\b|\S/g);

  let pila = ['$', 'A'];
  let apuntador = 0;
  let infoPila = [];

  const pushInfo = (X, esProduccion = false) => {
    const accion = esProduccion ? 'Producción' : 'Push';
    infoPila.push(`${accion}: ${X}, Cadena: ${tokens.slice(apuntador).join(' ')}`);
  };

  const popInfo = (X, isError = false) => {
    const accion = isError ? 'Error' : 'Pop';
    infoPila.push(`${accion}: ${X}, Cadena: ${tokens.slice(apuntador).join(' ')}`);
  };

  const getNextToken = () => tokens[apuntador];

  while (pila.length > 0) {
    const X = pila[pila.length - 1];
    if (!X) {
      break;
    }

    const a = getNextToken();

    if (X === '$') {
      popInfo(X);
      pila.pop();
      infoPila.push('Análisis completado.');
      break;
    }

    if (X === a) {
      popInfo(X);
      pila.pop();
      apuntador++;
    } else if (esNoTerminal(X)) {
      const produccion = obtenerProduccion(X, a);

      if (produccion) {
        pila.pop();
        popInfo(X);
        pushInfo(produccion.join(' '), true);
        if (produccion[0] !== 'ε') {
          for (let i = produccion.length - 1; i >= 0; i--) {
            pila.push(produccion[i]);
          }
        }
      } else {
        const errorMensaje = `No hay producción válida para el no terminal '${X}' con el símbolo de entrada '${a}'.`;
        popInfo(X, true);
        infoPila.push(errorMensaje);
        return { esValida: false, infoPila, error: errorMensaje };
      }
    } else {
      const errorMensaje = `Token inesperado '${a}' no coincide con el esperado '${X}'.`;
      popInfo(X, true);
      infoPila.push(errorMensaje);
      return { esValida: false, infoPila, error: errorMensaje };
    }
  }

  if (apuntador < tokens.length) {
    const errorMensaje = `No todos los tokens fueron analizados. Token inesperado '${tokens[apuntador]}'.`;
    infoPila.push(errorMensaje);
    return { esValida: false, infoPila, error: errorMensaje };
  }

  return { esValida: true, infoPila };
}

function esNoTerminal(simbolo) {
  return /[A-Z]/.test(simbolo);
}

export { analizadorSintactico };
