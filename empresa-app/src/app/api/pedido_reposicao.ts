import prisma from "../../prisma/prisma-client";

export default async function handler(req, res) {
  const { method, body, query } = req;

  try {
    switch (method) {
      case "POST": // Create
        const novoPedido = await prisma.pedidoReposicao.create({
          data: {
            estoquista_id: body.estoquista_id,
            produto_id: body.produto_id,
            quantidade: body.quantidade,
            data_criacao: body.data_criacao,
          },
        });
        res.status(201).json(novoPedido);
        break;

      case "GET": // Read
        if (query.id) {
          const pedido = await prisma.pedidoReposicao.findUnique({
            where: { id_pedido: parseInt(query.id) },
          });
          res.status(200).json(pedido);
        } else {
          const pedidos = await prisma.pedidoReposicao.findMany();
          res.status(200).json(pedidos);
        }
        break;

      case "PUT": // Update
        const pedidoAtualizado = await prisma.pedidoReposicao.update({
          where: { id_pedido: parseInt(query.id) },
          data: {
            estoquista_id: body.estoquista_id,
            produto_id: body.produto_id,
            quantidade: body.quantidade,
            data_criacao: body.data_criacao,
          },
        });
        res.status(200).json(pedidoAtualizado);
        break;

      case "DELETE": // Delete
        await prisma.pedidoReposicao.delete({
          where: { id_pedido: parseInt(query.id) },
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