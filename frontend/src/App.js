import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [datos, setDatos] = useState([]);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Carga de Datos
        const cargarDatosRes = await fetch('/CargarDatos');
        const simulacionRes = await fetch('/Simulacion');
        const sendLocalRes = await fetch('/SendLocal');
        const sendVisitanteRes = await fetch('/SendVisitante');
        const sendPartidosFechasRes = await fetch('/SendPartidosFechas');
        const sendPartidosNombresRes = await fetch('/SendPartidosNombres');

        // Asignacion de Datos
        const cargarDatosData = await cargarDatosRes.json();
        const simulacionData = await simulacionRes.json();
        const sendLocalData = await sendLocalRes.json();
        const sendVisitanteData = await sendVisitanteRes.json();
        const sendPartidosFechasData = await sendPartidosFechasRes.json();
        const sendPartidosNombresData = await sendPartidosNombresRes.json();

        //Carga de datos en las variables en el map
        const datosObtenidos = sendPartidosNombresData.map((partido, index) => ({
          partido,
          fecha: sendPartidosFechasData[index],
          resultadoLocal: sendLocalData[index],
          resultadoVisitante: sendVisitanteData[index]
        }));

        setDatos(datosObtenidos);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    };

    fetchData();
  }, []);

  //Funcion para mostrar el contenido en la ventana popup
  const mostrarResultados = (event, index) => {
    const popupContent = document.getElementById('popup-content');
    const resultadoLocal = datos[index].resultadoLocal;
    const resultadoVisitante = datos[index].resultadoVisitante;

    popupContent.innerHTML = `Local: ${resultadoLocal}<br>Visitante: ${resultadoVisitante}`;
    popupContent.style.display = 'block';

    // Actualizar la posición del popup según las coordenadas del evento
    setPopupPosition({ x: event.clientX, y: event.clientY });

    // Prevenir la propagación del evento para evitar que se cierre automáticamente el popup
    event.stopPropagation();
  };

  useEffect(() => {
    const closePopup = () => {
      const popupContent = document.getElementById('popup-content');
      popupContent.style.display = 'none';
    };

    // Agregar el evento de clic al documento para cerrar el popup
    document.addEventListener('click', closePopup);

    // Limpiar el evento de clic al desmontar el componente
    return () => {
      document.removeEventListener('click', closePopup);
    };
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
                <th>Resultados</th>
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
                    <button className="popup-button" onClick={(event) => mostrarResultados(event, index)}>
                      Biorritmos
                    </button>
                  </td>
                </tr>
              ))}
              
            </tbody>
          </table>
        </div>
      </body>

      <div id="popup-content" className="popup-content" style={{ top: popupPosition.y, left: popupPosition.x }}>
        Aquí va la info de las probabilidades!!
      </div>
    </div>
  );
}

export default App;