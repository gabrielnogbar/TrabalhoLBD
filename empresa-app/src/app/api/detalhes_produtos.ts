import prisma from "../../prisma/prisma-client";

export default async function handler(req, res) {
  const { method, body, query } = req;

  try {
    switch (method) {
      case "POST": // Create
        const novoDetalhe = await prisma.detalhes_produto.create({
          data: {
            descricao: body.descricao,
            fabricante: body.fabricante,
            data_validade: body.data_validade,
            data_aquisicao: body.data_aquisicao,
          },
        });
        res.status(201).json(novoDetalhe);
        break;

      case "GET": // Read
        if (query.id) {
          const detalhe = await prisma.detalhes_produto.findUnique({
            where: { id_detalhes_produto: parseInt(query.id) },
          });
          res.status(200).json(detalhe);
        } else {
          const detalhes = await prisma.detalhes_produto.findMany();
          res.status(200).json(detalhes);
        }
        break;

      case "PUT": // Update
        const detalheAtualizado = await prisma.detalhes_produto.update({
          where: { id_detalhes_produto: parseInt(query.id) },
          data: {
            descricao: body.descricao,
            fabricante: body.fabricante,
            data_validade: body.data_validade,
            data_aquisicao: body.data_aquisicao,
          },
        });
        res.status(200).json(detalheAtualizado);
        break;

      case "DELETE": // Delete
        await prisma.detalhes_produto.delete({
          where: { id_detalhes_produto: parseInt(query.id) },
        });
        res.status(204).end();
        break;

      default:
        res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
        res.status(405).end(`Método ${method} n
