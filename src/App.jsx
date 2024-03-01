// App.js

import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { analizadorSintactico } from './analizadorSintactico'; // Importamos la función

function App() {
  const [cadena, setCadena] = useState('');
  const [resultado, setResultado] = useState(null);
  const [pilaInfo, setPilaInfo] = useState([]);

  const analizarCadena = () => {
    const { esValida, infoPila } = analizadorSintactico(cadena);
    setResultado(esValida);
    setPilaInfo(infoPila);
  };

  const editorDidMount = (editor, monaco) => {
    console.log('Editor montado');
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <MonacoEditor
          width="800"
          height="200"
          language="plaintext"
          theme="vs-dark"
          value={cadena}
          onChange={setCadena}
          editorDidMount={editorDidMount}
        />
      </div>
      <button onClick={analizarCadena}>Analizar</button>
      {resultado !== null && (
        <p>La cadena {cadena} es {resultado ? 'válida' : 'inválida'}.</p>
      )}
      <div>
        <h3>Información de la Pila:</h3>
        <ul>
          {pilaInfo.map((info, index) => (
            <li key={index}>{info}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
