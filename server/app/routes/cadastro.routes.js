module.exports = app => {
  const cadastros = require("../controllers/cadastro.controller");

  var router = require("express").Router();

  // Criar um novo usuario
  router.post("/", cadastros.create);

  // Retornar todos os cadastros
  router.get("/", cadastros.findAll);

  //Retornar cadastro por id
  router.get("/:id", cadastros.findOne);

  // Atualizar um cadastro por id
  router.put("/:id", cadastros.update);

  // Excluir um cadastro por id
  router.delete("/:id", cadastros.delete);

  // Excluir todos os cadastros
  router.delete("/", cadastros.deleteAll);

  app.use('/api/cadastros', router);
};