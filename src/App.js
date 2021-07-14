import logo from './logo.svg';
import './App.css';
import Propiedad from "./componets/propiedades"
import Texto from "./componets/texto"
import State from "./componets/componenteConEstado"
import RenderConditional from "./componets/renderConditional"
import RenderElemetReact from "./componets/renderElemetReact"


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Propiedad 
        cadena="Esto es un acadena de texto"
        number ={20} 
        boolean = {false} 
        arreglo={[1,2,3]}
        objeto={{nombre:"tu mama",apellido:"ya sabes lo demas"}}
        elementReact={<i>no sale</i>}
        funcion = {numero=>numero*numero}
        componenteReact = {<Texto></Texto>}
        />
        <State/>
        <hr></hr>
        <RenderConditional/>
        <br></br>
        <RenderElemetReact/>
        
      </header>
    </div>
  );
}

export default App;
