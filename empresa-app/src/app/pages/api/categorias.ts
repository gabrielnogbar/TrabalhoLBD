import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * @swagger
 * tags:
 *   name: Categorias
 *   description: API para gerenciar categorias
 */

/**
 * @swagger
 * /api/categoria:
 *   get:
 *     summary: Retorna todas as categorias
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: Lista de categorias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categoria'
 *   post:
 *     summary: Cria uma nova categoria
 *     tags: [Categorias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Categoria'
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 */
export default async function handler(req, res) {
  const { method, body, query } = req;

  try {
    switch (method) {
      case "POST": // Create
        const novaCategoria = await prisma.categoria.create({
          data: { nome_categoria: body.nome_categoria },
        });
        res.status(201).json(novaCategoria);
        break;

      case "GET": // Read
        if (query.id) {
          const categoria = await prisma.categoria.findUnique({
            where: { id_categoria: parseInt(query.id) },
          });
          res.status(200).json(categoria);
        } else {
          const categorias = await prisma.categoria.findMany();
          res.status(200).json(categorias);
        }
        break;

      case "PUT": // Update
        const categoriaAtualizada = await prisma.categoria.update({
          where: { id_categoria: parseInt(query.id) },
          data: { nome_categoria: body.nome_categoria },
        });
        res.status(200).json(categoriaAtualizada);
        break;

      case "DELETE": // Delete
        await prisma.categoria.delete({
          where: { id_categoria: parseInt(query.id) },
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