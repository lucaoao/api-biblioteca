const fs = require("fs/promises");
const pool = require("../dados/database");

const consultarLivros = async (req, res) => {
  try {
    const livros = await pool.query("select * from livros");
    return res.status(200).json(livros.rows);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const consultarPorId = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const livros = await pool.query("select * from livros where id = $1", [id]);

    if (livros.rows.length === 0) {
      return res
        .status(404)
        .json({ mensagem: "Não existe livro para o ID informado" });
    }
    return res.status(200).json(livros.rows);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const adicionarUmLivro = async (req, res) => {
  const { titulo, autor, ano, numPaginas } = req.body;
  try {
    if (!titulo || !autor || titulo.trim() === "" || autor.trim() === "") {
      return res.status(400).json({
        mensagem: "Os campos 'Autor' e 'Título' não podem ficar vazios.",
      });
    }
    await pool.query(
      "insert into livros(titulo, autor, ano, paginas) values ($1, $2, $3, $4) returning *",
      [titulo, autor, ano, numPaginas]
    );
    return res.status(200).json({ mensagem: "Livro adicionado." });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const alterarUmLivro = async (req, res) => {
  const id = Number(req.params.id);
  const { titulo, autor, ano, numPaginas } = req.body;
  try {
    const encontrarLivro = await pool.query(
      "select * from livros where id = $1",
      [id]
    );
    if (encontrarLivro.rows.length === 0) {
      return res
        .status(400)
        .json({ mensagem: "Não existe livro para o ID informado" });
    }
    if (titulo) {
      await pool.query("update livros set titulo = $1 where id = $2", [
        titulo,
        id,
      ]);
    }
    if (autor) {
      await pool.query("update livros set autor = $1 where id = $2", [
        autor,
        id,
      ]);
    }
    if (ano) {
      await pool.query("update livros set ano = $1 where id = $2", [ano, id]);
    }
    if (numPaginas) {
      await pool.query("update livros set paginas = $1 where id = $2", [
        numPaginas,
        id,
      ]);
    }
    return res.status(200).json({ mensagem: "Livro alterado." });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const removerUmLivro = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const encontrarLivro = await pool.query(
      "select * from livros where id = $1",
      [id]
    );
    if (encontrarLivro.rows.length === 0) {
      return res
        .status(400)
        .json({ mensagem: "Não existe livro para o ID informado" });
    }
    await pool.query("delete from livros where id = $1", [id]);
    res.status(200).json({ mensagem: "Livro removido." });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  consultarLivros,
  consultarPorId,
  adicionarUmLivro,
  alterarUmLivro,
  removerUmLivro,
};
