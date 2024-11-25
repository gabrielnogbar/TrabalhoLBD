import { NextResponse } from 'next/server';
import prisma from '../../lib/PrismaClient';

/**
 * @swagger
 * tags:
 *   name: MovimentacoesEstoque
 *   description: API para gerenciar movimentações de estoque
 */

/**
 * @swagger
 * /api/movimentacao_estoque:
 *   get:
 *     summary: Retorna todas as movimentações de estoque
 *     tags: [MovimentacoesEstoque]
 *     responses:
 *       200:
 *         description: Lista de movimentações de estoque
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MovimentacaoEstoque'
 *   post:
 *     summary: Cria uma nova movimentação de estoque
 *     tags: [MovimentacoesEstoque]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovimentacaoEstoque'
 *     responses:
 *       201:
 *         description: Movimentação de estoque criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MovimentacaoEstoque'
 */

/**
 * @swagger
 * /api/movimentacao_estoque/{id}:
 *   get:
 *     summary: Retorna uma movimentação de estoque pelo ID
 *     tags: [MovimentacoesEstoque]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da movimentação de estoque
 *     responses:
 *       200:
 *         description: Movimentação de estoque encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MovimentacaoEstoque'
 *       404:
 *         description: Movimentação de estoque não encontrada
 *   put:
 *     summary: Atualiza uma movimentação de estoque pelo ID
 *     tags: [MovimentacoesEstoque]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da movimentação de estoque
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovimentacaoEstoque'
 *     responses:
 *       200:
 *         description: Movimentação de estoque atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MovimentacaoEstoque'
 *       404:
 *         description: Movimentação de estoque não encontrada
 *   delete:
 *     summary: Deleta uma movimentação de estoque pelo ID
 *     tags: [MovimentacoesEstoque]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da movimentação de estoque
 *     responses:
 *       204:
 *         description: Movimentação de estoque deletada com sucesso
 *       404:
 *         description: Movimentação de estoque não encontrada
 */

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    if (id) {
      const movimentacao = await prisma.movimentacaoEstoque.findUnique({
        where: { id_movimentacao: parseInt(id) },
      });
      return NextResponse.json(movimentacao);
    } else {
      const movimentacoes = await prisma.movimentacaoEstoque.findMany();
      return NextResponse.json(movimentacoes);
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  const body = await req.json();

  try {
    const novaMovimentacao = await prisma.movimentacaoEstoque.create({
      data: {
        estoquista_id: body.estoquista_id,
        produto_id: body.produto_id,
        tipo: body.tipo,
        quantidade: body.quantidade,
        data_hora: body.data_hora,
      },
    });
    return NextResponse.json(novaMovimentacao, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const body = await req.json();

  try {
    const movimentacaoAtualizada = await prisma.movimentacaoEstoque.update({
      where: { id_movimentacao: parseInt(id) },
      data: {
        estoquista_id: body.estoquista_id,
        produto_id: body.produto_id,
        tipo: body.tipo,
        quantidade: body.quantidade,
        data_hora: body.data_hora,
      },
    });
    return NextResponse.json(movimentacaoAtualizada);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    await prisma.movimentacaoEstoque.delete({
      where: { id_movimentacao: parseInt(id) },
    });
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}