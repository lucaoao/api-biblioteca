const fs = require("fs/promises");

const consultarLivros = async (req, res) => {
  let livros = await fs.readFile("./dados/biblioteca.json");
  res.status(200).send(livros);
};

const consultarPorId = async (req, res) => {
  const id = Number(req.params.id);
  let livros = await fs.readFile("./dados/biblioteca.json");
  livros = JSON.parse(livros);
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

const adicionarUmLivro = async (req, res) => {
  let livros = await fs.readFile("./dados/biblioteca.json");
  livros = JSON.parse(livros);
  const { titulo, autor, ano, numPaginas } = req.body;
  let livro = {
    id: livros.length + 1,
    titulo: titulo,
    autor: autor,
    ano: ano,
    numPaginas: numPaginas,
  };
  livros.push(livro);
  fs.writeFile("./dados/biblioteca.json", JSON.stringify(livros, null, 2));
  res.status(200).json({ mensagem: `Livro adicionado.` });
};

const substituirUmLivro = async (req, res) => {
  const id = Number(req.params.id);
  const { titulo, autor, ano, numPaginas } = req.body;
  let livros = await fs.readFile("./dados/biblioteca.json");
  livros = JSON.parse(livros);
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
    fs.writeFile("./dados/biblioteca.json", JSON.stringify(livros, null, 2));
    res.status(200).json({ mensagem: "Livro substituído." });
  }
};

const alterarUmLivro = async (req, res) => {
  const id = Number(req.params.id);
  const { titulo, autor, ano, numPaginas } = req.body;
  let livros = await fs.readFile("./dados/biblioteca.json");
  livros = JSON.parse(livros);
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
  fs.writeFile("./dados/biblioteca.json", JSON.stringify(livros, null, 2));
  res.status(200).json({ mensagem: "Livro alterado." });
};

const removerUmLivro = async (req, res) => {
  const id = Number(req.params.id);
  let livros = await fs.readFile("./dados/biblioteca.json");
  livros = JSON.parse(livros);
  const livroRemovido = livros.find((livro) => {
    return livro.id === id;
  });
  if (!livroRemovido) {
    res.status(404).json({
      mensagem: "Não existe livro a ser alterado para o ID informado.",
    });
  } else {
    livros.splice(livroRemovido, 1);
    fs.writeFile("./dados/biblioteca.json", JSON.stringify(livros, null, 2));
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
