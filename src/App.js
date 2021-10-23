import React from 'react';
import PaginaPrincipal from "./componets/index/PaginaPrincipal.js"
import ErrorPagina from "./componets/error404/ErrorPagina"
import Cookies from 'js-cookie'
import Register from './componets/register/Register'
import myAccount from './componets/accounts/myAccount/index'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
export default function App(props) {
  return (
    <Router>
      <Switch>
        <Route exact path="/testingAjax">
          <App alone="otras palabras" />
        </Route>
        <Route exact path="/">

          {Cookies.get("userName") === undefined ? <PaginaPrincipal /> : <h1>chupa verga</h1>}
        </Route>
        <Route path="/register" component={Register} />

        <Route exact path="/:usuariName" component={myAccount} />
        <Route path="*" component={ErrorPagina} />


      </Switch>
    </Router>
  )
};
// import './App.css';
// import React, { useEffect, useState } from "react";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
// } from "react-router-dom";

// function Nombre(json){
//   return(
//     <figure>
//         <h2>{json.name}</h2>
//     </figure>
//   )
// }

// function App(props) {
//   const [nombre, setNombre] = useState(false);
//   const [inf,setInf]=useState({});

//   useEffect(() => {
//   fetch("/api/data")
//   .then(resp=>{
//     resp.json()
//       .then(json=>{
//       console.log(json);
//       setNombre(bol=>true);
//       setInf(inf =>json);
//     });    
//     })
//   }, [])
//   return (
//     <div className="App">
//       <h1>estas son los temas que puedo poner {props.alone}</h1>
//       {nombre === false
//                 ?(
//                 <h2>cargando...</h2>
//                 ):( 
//                 <Nombre name={inf.name} />
//                 )      
//       }
//       <Router>
//         <Switch>
//         <Route path="/colors">
//           <h3>colors</h3>
//         </Route>
//         <Route path="/">
//           <h3>home</h3>
//         </Route>
//         </Switch>
//       </Router>

//     </div>
//   );
// }

// export default App;
