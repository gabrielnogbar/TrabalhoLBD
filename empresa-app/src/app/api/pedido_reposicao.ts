import { NextResponse } from 'next/server';
import prisma from '../../lib/PrismaClient';

/**
 * @swagger
 * tags:
 *   name: PedidosReposicao
 *   description: API para gerenciar pedidos de reposição
 */

/**
 * @swagger
 * /api/pedido_reposicao:
 *   get:
 *     summary: Retorna todos os pedidos de reposição
 *     tags: [PedidosReposicao]
 *     responses:
 *       200:
 *         description: Lista de pedidos de reposição
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PedidoReposicao'
 *   post:
 *     summary: Cria um novo pedido de reposição
 *     tags: [PedidosReposicao]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PedidoReposicao'
 *     responses:
 *       201:
 *         description: Pedido de reposição criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PedidoReposicao'
 */

/**
 * @swagger
 * /api/pedido_reposicao/{id}:
 *   get:
 *     summary: Retorna um pedido de reposição pelo ID
 *     tags: [PedidosReposicao]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pedido de reposição
 *     responses:
 *       200:
 *         description: Pedido de reposição encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PedidoReposicao'
 *       404:
 *         description: Pedido de reposição não encontrado
 *   put:
 *     summary: Atualiza um pedido de reposição pelo ID
 *     tags: [PedidosReposicao]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pedido de reposição
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PedidoReposicao'
 *     responses:
 *       200:
 *         description: Pedido de reposição atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PedidoReposicao'
 *       404:
 *         description: Pedido de reposição não encontrado
 *   delete:
 *     summary: Deleta um pedido de reposição pelo ID
 *     tags: [PedidosReposicao]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pedido de reposição
 *     responses:
 *       204:
 *         description: Pedido de reposição deletado com sucesso
 *       404:
 *         description: Pedido de reposição não encontrado
 */

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    if (id) {
      const pedido = await prisma.pedidoReposicao.findUnique({
        where: { id_pedido: parseInt(id) },
      });
      return NextResponse.json(pedido);
    } else {
      const pedidos = await prisma.pedidoReposicao.findMany();
      return NextResponse.json(pedidos);
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  const body = await req.json();

  try {
    const novoPedido = await prisma.pedidoReposicao.create({
      data: {
        estoquista_id: body.estoquista_id,
        produto_id: body.produto_id,
        quantidade: body.quantidade,
        data_criacao: body.data_criacao,
      },
    });
    return NextResponse.json(novoPedido, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const body = await req.json();

  try {
    const pedidoAtualizado = await prisma.pedidoReposicao.update({
      where: { id_pedido: parseInt(id) },
      data: {
        estoquista_id: body.estoquista_id,
        produto_id: body.produto_id,
        quantidade: body.quantidade,
        data_criacao: body.data_criacao,
      },
    });
    return NextResponse.json(pedidoAtualizado);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    await prisma.pedidoReposicao.delete({
      where: { id_pedido: parseInt(id) },
    });
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}