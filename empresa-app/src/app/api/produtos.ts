import prisma from "../../prisma/prisma-client";

export default async function handler(req, res) {
  const { method, body, query } = req;

  try {
    switch (method) {
      case "POST": // Create
        const novoProduto = await prisma.produto.create({
          data: {
            nome_produto: body.nome_produto,
            categoria_id: body.categoria_id,
            preco: body.preco,
            quantidade_estoque: body.quantidade_estoque,
            fornecedor_id: body.fornecedor_id,
          },
        });
        res.status(201).json(novoProduto);
        break;

      case "GET": // Read
        if (query.id) {
          const produto = await prisma.produto.findUnique({
            where: { id_produto: parseInt(query.id) },
          });
          res.status(200).json(produto);
        } else {
          const produtos = await prisma.produto.findMany();
          res.status(200).json(produtos);
        }
        break;

      case "PUT": // Update
        const produtoAtualizado = await prisma.produto.update({
          where: { id_produto: parseInt(query.id) },
          data: {
            nome_produto: body.nome_produto,
            categoria_id: body.categoria_id,
            preco: body.preco,
            quantidade_estoque: body.quantidade_estoque,
            fornecedor_id: body.fornecedor_id,
          },
        });
        res.status(200).json(produtoAtualizado);
        break;

      case "DELETE": // Delete
        await prisma.produto.delete({
          where: { id_produto: parseInt(query.id) },
        });
        res.status(204).end();
        break;

      default:
        res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
        res.status(405).end(`Método ${method} não permitido`);
        break;
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
