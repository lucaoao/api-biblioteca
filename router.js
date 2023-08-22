const express = require("express");
const router = express.Router();
const {
  consultarLivros,
  consultarPorId,
  adicionarUmLivro,
  alterarUmLivro,
  removerUmLivro,
} = require("./controlador/controlador");

router.get("/livros", consultarLivros);
router.get("/livros/:id", consultarPorId);
router.post("/livros", adicionarUmLivro);
router.patch("/livros/:id", alterarUmLivro);
router.delete("/livros/:id", removerUmLivro);

module.exports = router;
