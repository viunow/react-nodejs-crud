import React, { Component } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import AddUsuario from "./components/add-usuario.component";
import Usuario from "./components/usuario.component";
import UsuariosLista from "./components/usuarios-lista.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/usuarios"} className="navbar-brand">
            CRUD App
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/usuarios"} className="nav-link">
                Usuários
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add usuário
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/usuarios"]} component={UsuariosLista} />
            <Route exact path="/add" component={AddUsuario} />
            <Route path="/usuarios/:id" component={Usuario} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
