import prisma from "../../prisma/prisma-client";

export default async function handler(req, res) {
  const { method, body, query } = req;

  try {
    switch (method) {
      case "POST": // Create
        const novoEstoquista = await prisma.estoquista.create({
          data: {
            nome_estoquista: body.nome_estoquista,
            email_estoquista: body.email_estoquista,
          },
        });
        res.status(201).json(novoEstoquista);
        break;

      case "GET": // Read
        if (query.id) {
          const estoquista = await prisma.estoquista.findUnique({
            where: { id_estoquista: parseInt(query.id) },
          });
          res.status(200).json(estoquista);
        } else {
          const estoquistas = await prisma.estoquista.findMany();
          res.status(200).json(estoquistas);
        }
        break;

      case "PUT": // Update
        const estoquistaAtualizado = await prisma.estoquista.update({
          where: { id_estoquista: parseInt(query.id) },
          data: {
            nome_estoquista: body.nome_estoquista,
            email_estoquista: body.email_estoquista,
          },
        });
        res.status(200).json(estoquistaAtualizado);
        break;

      case "DELETE": // Delete
        await prisma.estoquista.delete({
          where: { id_estoquista: parseInt(query.id) },
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