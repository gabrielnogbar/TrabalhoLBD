import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Criação de categorias
  await prisma.categoria.createMany({
    data: [
      { nome_categoria: 'Eletrônicos' },
      { nome_categoria: 'Roupas' },
      { nome_categoria: 'Alimentos' }
    ]
  });

  // Criação de fornecedores
  await prisma.fornecedor.createMany({
    data: [
      { nome_fornecedor: 'Fornecedor A', endereco: 'Endereço A', telefone: 'Contato A' },
      { nome_fornecedor: 'Fornecedor B', endereco: 'Endereço B', telefone: 'Contato B' }
    ]
  });

  // Criação de produtos
  await prisma.produto.createMany({
    data: [
      { nome_produto: 'Produto 1', categoria_id: 1, preco: 100.0, quantidade_estoque: 50, fornecedor_id: 1 },
      { nome_produto: 'Produto 2', categoria_id: 2, preco: 50.0, quantidade_estoque: 100, fornecedor_id: 2 }
    ]
  });

  // Criação de estoquistas
  await prisma.estoquista.createMany({
    data: [
      { nome_estoquista: 'Estoquista 1', email_estoquista: 'estoquista1@example.com' },
      { nome_estoquista: 'Estoquista 2', email_estoquista: 'estoquista2@example.com' }
    ]
  });

  // Criação de movimentações de estoque
  await prisma.movimentacaoEstoque.createMany({
    data: [
      { estoquista_id: 1, produto_id: 1, tipo: 'Entrada', quantidade: 10, data_hora: new Date() },
      { estoquista_id: 2, produto_id: 2, tipo: 'Saída', quantidade: 5, data_hora: new Date() }
    ]
  });

  // Criação de pedidos de reposição
  await prisma.pedidoReposicao.createMany({
    data: [
      { estoquista_id: 1, produto_id: 1, quantidade: 20, data_criacao: new Date() },
      { estoquista_id: 2, produto_id: 2, quantidade: 30, data_criacao: new Date() }
    ]
  });

  // Criação de detalhes de produtos
  await prisma.detalhesProduto.createMany({
    data: [
      { descricao: 'Detalhe 1', fabricante: 'Fabricante 1', data_validade: new Date(), data_aquisicao: new Date() },
      { descricao: 'Detalhe 2', fabricante: 'Fabricante 2', data_validade: new Date(), data_aquisicao: new Date() }
    ]
  });

  console.log('Dados inseridos com sucesso!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });