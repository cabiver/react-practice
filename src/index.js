import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import PaginaPrincipal from "./componets/index/PaginaPrincipal.js"
import ErrorPagina from "./componets/error404/ErrorPagina"
import Cookies from 'js-cookie'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/testingAjax">
          <App alone="otras palabras"/>
        </Route>
        <Route exact path="/">
          
          {Cookies.get("userName") === undefined?<PaginaPrincipal/>:<h1>chupa verga</h1>}
        </Route>
        
        {/* <Route exact path="/:usuariName" component={PaginaPrincipal}/> */}
        <Route path="*" component={ErrorPagina}/>
      
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
