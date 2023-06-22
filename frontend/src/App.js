import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Carga de Datos
        const cargarDatosRes = await fetch('/CargarDatos');
        const simulacionRes = await fetch('/Simulacion');
        const sendLocalRes = await fetch('/SendLocal');
        const sendVisitanteRes = await fetch('/SendVisitante');
        const sendPartidosFechasRes = await fetch('/SendPartidosFechas');
        const sendPartidosNombresRes = await fetch('/SendPartidosNombres');

        //Asignacion de Datos
        const cargarDatosData = await cargarDatosRes.json();
        const simulacionData = await simulacionRes.json();
        const sendLocalData = await sendLocalRes.json();
        const sendVisitanteData = await sendVisitanteRes.json();
        const sendPartidosFechasData = await sendPartidosFechasRes.json();
        const sendPartidosNombresData = await sendPartidosNombresRes.json();

        const datosObtenidos = [
          { partido: sendPartidosNombresData[0], fecha: sendPartidosFechasData[0] },
          { partido: sendPartidosNombresData[1], fecha: sendPartidosFechasData[1] },
          { partido: sendPartidosNombresData[2], fecha: sendPartidosFechasData[2] },
          { partido: sendPartidosNombresData[3], fecha: sendPartidosFechasData[3] },
          { partido: sendPartidosNombresData[4], fecha: sendPartidosFechasData[4] },
          { partido: sendPartidosNombresData[5], fecha: sendPartidosFechasData[5] },
          { partido: sendPartidosNombresData[6], fecha: sendPartidosFechasData[6] },
          { partido: sendPartidosNombresData[7], fecha: sendPartidosFechasData[7] },
          { partido: sendPartidosNombresData[8], fecha: sendPartidosFechasData[8] },
          { partido: sendPartidosNombresData[9], fecha: sendPartidosFechasData[9] },
          { partido: sendPartidosNombresData[10], fecha: sendPartidosFechasData[10] },
          { partido: sendPartidosNombresData[11], fecha: sendPartidosFechasData[11] },
          { partido: sendPartidosNombresData[12], fecha: sendPartidosFechasData[12] },
          { partido: sendPartidosNombresData[13], fecha: sendPartidosFechasData[13] },
          { partido: sendPartidosNombresData[14], fecha: sendPartidosFechasData[14] },
        ];

        setDatos(datosObtenidos);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Super Quinielas!</h1>
      </header>

      <body>
        <p>Buenas tardes</p>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Liga</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td id="liga">Nacional</td>
                <td id="fecha">22/06/2023</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Partido</th>
                <th>Fecha</th>
                <th>1x2</th>
                <th>Probabilidades</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((dato, index) => (
                <tr key={index}>
                  <td id="partidos">{dato.partido}</td>
                  <td id="fechas">{dato.fecha}</td>
                  <td id="seleccion">
                    <select name={`opcion${index + 1}`}>
                      <option value="1">1</option>
                      <option value="X">X</option>
                      <option value="2">2</option>
                    </select>
                  </td>
                  <td id="resultados">
                    <button className="popup-button">%1 - %X - %2</button>
                  </td>
                </tr>
              ))}
            </tbody>
            <div id="popup-content" className="popup-content">
              Aquí va la info de las probabilidades!!
            </div>
          </table>
        </div>
      </body>
    </div>
  );
}

export default App;