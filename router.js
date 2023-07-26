const express = require("express");
const router = express.Router();
const {
  consultarLivros,
  consultarPorId,
  adicionarUmLivro,
  substituirUmLivro,
  alterarUmLivro,
  removerUmLivro,
} = require("./controlador/controlador");

router.get("/livros", consultarLivros);
router.get("/livros/:id", consultarPorId);
router.post("/livros", adicionarUmLivro);
router.put("/livros/:id", substituirUmLivro);
router.patch("/livros/:id", alterarUmLivro);
router.delete("/livros/:id", removerUmLivro);

module.exports = router;
