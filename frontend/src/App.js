import './App.css';
import React, { useEffect, useState } from 'react';

const sendGanadoresRes = await fetch('/Ganadores');
const sendGanadoresData = await sendGanadoresRes.json();

var indexes = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

function App() {
  const [datos, setDatos] = useState([]);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [popupPosition2, setPopupPosition2] = useState({ x: 0, y: 0 });

  const Resultados = (event) => {
      var cont = 0;
      for(var i=0;i<indexes.length;i++){
        var e = document.getElementById("opcion"+indexes[i])
        var text = e.options[e.selectedIndex].text;
        console.log(text);
        console.log(sendGanadoresData[i])
        if(text == sendGanadoresData[i]){
          cont++
        }
        
      }
      console.log(cont);
      if(cont == indexes.length){
        var text = "ganastes";
        mostrarResultados2(event, text);
        return(console.log("ganastes"))
      }else{
        var text = "perdistes";
        mostrarResultados2(event, text);
        return(console.log("perdistes"))
      }
  }

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

  const mostrarResultados2 = (event, text) => {
    const popupContent = document.getElementById('popup-content2');

    popupContent.innerHTML = text;
    popupContent.style.display = 'block';

    // Actualizar la posición del popup según las coordenadas del evento
    setPopupPosition2({ x: event.clientX, y: event.clientY });

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

  useEffect(() => {
    const closePopup2 = () => {
      const popupContent = document.getElementById('popup-content2');
      popupContent.style.display = 'none';
    };

    // Agregar el evento de clic al documento para cerrar el popup
    document.addEventListener('click', closePopup2);

    // Limpiar el evento de clic al desmontar el componente
    return () => {
      document.removeEventListener('click', closePopup2);
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
                    <select id={`opcion${index + 1}`}>
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
          <p></p>
          <button onClick={(event) =>  Resultados(event)}>Ver Resultados</button>
        </div>
      </body>

      <div id="popup-content" className="popup-content" style={{ top: popupPosition.y, left: popupPosition.x }}>
        Aquí va la info de las probabilidades!!
      </div>

      <div id="popup-content2" className="popup-content" style={{ top: popupPosition2.y+270, left: popupPosition2.x-200 }}>
        Aquí va la info de las probabilidades!!
      </div>
    </div>
  );
}

export default App;