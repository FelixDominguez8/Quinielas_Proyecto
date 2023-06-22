import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
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
      { partido: 'Partido 1', fecha: '2023-06-21' },
      { partido: 'Partido 2', fecha: '2023-06-22' },
      { partido: 'Partido 3', fecha: '2023-06-23' },
      { partido: 'Partido 4', fecha: '2023-06-24' },
      { partido: 'Partido 5', fecha: '2023-06-25' },
      { partido: 'Partido 6', fecha: '2023-06-26' },
      { partido: 'Partido 7', fecha: '2023-06-27' },
      { partido: 'Partido 8', fecha: '2023-06-28' },
      { partido: 'Partido 9', fecha: '2023-06-29' },
      { partido: 'Partido 10', fecha: '2023-06-30' },
      { partido: 'Partido 11', fecha: '2023-06-31' },
      { partido: 'Partido 12', fecha: '2023-07-01' },
      { partido: 'Partido 13', fecha: '2023-07-02' },
      { partido: 'Partido 14', fecha: '2023-07-03' },
      { partido: 'Partido 15', fecha: '2023-07-04' },
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
                <th>Jornada</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td id="liga">Siu</td>
                <td id="jornada">68</td>
                <td id="fecha">Ayer :P</td>
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