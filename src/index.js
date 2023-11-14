const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const router = require("./routes.js");

const prisma = new PrismaClient();
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use(router);

app.post("/registro", async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const usuarioExistente = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (usuarioExistente) {
      return res.status(400).send("Email já cadastrado.");
    }

    const usuarioNovo = await prisma.user.create({
      data: {
        nome,
        email,
        senha,
      },
    });

    res.json(usuarioNovo);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!usuario) {
      return res.status(400).send("Email não encontrado.");
    }

    if (user.senha !== senha) {
      return res.status(401).send("Senha incorreta.");
    }

    res.status(200).send("Login bem-sucedido.");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.post("/registroPergunta", async (req, res) => {
  const prisma = new PrismaClient();

  const { titulo, descricao, cursoRelacionado } = req.body;

  try {
    const perguntaNova = await prisma.pergunta.create({
      data: {
        titulo,
        descricao,
        cursoRelacionado,
      },
    });

    res.json(perguntaNova);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});
