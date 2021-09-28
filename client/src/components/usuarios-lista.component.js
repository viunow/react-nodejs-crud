import React, { Component } from "react";
import UsuarioDataService from '../services/usuario.service';
import { Link } from 'react-router-dom';

export default class UsuariosLista extends Component { 
  constructor(props) {
    super(props);
    this.onChangeBuscarNome = this.onChangeBuscarNome.bind(this);
    this.retornarUsuarios = this.retornarUsuarios.bind(this);
    this.recarregarLista = this.recarregarLista.bind(this);
    this.setActiveUsuario = this.setActiveUsuario.bind(this);
    this.removerTodosUsuarios = this.removerTodosUsuarios.bind(this);
    this.buscarNome = this.buscarNome.bind(this);

    this.state = {
      usuarios: [],
      currentUsuario: null,
      currentIndex: -1,
      buscarNome: ""
    };
  }
  
  componentDidMount() {
    this.retornarUsuarios();
  }

  onChangeBuscarNome(e) {
    const buscarUsuario = e.target.value;

    this.setState({
      buscarUsuario: buscarUsuario
    });
  }

  retornarUsuarios() {
    UsuarioDataService.getAll()
      .then(response => {
        this.setState({
          usuarios: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  recarregarLista() {
    this.retornarUsuarios();
    this.setState({
      currentUsuario: null,
      currentIndex: -1
    });
  }

  setActiveUsuario(usuario, index) {
    this.setState({
      currentUsuario: usuario,
      currentIndex: index
    });
  }

  removerTodosUsuarios() {
    UsuarioDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.recarregarLista();
      })
      .catch(e => {
        console.log(e);
      });
  }

  buscarNome() {
    UsuarioDataService.findOne(this.state.buscarNome)
      .then(response => {
        this.setState({
          usuarios: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { usuarios, currentUsuario, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nome"
              // value={buscarNome}
              onChange={this.onChangeBuscarNome}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                type="button"
                onClick={this.buscarNome}
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Lista de usuários cadastrados</h4>

          <ul className="list-group">
            {usuarios &&
              usuarios.map((usuario, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveUsuario(usuario, index)}
                  key={index}
                >
                  {usuario.nome}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removerTodosUsuarios}
          >
            Remover todos os usuários
          </button>
        </div>
        <div className="col-md-6">
          {currentUsuario ? (
            <div>
              <h4>Usuário: </h4>
              <br />
              <div>
                <label>
                  <strong>Nome:</strong>
                </label>{" "}
                {currentUsuario.nome}
              </div>
              <div>
                <label>
                  <strong>Data de Nascimento:</strong>
                </label>{" "}
                {currentUsuario.dataNascimento}
              </div>
              <div>
                <label>
                  <strong>Foto:</strong>
                </label>{" "}
                {currentUsuario.foto}
              </div>
              <br/>
              <Link
                to={"/usuarios/" + currentUsuario.id}
                className="btn btn-outline-secondary"
              >
                Editar
              </Link>
            </div>
          ) : (
            <div>
              {/* <br /> */}
              <p>Clique em um usuario para editar.</p>
            </div>
          )}
        </div>
      </div>
    );

  }
}