import React from 'react';
import PaginaPrincipal from "./componets/index/PaginaPrincipal.js"
import ErrorPagina from "./componets/error404/ErrorPagina"
import Cookies from 'js-cookie'
import Register from './componets/register/Register'
import myAccount from './componets/accounts/myAccount/index'
import Recomend from './componets/accounts/recomend/index'
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

          {Cookies.get("userName") === undefined ? <PaginaPrincipal /> : <Recomend/>}
        </Route>
        <Route path="/register" component={Register} />

        <Route exact path="/:usuariName" component={myAccount} />
        <Route path="*" component={ErrorPagina} />


      </Switch>
    </Router>
  )
};