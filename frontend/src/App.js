import './App.css';
import icon from './icon.png';
import React, { useEffect, useState } from 'react';

const sendGanadoresRes = await fetch('/Ganadores');
const sendGanadoresData = await sendGanadoresRes.json();

var indexes = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

function App() {
  const [datos, setDatos] = useState([]);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  //const [popupPosition2, setPopupPosition2] = useState({ x: 0, y: 0 });
  const [resultado, setResultado] = useState('');

  //resultados de los biorritmos en la simulacion
  const Resultados = (event) => {
      var cont = 0;
      for(var i=0;i<indexes.length;i++){
        var e = document.getElementById("opcion"+indexes[i])
        var text = e.options[e.selectedIndex].text;
        console.log(text);
        console.log(sendGanadoresData[i])
        if(text === sendGanadoresData[i]){
          cont++
        }
      }
      var text;
      console.log(cont);

      if (cont === indexes.length) {
        setResultado('HAS GANADO!');
        //mostrarResultados2(event, 'ganastes');
        console.log('HAS GANADO!');
      } else {
        setResultado('HAS PERDIDO!');
        //mostrarResultados2(event, 'HAS PERDIDO!');
        console.log('HAS PERDIDO!');
      }

  };

  //Animacion al presionar el boton de ver resultados
  useEffect(() => {
    if (resultado) {
      const element = document.querySelector('.ganais-perdeis');
      element.style.transform = 'translateY(100%)';
      element.style.opacity = '1';

      setTimeout(() => {
        element.style.transform = 'translateY(0)';
      }, 100);

      setTimeout(() => {
        element.style.opacity = '0';
      }, 2000);

      setTimeout(() => {
        setResultado('');
      }, 3500);
    }
  }, [resultado]);

  //Gestion de Datos
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

    // Obtener las coordenadas del botón en relación con el viewport
    const buttonRect = event.target.getBoundingClientRect();
    const buttonTop = buttonRect.top + window.scrollY;
    const buttonLeft = buttonRect.left + window.scrollX;

    // Actualizar la posición del popup según las coordenadas del botón
    const posX = buttonLeft + buttonRect.width / 2;
    const posY = buttonTop - popupContent.offsetHeight;
    setPopupPosition({ x: posX, y: posY });

    // Prevenir la propagación del evento para evitar que se cierre automáticamente el popup
    event.stopPropagation();
  };

  /*const mostrarResultados2 = (event, text) => {
    const popupContent = document.getElementById('popup-content2');

    popupContent.innerHTML = text;
    popupContent.style.display = 'block';

    // Actualizar la posición del popup según las coordenadas del evento
    setPopupPosition2({ x: event.clientX, y: event.clientY });

    // Prevenir la propagación del evento para evitar que se cierre automáticamente el popup
    event.stopPropagation();
  };*/

  //Efecto para el Primer Popup
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

  /*useEffect(() => {
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
  }, []);*/


  return (
    <div className="App">
      <header className="App-header">
        <div className='Fondo'>
          <h1>Super Quinielas!</h1>
        </div>
      </header>

      <body>
        <h2>*-*-* Bienvenid@ a las Super-Quinielas! *-*-*</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr className='head-tabla'>
                <th>Liga</th>
                <th>Jornada</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td id="liga">Liga de los Shogunes del Gol</td>
                <td id="fecha">55</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr className='head-tabla'>
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
          <button className='boton-resultados' onClick={(event) =>  Resultados(event)}>Ver Resultados</button>
        </div>
      </body>

      <div id="popup-content" className="popup-content" style={{ top: popupPosition.y, left: popupPosition.x }}>
        Aquí va la info de las probabilidades!!
      </div>

      <div className={`ganais-perdeis ${resultado ? 'show' : ''}`}>
        {resultado && <span>{resultado}</span>}
      </div>
    </div>
  );
}

export default App;