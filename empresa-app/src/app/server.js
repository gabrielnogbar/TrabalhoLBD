const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

/** CRUD Estoquista */
app.get("/estoquistas", async (req, res) => {
  const estoquistas = await prisma.estoquista.findMany();
  res.json(estoquistas);
});

app.post("/estoquistas", async (req, res) => {
  const { nome, tipo, email } = req.body;
  const estoquista = await prisma.estoquista.create({ data: { nome, tipo, email } });
  res.json(estoquista);
});

app.put("/estoquistas/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, tipo, email } = req.body;
  const estoquista = await prisma.estoquista.update({
    where: { id: Number(id) },
    data: { nome, tipo, email },
  });
  res.json(estoquista);
});

app.delete("/estoquistas/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.estoquista.delete({ where: { id: Number(id) } });
  res.send("Estoquista deletado com sucesso.");
});

/** CRUD Produto */
app.get("/produtos", async (req, res) => {
  const produtos = await prisma.produto.findMany();
  res.json(produtos);
});

app.post("/produtos", async (req, res) => {
  const { nome, preco, quantidadeEstoque, dataAquisicao, dataValidade, categoriaId, fornecedorId } = req.body;
  const produto = await prisma.produto.create({
    data: { nome, preco, quantidadeEstoque, dataAquisicao, dataValidade, categoriaId, fornecedorId },
  });
  res.json(produto);
});

app.put("/produtos/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, preco, quantidadeEstoque, dataAquisicao, dataValidade, categoriaId, fornecedorId } = req.body;
  const produto = await prisma.produto.update({
    where: { id: Number(id) },
    data: { nome, preco, quantidadeEstoque, dataAquisicao, dataValidade, categoriaId, fornecedorId },
  });
  res.json(produto);
});

app.delete("/produtos/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.produto.delete({ where: { id: Number(id) } });
  res.send("Produto deletado com sucesso.");
});

/** CRUD Fornecedor */
app.get("/fornecedores", async (req, res) => {
  const fornecedores = await prisma.fornecedor.findMany();
  res.json(fornecedores);
});

app.post("/fornecedores", async (req, res) => {
  const { nome, endereco, contato, produtosFornecidos } = req.body;
  const fornecedor = await prisma.fornecedor.create({
    data: { nome, endereco, contato, produtosFornecidos },
  });
  res.json(fornecedor);
});

app.put("/fornecedores/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, endereco, contato, produtosFornecidos } = req.body;
  const fornecedor = await prisma.fornecedor.update({
    where: { id: Number(id) },
    data: { nome, endereco, contato, produtosFornecidos },
  });
  res.json(fornecedor);
});

app.delete("/fornecedores/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.fornecedor.delete({ where: { id: Number(id) } });
  res.send("Fornecedor deletado com sucesso.");
});

/** CRUD Categoria */
app.get("/categorias", async (req, res) => {
  const categorias = await prisma.categoria.findMany();
  res.json(categorias);
});

app.post("/categorias", async (req, res) => {
  const { nome } = req.body;
  const categoria = await prisma.categoria.create({ data: { nome } });
  res.json(categoria);
});

app.put("/categorias/:id", async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  const categoria = await prisma.categoria.update({
    where: { id: Number(id) },
    data: { nome },
  });
  res.json(categoria);
});

app.delete("/categorias/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.categoria.delete({ where: { id: Number(id) } });
  res.send("Categoria deletada com sucesso.");
});

/** CRUD Movimentação de Estoque */
app.get("/movimentacoes", async (req, res) => {
  const movimentacoes = await prisma.movimentacaoEstoque.findMany();
  res.json(movimentacoes);
});

app.post("/movimentacoes", async (req, res) => {
  const { tipo, quantidade, dataHora, estoquistaId, produtoId } = req.body;
  const movimentacao = await prisma.movimentacaoEstoque.create({
    data: { tipo, quantidade, dataHora, estoquistaId, produtoId },
  });
  res.json(movimentacao);
});

/** CRUD Pedido de Reposição */
app.get("/pedidos", async (req, res) => {
  const pedidos = await prisma.pedidoReposicao.findMany();
  res.json(pedidos);
});

app.post("/pedidos", async (req, res) => {
  const { quantidade, dataCriacao, produtoId, estoquistaId } = req.body;
  const pedido = await prisma.pedidoReposicao.create({
    data: { quantidade, dataCriacao, produtoId, estoquistaId },
  });
  res.json(pedido);
});

/** Iniciar o Servidor */
app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
