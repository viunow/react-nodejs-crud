import React, { Component } from "react";
import UsuarioDataService from '../services/usuario.service';

export default class AddUsuario extends Component {
  constructor(props) {
    super(props);
    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangeDataNascimento = this.onChangeDataNascimento.bind(this);
    this.onChangeFoto = this.onChangeFoto.bind(this);
    this.saveUsuario = this.saveUsuario.bind(this);
    this.novoUsuario = this.novoUsuario.bind(this);

    this.state = {
      id: null,
      nome: "",
      dataNascimento: "",
      foto: "",

      submitted: false
    };
  }

  onChangeNome(e) {
    this.setState({
      nome: e.target.value
    });
  }

  onChangeDataNascimento(e) {
    this.setState({
      dataNascimento: e.target.value
    });
  }

  onChangeFoto(e) {
    this.setState({
      foto: e.target.files[0]
    });
  }

  async saveUsuario(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('nome', this.state.nome);
    formData.append('dataNascimento', this.state.dataNascimento);

    // Quando tem fotos.
    if (this.state.foto) {
      formData.append('foto', this.state.foto);
    }

    let response

    try {
      response = await UsuarioDataService.create(formData, {
        "Content-Type": "multipart/form-data"
      });
    } catch(error) {
      console.error(error);

      throw error;
    }

    this.setState({
      id: response.data.id,
      nome: response.data.nome,
      dataNascimento: response.data.dataNascimento,
      foto: response.data.foto,

      submitted: true
    });
  }

  novoUsuario() {
    this.setState({
      id: null,
      nome: "",
      dataNascimento: "",
      foto: "",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Usuário cadastrado com sucesso!</h4>
            <button className="btn btn-success" onClick={this.novoUsuario}>
              Adicionar novo usuário
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                className="form-control"
                id="nome"
                required
                value={this.state.nome}
                onChange={this.onChangeNome}
                name="nome"
              />
            </div>
            <br/>

            <div className="form-group">
              <label htmlFor="dataNascimento">Data de Nascimento</label>
              <input
                type="date"
                className="form-control"
                id="dataNascimento"
                required
                value={this.state.dataNascimento}
                onChange={this.onChangeDataNascimento}
                name="dataNascimento"
              />
            </div>
            <br/>

            <form action="/resources/uploads" method="POST">
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
            </form>
            <br/>

            <button onClick={this.saveUsuario} className="btn btn-success">
              Cadastrar
            </button>
          </div>
        )}
      </div>
    );
  }
}
