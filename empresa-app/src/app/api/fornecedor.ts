import prisma from "../../prisma/prisma-client";

export default async function handler(req, res) {
  const { method, body, query } = req;

  try {
    switch (method) {
      case "POST": // Create
        const novoFornecedor = await prisma.fornecedor.create({
          data: {
            nome_fornecedor: body.nome_fornecedor,
            endereco: body.endereco,
            telefone: body.telefone,
          },
        });
        res.status(201).json(novoFornecedor);
        break;

      case "GET": // Read
        if (query.id) {
          const fornecedor = await prisma.fornecedor.findUnique({
            where: { id_fornecedor: parseInt(query.id) },
          });
          res.status(200).json(fornecedor);
        } else {
          const fornecedores = await prisma.fornecedor.findMany();
          res.status(200).json(fornecedores);
        }
        break;

      case "PUT": // Update
        const fornecedorAtualizado = await prisma.fornecedor.update({
          where: { id_fornecedor: parseInt(query.id) },
          data: {
            nome_fornecedor: body.nome_fornecedor,
            endereco: body.endereco,
            telefone: body.telefone,
          },
        });
        res.status(200).json(fornecedorAtualizado);
        break;

      case "DELETE": // Delete
        await prisma.fornecedor.delete({
          where: { id_fornecedor: parseInt(query.id) },
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