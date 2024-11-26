import { NextResponse } from 'next/server';
import prisma from '../../lib/PrismaClient';

/**
 * @swagger
 * tags:
 *   name: Estoquistas
 *   description: API para gerenciar estoquistas
 */

/**
 * @swagger
 * /api/estoquista:
 *   get:
 *     summary: Retorna todos os estoquistas
 *     tags: [Estoquistas]
 *     responses:
 *       200:
 *         description: Lista de estoquistas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Estoquista'
 *   post:
 *     summary: Cria um novo estoquista
 *     tags: [Estoquistas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Estoquista'
 *     responses:
 *       201:
 *         description: Estoquista criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estoquista'
 */

/**
 * @swagger
 * /api/estoquista/{id}:
 *   get:
 *     summary: Retorna um estoquista pelo ID
 *     tags: [Estoquistas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do estoquista
 *     responses:
 *       200:
 *         description: Estoquista encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estoquista'
 *       404:
 *         description: Estoquista não encontrado
 *   put:
 *     summary: Atualiza um estoquista pelo ID
 *     tags: [Estoquistas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do estoquista
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Estoquista'
 *     responses:
 *       200:
 *         description: Estoquista atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estoquista'
 *       404:
 *         description: Estoquista não encontrado
 *   delete:
 *     summary: Deleta um estoquista pelo ID
 *     tags: [Estoquistas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do estoquista
 *     responses:
 *       204:
 *         description: Estoquista deletado com sucesso
 *       404:
 *         description: Estoquista não encontrado
 */

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    if (id) {
      const estoquista = await prisma.estoquista.findUnique({
        where: { id_estoquista: parseInt(id) },
      });
      return NextResponse.json(estoquista);
    } else {
      const estoquistas = await prisma.estoquista.findMany();
      return NextResponse.json(estoquistas);
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  const body = await req.json();

  try {
    const novoEstoquista = await prisma.estoquista.create({
      data: {
        nome_estoquista: body.nome_estoquista,
        email_estoquista: body.email_estoquista,
      },
    });
    return NextResponse.json(novoEstoquista, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const body = await req.json();

  try {
    const estoquistaAtualizado = await prisma.estoquista.update({
      where: { id_estoquista: parseInt(id) },
      data: {
        nome_estoquista: body.nome_estoquista,
        email_estoquista: body.email_estoquista,
      },
    });
    return NextResponse.json(estoquistaAtualizado);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    await prisma.estoquista.delete({
      where: { id_estoquista: parseInt(id) },
    });
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}