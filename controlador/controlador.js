const livros = require("../dados/biblioteca");

const consultarLivros = (req, res) => {
  res.send(livros);
};

const consultarPorId = (req, res) => {
  const id = Number(req.params.id);
  const livroEncontrado = livros.find((livro) => {
    return livro.id === id;
  });
  if (!livroEncontrado) {
    res.status(404).json({
      mensagem: "Não existe livro para o ID informado.",
    });
  } else if (isNaN(id)) {
    res.status(400).json({
      mensagem: "O valor do parâmetro ID da URL não é um número válido.",
    });
  } else {
    res.status(200).json(livroEncontrado);
  }
};

const adicionarUmLivro = (req, res) => {
  const { titulo, autor, ano, numPaginas } = req.body;
  let livro = {
    id: livros.length + 1,
    titulo: titulo,
    autor: autor,
    ano: ano,
    numPaginas: numPaginas,
  };
  livros.push(livro);
  res.status(200).json({ mensagem: `Livro adicionado.` });
};

const substituirUmLivro = (req, res) => {
  const id = Number(req.params.id);
  const { titulo, autor, ano, numPaginas } = req.body;
  const livroEncontrado = livros.find((livro) => {
    return livro.id === id;
  });
  if (!livroEncontrado) {
    res.status(404).json({
      mensagem: "Não existe livro a ser substituído para o ID informado.",
    });
  } else {
    livros[id - 1] = {
      id: id,
      titulo: titulo,
      autor: autor,
      ano: ano,
      numPaginas: numPaginas,
    };
    res.status(200).json({ mensagem: "Livro substituído." });
  }
};

const alterarUmLivro = (req, res) => {
  const id = Number(req.params.id);
  const { titulo, autor, ano, numPaginas } = req.body;
  const livroEncontrado = livros.find((livro) => {
    return livro.id === id;
  });
  if (!livroEncontrado) {
    res.status(404).json({
      mensagem: "Não existe livro a ser substituído para o ID informado.",
    });
  }
  if (titulo) {
    livroEncontrado.titulo = titulo;
  }
  if (autor) {
    livroEncontrado.autor = autor;
  }
  if (ano) {
    livroEncontrado.ano = ano;
  }
  if (numPaginas) {
    livroEncontrado.numPaginas = numPaginas;
  }
  res.status(200).json({ mensagem: "Livro alterado." });
};

const removerUmLivro = (req, res) => {
  const id = Number(req.params.id);
  const livroRemovido = livros.find((livro) => {
    return livro.id === id;
  });
  if (!livroRemovido) {
    res.status(404).json({
      mensagem: "Não existe livro a ser alterado para o ID informado.",
    });
  } else {
    livros.splice(livroRemovido, 1);
    res.status(200).json({ mensagem: "Livro removido." });
  }
};

module.exports = {
  consultarLivros,
  consultarPorId,
  adicionarUmLivro,
  substituirUmLivro,
  alterarUmLivro,
  removerUmLivro,
};
