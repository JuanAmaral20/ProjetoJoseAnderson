import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

//Login usuário
app.post("/session", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
      password: req.body.password,
    },
  });

  res.status(200).json(!!user);
});

//Adicionar usuário
app.post("/users", async (req, res) => {
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    },
  });

  res.status(201).json(req.body);
});

// Recuperar usuário por email
app.post("/users/filterEmail", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  res.status(200).json(user);
});

// Recuperar senha
app.put("/users/forgot/:id", async (req, res) => {
  const id = req.params.id;
  const password = req.body.password;

  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      password,
    },
  });

  res.status(200).json(user);
});

//Listar usuários
app.get("/users", async (req, res) => {
  const page = Number(req.query.page);
  const perPage = 5;

  const users = await prisma.user.findMany({
    skip: (page - 1) * perPage,
    take: perPage,
  });
  const quantityDatabase = await prisma.user.count();

  const quantityPage = Math.ceil(quantityDatabase / 5);

  res.status(200).json({
    users,
    quantityPage,
  });
});

//Buscar detalhes usuário
app.get("/users/:id", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json(user);
});

//Atualizar usuário
app.put("/users/:id", async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    },
  });

  res.status(201).json(req.body);
});

//Deletar usuário
app.delete("/users/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ message: "Usuário deletado com Sucesso!" });
});

app.listen(3000);
/*
  1) Tipo de Rota / Método HTTP
  2) Endereço

  Req = Requisição
  Res = Resposta

  Objetivo: Criar API de Usuários

    - Criar um usuário
    - Listar todos os usuários
    - Atualizar um usuário
    - Deletar um usuário

    pabloah09
    NH9sSZWCKuZmC9QM
*/
