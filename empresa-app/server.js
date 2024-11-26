
const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
//const estoquistasRoutes = require('./src/app/pages/api/estoquista');
//const produtosRoutes = require('./src/app/pages/api/produtos.ts');
//const movimentacoesRoutes = require('./src/app/pages/api/movimentacao_estoque');
//const fornecedoresRoutes = require('./src/app/pages/api/fornecedor');
//const pedidosRoutes = require('./src/app/pages/api/pedido_reposicao');
//const categorias = require('./src/app/pages/api/categorias');

app.use(express.json());
app.use("/api/categoria", require("./src/app/pages/api/categorias"));
app.use("/api/produto", require("./src/app/pages/api/produtos"));
app.use("/api/movimentacao_estoque", require("./src/app/pages/api/movimentacao_estoque"));
app.use("/api/detalhes_produto", require("./src/app/pages/api/detalhes_produtos"));
//app.use("/api/estoquista", require("./src/app/pages/api/estoquista"));
app.use("/api/fornecedor", require("./src/app/pages/api/fornecedor"));
app.use("/api/pedido_reposicao", require("./src/app/pages/api/pedido_reposicao"));

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
