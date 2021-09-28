const cadastros = require("../controllers/cadastro.controller");
const router = require("express").Router();

const uploadHandler = require('../middleware/upload-image-handler');
// const upload = multer({ dest: './resources/static/assets/tmp' });

/**
 * @param {core.Express} app
 */
module.exports = (app) => {
  // Criar um novo usuario
  router.post("/", uploadHandler.single('foto'), cadastros.create);

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
