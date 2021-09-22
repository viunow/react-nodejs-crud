module.exports = (sequelize, Sequelize) => {
  const Cadastro = sequelize.define("cadastro", {
    // codigo: {
    //   type: Sequelize.INT
    // },
    nome: {
      type: Sequelize.STRING
    },
    dataNascimento: {
      type: Sequelize.DATE
    },
    foto: {
      type: Sequelize.BLOB
    }
  });

  return Cadastro;
}