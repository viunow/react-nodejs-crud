import React, { Component } from "react";
import UsuarioDataService from '../services/usuario.service';

export default class Usuario extends Component { 
  constructor(props) {
    super(props);
    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangeDataNascimento = this.onChangeDataNascimento.bind(this);
    this.onChangeFoto = this.onChangeFoto.bind(this);
    this.getUsuario = this.getUsuario.bind(this);
    this.updateUsuario = this.updateUsuario.bind(this);
    this.deleteUsuario = this.deleteUsuario.bind(this);

    this.state = {
      currentUsuario: {
        id: null,
        nome: "",
        dataNascimento: "",
        foto: "",
      },
      message: ""
    };
  }
  
  componentDidMount() {
    this.getUsuario(this.props.match.params.id);
  }

  onChangeNome(e) {
    const nome = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUsuario: {
          ...prevState.currentUsuario,
          nome: nome
        }
      };
    });
  }

  onChangeDataNascimento(e) {
    const dataNascimento = new Date(e.target.value);
    
    this.setState(prevState => ({
      currentUsuario: {
        ...prevState.currentUsuario,
        dataNascimento: dataNascimento
      }
    }));
  }

  onChangeFoto(e) {
    const foto = e.target.files;

    this.setState(prevState => ({
      currentUsuario: {
        ...prevState.currentUsuario,
        foto: foto
      }
    }));
  }

  getUsuario(id) {
    UsuarioDataService.get(id)
      .then(response => {
        this.setState({
          currentUsuario: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateUsuario() {
    UsuarioDataService.update(
      this.state.currentUsuario.id,
      this.state.currentUsuario
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "O usuário foi atualizado com sucesso!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteUsuario() {    
    UsuarioDataService.delete(this.state.currentUsuario.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/usuarios')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentUsuario } = this.state;

    return (
      <div>
        {currentUsuario ? (
          <div className="edit-form">
            <h4>Usuário</h4>
            <br/>

            <form>
              <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  value={currentUsuario.nome}
                  onChange={this.onChangeNome}
                />
              </div>
              <br/>
            
              <div className="form-group">
                <label htmlFor="dataNascimento">Data de nascimento</label>
                <input
                  type="text"
                  className="form-control"
                  id="dataNascimento"
                  value={currentUsuario.dataNascimento}
                  onChange={this.onChangeDataNascimento}
                />
              </div>
              <br/>
            
              <div className="form-group">
                <label htmlFor="foto">Foto</label>
                <input
                  type="file"
                  className="form-control"
                  id="foto"
                  required
                  // value={this.state.foto}
                  onChange={this.onChangeFoto}
                  name="foto"
                />
              </div>
              <br/>
            
            </form>

            <button
              className="btn btn-danger"
              onClick={this.deleteUsuario}
            >
              Deletar
            </button>
            
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.updateUsuario}
            >
              Atualizar
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Por favor clique em um usuario...</p>
          </div>
        )}
      </div>
    );
  }
}