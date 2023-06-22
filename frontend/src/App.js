import './App.css';
import React, { useEffect, useState } from 'react';

var local = []
var visitante = []
var fechas = []

function App() {
  useEffect(()=>{
    fetch("/CargarDatos")
  }, [])

  useEffect(()=>{
    fetch("/Simulacion")
  }, [])

  const[data,setData] = useState({})

  useEffect(()=>{
    fetch("/SendLocal").then(res => res.json()).then(data => setData(data))
    local = data
  }, [])

  const[data2,setData2] = useState({})

  useEffect(()=>{
    fetch("/SendVisitante").then(res => res.json()).then(data2 => setData2(data2))
    visitante = data2
  }, [])

  const[data3,setData3] = useState({})

  useEffect(()=>{
    fetch("/SendPartidosFechas").then(res => res.json()).then(data3 => setData3(data3))
    fechas = data3
  }, [])

  const[nombres,setData4] = useState({})

  useEffect(()=>{
    fetch("/SendPartidosNombres").then(res => res.json()).then(nombres => setData4(nombres))
  }, [])

  useEffect(() => {
    var popupContent = document.getElementById('popup-content');
    var popupButtons = document.querySelectorAll('.popup-button');

    popupButtons.forEach((button) => {
      button.addEventListener('click', function(event) {
        var mouseX = event.clientX;
        var mouseY = event.clientY;
    
        var scrollX = window.pageXOffset || document.documentElement.scrollLeft;
        var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    
        var adjustedX = mouseX + scrollX;
        var adjustedY = mouseY + scrollY;
    
        popupContent.style.display = 'block';
        popupContent.style.top = adjustedY + 'px';
        popupContent.style.left = adjustedX + 'px';
      });
    });

    document.addEventListener('click', function(event) {
      var target = event.target;
  
      var isButton = target.classList.contains('popup-button');
      var isPopupContent = target.id === 'popup-content';
  
      if (!isButton && !isPopupContent) {
        popupContent.style.display = 'none';
      }
    });
  }, []);

  const [datos, setDatos] = useState([]);
  useEffect(() => {
    // Lógica para obtener los datos de la base de datos en Express
    
    const datosObtenidos = [
      { partido: nombres[0], fecha: fechas[0] },
      { partido: nombres[1], fecha: fechas[1] },
      { partido: nombres[2], fecha: fechas[2] },
      { partido: nombres[3], fecha: fechas[3] },
      { partido: nombres[4], fecha: fechas[4] },
      { partido: nombres[5], fecha: fechas[5] },
      { partido: nombres[6], fecha: fechas[6] },
      { partido: nombres[7], fecha: fechas[7] },
      { partido: nombres[8], fecha: fechas[8] },
      { partido: nombres[9], fecha: fechas[9] },
      { partido: nombres[10], fecha: fechas[10] },
      { partido: nombres[11], fecha: fechas[11] },
      { partido: nombres[12], fecha: fechas[12] },
      { partido: nombres[13], fecha: fechas[13] },
      { partido: nombres[14], fecha: fechas[14]},
    ];

    setDatos(datosObtenidos);
  }, []);

  return (
    <div className="App">
      <header className="App-header">     
        <h1>Super Quinielas!</h1>
      </header>

      <body>
        <p>Buenas tardes</p>
        <div class="table-container">
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

        <div class="table-container">
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
                      <td>{dato.partido}</td>
                      <td>{dato.fecha}</td>
                      <td>
                        <select name={`opcion${index + 1}`}>
                          <option value="1">1</option>
                          <option value="X">X</option>
                          <option value="2">2</option>
                        </select>
                      </td>
                      <td>
                        <button className="popup-button">%1 - %X - %2</button>
                      </td>

                    </tr>
                  ))}
              
            </tbody>
            <div id="popup-content" class="popup-content">
              Aqui va la info de las probabilidades!!
            </div>
          </table>
        </div>
      </body>
    </div>
  );
}

export default App;