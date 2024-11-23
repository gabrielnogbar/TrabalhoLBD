const estoquistasRoutes = require('./api/estoquistas');
const produtosRoutes = require('./api/produtos');
const movimentacoesRoutes = require('./api/movimentacoes');
const fornecedoresRoutes = require('./api/fornecedores');
const pedidosRoutes = require('./api/pedidos');

app.use("/api/categoria", require("./api/categoria"));
app.use("/api/produto", require("./api/produto"));
app.use("/api/movimentacao_estoque", require("./api/movimentacao_estoque"));
app.use("/api/detalhes_produto", require("./api/detalhes_produto"));
app.use("/api/estoquista", require("./api/estoquista"));
app.use("/api/fornecedor", require("./api/fornecedor"));
app.use("/api/pedido_reposicao", require("./api/pedido_reposicao"));
