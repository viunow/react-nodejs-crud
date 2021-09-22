const db = require("../models");
const Cadastro = db.cadastros;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.nome) {
    res.status(400).send({
      message: "Campo nao pode ser vazio!"
    });
    return;
  }

  // Criando um usuario
  const cadastro = {
    nome: req.body.nome,
    dataNascimento: req.body.dataNascimento,
    foto: req.body.foto ? req.body.foto : false
  };

  // Salvando um usuario no banco de dados
  Cadastro.create(cadastro)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro ao criar o usuário."
      });
    });
};

exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.like]: `%${nome}%` } } : null;

  Cadastro.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro ao mostrar todos os cadastros."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Cadastro.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao buscar o cadastro com id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Cadastro.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cadastro atualizado com sucesso."
        });
      } else {
        res.send({
          message: `Nao foi possivel atualizar o cadastro com id=${id}. Talvez o cadastro não foi localizado ou req.body está vazio!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao atualizar cadastro com id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Cadastro.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cadastro excluído com sucesso!"
        });
      } else {
        res.send({
          message: `Não foi possível excluir o cadastro com id=${id}. Talvez o cadastro não foi localizado.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possível excluir o cadastro com id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Cadastro.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      if (nums == 1) {
          res.send({message: " 1 Cadastro excluido com sucesso!"})
      } else {
        res.send({ message: `${nums} Cadastros foram excluídos com sucesso!` });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algum erro ocorreu ao remover todos os cadastros."
      });
    });
};