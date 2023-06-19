import './App.css';
import { useEffect } from 'react';

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
              <tr>
                <td>Fila 1, Celda 1</td>
                <td>Fila 1, Celda 2</td>
                <td>
                  <select name="opcion1">
                    <option value="1">1</option>
                    <option value="X">X</option>
                    <option value="2">2</option>
                  </select>
                </td>
                <td><button class="popup-button">%1 - %X - %2</button></td>
              </tr>
              <tr>
                <td>Fila 2, Celda 1</td>
                <td>Fila 2, Celda 2</td>
                <td>
                  <select name="opcion2">
                    <option value="1">1</option>
                    <option value="X">X</option>
                    <option value="2">2</option>
                  </select>
                </td>
                <td><button class="popup-button">%1 - %X - %2</button></td>
              </tr>
              <tr class="section-divider">
                <td colspan="4"></td>
              </tr>
              <tr>
                <td>Fila 3, Celda 1</td>
                <td>Fila 3, Celda 2</td>
                <td>
                  <select name="opcion3">
                    <option value="1">1</option>
                    <option value="X">X</option>
                    <option value="2">2</option>
                  </select>
                </td>
                <td><button class="popup-button">%1 - %X - %2</button></td>
              </tr>
              <tr>
                <td>Fila 4, Celda 1</td>
                <td>Fila 4, Celda 2</td>
                <td>
                  <select name="opcion4">
                    <option value="1">1</option>
                    <option value="X">X</option>
                    <option value="2">2</option>
                  </select>
                </td>
                <td><button class="popup-button">%1 - %X - %2</button></td>
              </tr>
              <tr class="section-divider">
                <td colspan="4"></td>
              </tr>
              <tr>
                <td>Fila 5, Celda 1</td>
                <td>Fila 5, Celda 2</td>
                <td>
                  <select name="opcion5">
                    <option value="1">1</option>
                    <option value="X">X</option>
                    <option value="2">2</option>
                  </select>
                </td>
                <td><button class="popup-button">%1 - %X - %2</button></td>
              </tr>
              <tr>
                <td>Fila 6, Celda 1</td>
                <td>Fila 6, Celda 2</td>
                <td>
                  <select name="opcion6">
                    <option value="1">1</option>
                    <option value="X">X</option>
                    <option value="2">2</option>
                  </select>
                </td>
                <td><button class="popup-button">%1 - %X - %2</button></td>
              </tr>
              <tr class="section-divider">
                <td colspan="4"></td>
              </tr>
              <tr>
                <td>Fila 7, Celda 1</td>
                <td>Fila 7, Celda 2</td>
                <td>
                  <select name="opcion7">
                    <option value="1">1</option>
                    <option value="X">X</option>
                    <option value="2">2</option>
                  </select>
                </td>
                <td><button class="popup-button">%1 - %X - %2</button></td>
              </tr>
              <tr>
                <td>Fila 8, Celda 1</td>
                <td>Fila 8, Celda 2</td>
                <td>
                  <select name="opcion8">
                    <option value="1">1</option>
                    <option value="X">X</option>
                    <option value="2">2</option>
                  </select>
                </td>
                <td><button class="popup-button">%1 - %X - %2</button></td>
              </tr>
              <tr class="section-divider">
                <td colspan="4"></td>
              </tr>
              <tr>
                <td>Fila 9, Celda 1</td>
                <td>Fila 9, Celda 2</td>
                <td>
                  <select name="opcion9">
                    <option value="1">1</option>
                    <option value="X">X</option>
                    <option value="2">2</option>
                  </select>
                </td>
                <td><button class="popup-button">%1 - %X - %2</button></td>
              </tr>
              <tr>
                <td>Fila 10, Celda 1</td>
                <td>Fila 10, Celda 2</td>
                <td>
                  <select name="opcion10">
                    <option value="1">1</option>
                    <option value="X">X</option>
                    <option value="2">2</option>
                  </select>
                </td>
                <td><button class="popup-button">%1 - %X - %2</button></td>
              </tr>
              <tr class="section-divider">
                <td colspan="4"></td>
              </tr>
              <tr>
                <td>Fila 11, Celda 1</td>
                <td>Fila 11, Celda 2</td>
                <td>
                  <select name="opcion11">
                    <option value="1">1</option>
                    <option value="X">X</option>
                    <option value="2">2</option>
                  </select>
                </td>
                <td><button class="popup-button">%1 - %X - %2</button></td>
              </tr>
              <tr>
                <td>Fila 12, Celda 1</td>
                <td>Fila 12, Celda 2</td>
                <td>
                  <select name="opcion12">
                    <option value="1">1</option>
                    <option value="X">X</option>
                    <option value="2">2</option>
                  </select>
                </td>
                <td><button class="popup-button">%1 - %X - %2</button></td>
              </tr>
              <tr class="section-divider">
                <td colspan="4"></td>
              </tr>
              <tr>
                <td>Fila 13, Celda 1</td>
                <td>Fila 13, Celda 2</td>
                <td>
                  <select name="opcion13">
                    <option value="1">1</option>
                    <option value="X">X</option>
                    <option value="2">2</option>
                  </select>
                </td>
                <td><button class="popup-button">%1 - %X - %2</button></td>
              </tr>
              <tr>
                <td>Fila 14, Celda 1</td>
                <td>Fila 14, Celda 2</td>
                <td>
                  <select name="opcion14">
                    <option value="1">1</option>
                    <option value="X">X</option>
                    <option value="2">2</option>
                  </select>
                </td>
                <td><button class="popup-button">%1 - %X - %2</button></td>
              </tr>
              <tr class="section-divider">
                <td colspan="4"></td>
              </tr>
              <tr>
                <td>Fila 15, Celda 1</td>
                <td>Fila 15, Celda 2</td>
                <td>
                  <select name="opcion15">
                    <option value="1">1</option>
                    <option value="X">X</option>
                    <option value="2">2</option>
                  </select>
                </td>
                <td><button class="popup-button">%1 - %X - %2</button></td>
              </tr>
              <tr>
                <td>Fila 16, Celda 1</td>
                <td>Fila 16, Celda 2</td>
                <td>
                  <select name="opcion16">
                    <option value="1">1</option>
                    <option value="X">X</option>
                    <option value="2">2</option>
                  </select>
                </td>
                <td><button class="popup-button">%1 - %X - %2</button></td>
              </tr>
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