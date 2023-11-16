const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());


app.post('/registro', async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        const usuarioExistente = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (usuarioExistente) {
            return res.status(400).send('Email já cadastrado.');
        }

        const usuarioNovo = await prisma.user.create({
            data: {
                nome,
                email,
                senha
            }
        });

        res.json(usuarioNovo);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        const usuario = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!usuario) {
            return res.status(400).json({ message: 'Email não encontrado.' });
        }
        
        if (usuario.senha !== senha) {
            return res.status(401).json({ message: 'Senha incorreta.' });
        }

        res.status(200).json({ idUsuario: usuario.id });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/preferencia', async (req, res) => {
    const { interesse1, interesse2, interesse3, interesse4, experiencia, usuario } = req.body;
    try {
        const usuarioNovo = await prisma.preferencia.create({
            data: {
                areaDeInteresse1: interesse1 || null,
                areaDeInteresse2: interesse2 || null,
                areaDeInteresse3: interesse3 || null,
                areaDeInteresse4: interesse4 || null,
                nivelDeExperiencia: experiencia,
                idUsuario: usuario
            }
        });

        res.json(usuarioNovo);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.post('/registroPergunta', async (req, res) => {
    const prisma = new PrismaClient();

    const { titulo, descricao, cursoRelacionado } = req.body;

    try {
        const perguntaNova = await prisma.pergunta.create({
            data: {
                titulo,
                descricao,
                cursoRelacionado
            }
        });

        res.json(perguntaNova);

    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});