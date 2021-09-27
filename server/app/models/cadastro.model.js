module.exports = (sequelize, Sequelize) => {
  const Cadastro = sequelize.define("cadastro", {
    nome: {
      type: Sequelize.STRING
    },
    dataNascimento: {
      type: Sequelize.DATE
    },
    foto: {
      type: Sequelize.BLOB("long")
    },
  });

  return Cadastro;
}