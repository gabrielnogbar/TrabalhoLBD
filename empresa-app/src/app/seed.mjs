import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Criação de categorias
  await prisma.categoria.createMany({
    data: [
      { nome: 'Eletrônicos' },
      { nome: 'Roupas' },
      { nome: 'Alimentos' }
    ]
  });

  // Criação de fornecedores
  await prisma.fornecedor.createMany({
    data: [
      { nome: 'Fornecedor A', endereco: 'Endereço A', contato: 'Contato A' },
      { nome: 'Fornecedor B', endereco: 'Endereço B', contato: 'Contato B' }
    ]
  });

  // Criação de produtos
  await prisma.produto.createMany({
    data: [
      { nome: 'Produto 1', categoria_id: 1, preco: 100.0, quantidade_estoque: 50, fornecedor_id: 1, data_aquisicao: new Date(), data_validade: new Date() },
      { nome: 'Produto 2', categoria_id: 2, preco: 50.0, quantidade_estoque: 100, fornecedor_id: 2, data_aquisicao: new Date(), data_validade: new Date() }
    ]
  });

  // Criação de estoquistas
  await prisma.estoquista.createMany({
    data: [
      { nome: 'Estoquista 1', tipo: 'Tipo 1', email: 'estoquista1@example.com' },
      { nome: 'Estoquista 2', tipo: 'Tipo 2', email: 'estoquista2@example.com' }
    ]
  });

  // Criação de movimentações de estoque
  await prisma.movimentacao_estoque.createMany({
    data: [
      { estoquista_id: 1, produto_id: 1, tipo: 'Entrada', quantidade: 10, data_hora: new Date() },
      { estoquista_id: 2, produto_id: 2, tipo: 'Saída', quantidade: 5, data_hora: new Date() }
    ]
  });

  // Criação de pedidos de reposição
  await prisma.pedido_reposicao.createMany({
    data: [
      { estoquista_id: 1, produto_id: 1, quantidade: 20, data_criacao: new Date() },
      { estoquista_id: 2, produto_id: 2, quantidade: 30, data_criacao: new Date() }
    ]
  });

  // Criação de detalhes de produtos
  await prisma.detalhes_produto.createMany({
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