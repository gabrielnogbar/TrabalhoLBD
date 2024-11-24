import prisma from "../../prisma/prisma-client";

export default async function handler(req, res) {
  const { method, body, query } = req;

  try {
    switch (method) {
      case "POST": // Create
        const novaMovimentacao = await prisma.movimentacaoEstoque.create({
          data: {
            estoquista_id: body.estoquista_id,
            produto_id: body.produto_id,
            tipo: body.tipo,
            quantidade: body.quantidade,
            data_hora: body.data_hora,
          },
        });
        res.status(201).json(novaMovimentacao);
        break;

      case "GET": // Read
        if (query.id) {
          const movimentacao = await prisma.movimentacaoEstoque.findUnique({
            where: { id_movimentacao: parseInt(query.id) },
          });
          res.status(200).json(movimentacao);
        } else {
          const movimentacoes = await prisma.movimentacaoEstoque.findMany();
          res.status(200).json(movimentacoes);
        }
        break;

      case "PUT": // Update
        const movimentacaoAtualizada = await prisma.movimentacaoEstoque.update({
          where: { id_movimentacao: parseInt(query.id) },
          data: {
            estoquista_id: body.estoquista_id,
            produto_id: body.produto_id,
            tipo: body.tipo,
            quantidade: body.quantidade,
            data_hora: body.data_hora,
          },
        });
        res.status(200).json(movimentacaoAtualizada);
        break;

      case "DELETE": // Delete
        await prisma.movimentacaoEstoque.delete({
          where: { id_movimentacao: parseInt(query.id) },
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