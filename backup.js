import './App.css';
import { UserApi } from '../src/api/UserApi';
import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  const [data, setData] = useState(null);
  const [users, setUsers] = useState([]);

  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [foto, setFoto] = useState("");

  // como carregar usuarios:
  const fetchUsers = async () => {
    const response = await UserApi.getAll();

    console.log('response', response);
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, [data]);

  const postUser = async (event) => {
    event.preventDefault();

    const payload = {
      nome: nome,
      dataNascimento: dataNascimento,
    };

    let response = null;

    try {
      response = await UserApi.post(payload);
    } catch(error) {
      console.error(`Ops! Something went wrong: ${error.message}`, error);
      throw error;
    }

    console.log('response', response);
    setData(response.data);
  };

  return (
    <div className="App">
      {/* <div className="deletar-depois">
        Data: {JSON.stringify(data)} <br/>
        Nome: {JSON.stringify(nome)} <br/>
        DataNascimento: {JSON.stringify(dataNascimento)} <br/>
        ---- <br />
        Users: {JSON.stringify(users)} <br/>
      </div> */}

      <h1>Teste Cadastro Básico de Usuário</h1>
      
      <form onSubmit={postUser} className="form">
        <h2>Cadastre-se abaixo.</h2>
        {/* <input type="text" name="codigo"/> */}
        <label htmlFor="nome">Nome: </label>
        <input id="nome" type="name" name="nome" required onChange={(e) => setNome(e.target.value)} />

        <label htmlFor="dataNascimento">Data de Nascimento: </label>
        <input id="dataNascimento" type="date" name="dataNascimento" required onChange={(e) => setDataNascimento(e.target.value)} />

        <label htmlFor="foto">Envie sua foto:</label>
        <input id="foto" type="file" name="foto" onChange={(e) => setFoto(e.target.files[0])} />

        <button type="submit">Enviar</button>
      </form>
      <br/>
      <div className="visualizar-container">
        <h1>Usuarios:</h1>
        {users.map((user) => 
          <div>
            nome: {user.nome} 
            <br/> 
            data de nascimento: {user.dataNascimento}
          </div>)}
      </div>
    </div>
  );
}

export default App;
