const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

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
    const { interesse1, interesse2, interesse3, interesse4, interesse5, interesse6, interesse7, interesse8, interesse9, experiencia, usuario } = req.body;
    try {
        const usuarioNovo = await prisma.preferencia.create({
            data: {
                areaDeInteresse1: interesse1 || null,
                areaDeInteresse2: interesse2 || null,
                areaDeInteresse3: interesse3 || null,
                areaDeInteresse4: interesse4 || null,
                areaDeInteresse5: interesse5 || null,
                areaDeInteresse6: interesse6 || null,
                areaDeInteresse7: interesse7 || null,
                areaDeInteresse8: interesse8 || null,
                areaDeInteresse9: interesse9 || null,
                nivelDeExperiencia: experiencia,
                idUsuario: usuario
            }
        });

        res.json(usuarioNovo);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/usuario', async (req, res) => {
    const { id } = req.body;
    try {
        const usuario = await prisma.user.findUnique({
            where: {
                id: id
            }
        });

        res.status(200).json({ nomeUsuario: usuario.nome });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/h', async (req, res) => {
    try {
        const { id } = req.body;
        const preferencias = await prisma.preferencia.findFirst({
            where: {
                idUsuario: id
            }
        });

        const condicao = [];

        if (preferencias.areaDeInteresse1) {
            condicao.push({ categoria: preferencias.areaDeInteresse1 });
        }
        if (preferencias.areaDeInteresse2) {
            condicao.push({ categoria: preferencias.areaDeInteresse2 });
        }
        if (preferencias.areaDeInteresse3) {
            condicao.push({ categoria: preferencias.areaDeInteresse3 });
        }
        if (preferencias.areaDeInteresse4) {
            condicao.push({ categoria: preferencias.areaDeInteresse4 });
        }
        if (preferencias.areaDeInteresse5) {
            condicao.push({ categoria: preferencias.areaDeInteresse5 });
        }
        if (preferencias.areaDeInteresse6) {
            condicao.push({ categoria: preferencias.areaDeInteresse6 });
        }
        if (preferencias.areaDeInteresse7) {
            condicao.push({ categoria: preferencias.areaDeInteresse7 });
        }
        if (preferencias.areaDeInteresse8) {
            condicao.push({ categoria: preferencias.areaDeInteresse8 });
        }
        if (preferencias.areaDeInteresse9) {
            condicao.push({ categoria: preferencias.areaDeInteresse9 });
        }

        const cursos = await prisma.cursos.findMany({
            where: {
                OR: condicao.length > 0 ? condicao : undefined
            }
        });

        res.json(cursos);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


app.post('/registroPergunta', async (req, res) => {
    const prisma = new PrismaClient();
    const { usuario, titulo, descricao, cursoRelacionado } = req.body;
    const likes = 0;
    console.log(usuario)
    try {
        const perguntaNova = await prisma.pergunta.create({
            data: {
                idUsuario: usuario,
                titulo: titulo,
                descricao: descricao,
                cursoRelacionado: cursoRelacionado,
                likes: likes,
            }
        });

        res.json(perguntaNova);

    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});


app.get('/cursos', async (req, res) => {
    const prisma = new PrismaClient();
    try {
        const cursos = await prisma.cursos.findMany();
        res.json(cursos);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});


app.post('/curso', async (req, res) => {
    const prisma = new PrismaClient();
    const { id } = req.body;
    const idCurso = parseInt(id)
    try {
        const curso = await prisma.cursos.findUnique({
            where: {
                id: idCurso
            }
        })
        res.json(curso);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/perguntas', async (req, res) => {
    const prisma = new PrismaClient();
    try {
        const perguntas = await prisma.pergunta.findMany(
            {
                include: {
                    comentarios: true
                }
            }

        );

        res.json(perguntas);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});


app.post('/pergunta', async (req, res) => {
    const prisma = new PrismaClient();
    const { id } = req.body;
    const idPergunta = parseInt(id)
    try {
        const pergunta = await prisma.pergunta.findUnique({
            where: {
                id: idPergunta
            },
            include: {
                comentarios: {

                },
            },
        })
        res.json(pergunta);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/comentario', async (req, res) => {
    const prisma = new PrismaClient();
    const { descricao, id } = req.body;
    const idPergunta = parseInt(id);

    try {
        const pergunta = await prisma.pergunta.findUnique({
            where: { id: idPergunta },
        });

        if (!pergunta) {
            return res.status(404).json({ error: 'Pergunta não encontrada' });
        }

        const comentario = await prisma.comentario.create({
            data: {
                descricao,
                pergunta: { connect: { id: pergunta.id } },
            },
        });

        return res.status(201).json(comentario);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
});


app.post('/like', async (req, res) => {
    const { id, idUsuario } = req.body;
    const idPergunta = parseInt(id);
    const idUsuarioInt = parseInt(idUsuario);

    try {
        const pergunta = await prisma.pergunta.findUnique({
            where: { id: idPergunta }
        });
        const usuario = await prisma.user.findUnique({
            where:
                { id: idUsuarioInt }

        });

        if (!pergunta) {
            return res.status(404).json({ error: 'Pergunta não encontrada' });
        }

        const existingLike = await prisma.like.findFirst({
            where: {
                perguntaId: idPergunta,
                usuarioId: idUsuarioInt,
            },
        });

        if (existingLike) {
            return res.status(400).json({ error: 'Usuário já deu like nesta pergunta' });
        }

        const newLike = await prisma.like.create({
            data: {
                
                perguntaId: idPergunta,
                
                usuarioId: idUsuarioInt
            },
        });

        const updatedPergunta = await prisma.pergunta.update({
            where: { id: idPergunta },
            data: {
                likes: pergunta.likes + 1,
            },
        });

        return res.status(200).json(updatedPergunta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.post('/buscaLike', async (req, res) => {
    const { idUsuario } = req.body;
    const idUsuarioInt = parseInt(idUsuario);


    try {
        const likes = await prisma.like.findMany({
            where: {usuarioId: idUsuarioInt}
            
            
        });

        res.json(likes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.post('/verificaLike', async (req, res) => {
    const { perguntaId, usuarioId } = req.body;

    try {
        const existingLike = await prisma.like.findFirst({
            where: {
                perguntaId: parseInt(perguntaId),
                usuarioId: parseInt(usuarioId),
            },
        });

        res.json({ hasLiked: !!existingLike });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});
