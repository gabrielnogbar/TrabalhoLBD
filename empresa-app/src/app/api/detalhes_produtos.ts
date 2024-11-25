import { NextResponse } from 'next/server';
import prisma from '../../lib/PrismaClient';

/**
 * @swagger
 * tags:
 *   name: DetalhesProdutos
 *   description: API para gerenciar detalhes dos produtos
 */

/**
 * @swagger
 * /api/detalhes_produto:
 *   get:
 *     summary: Retorna todos os detalhes dos produtos
 *     tags: [DetalhesProdutos]
 *     responses:
 *       200:
 *         description: Lista de detalhes dos produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DetalhesProduto'
 *   post:
 *     summary: Cria um novo detalhe de produto
 *     tags: [DetalhesProdutos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DetalhesProduto'
 *     responses:
 *       201:
 *         description: Detalhe de produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DetalhesProduto'
 */

/**
 * @swagger
 * /api/detalhes_produto/{id}:
 *   get:
 *     summary: Retorna um detalhe de produto pelo ID
 *     tags: [DetalhesProdutos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do detalhe do produto
 *     responses:
 *       200:
 *         description: Detalhe do produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DetalhesProduto'
 *       404:
 *         description: Detalhe do produto não encontrado
 *   put:
 *     summary: Atualiza um detalhe de produto pelo ID
 *     tags: [DetalhesProdutos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do detalhe do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DetalhesProduto'
 *     responses:
 *       200:
 *         description: Detalhe do produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DetalhesProduto'
 *       404:
 *         description: Detalhe do produto não encontrado
 *   delete:
 *     summary: Deleta um detalhe de produto pelo ID
 *     tags: [DetalhesProdutos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do detalhe do produto
 *     responses:
 *       204:
 *         description: Detalhe do produto deletado com sucesso
 *       404:
 *         description: Detalhe do produto não encontrado
 */

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    if (id) {
      const detalhe = await prisma.detalhesProduto.findUnique({
        where: { id_detalhes_produto: parseInt(id) },
      });
      return NextResponse.json(detalhe);
    } else {
      const detalhes = await prisma.detalhesProduto.findMany();
      return NextResponse.json(detalhes);
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  const body = await req.json();

  try {
    const novoDetalhe = await prisma.detalhesProduto.create({
      data: {
        descricao: body.descricao,
        fabricante: body.fabricante,
        data_validade: body.data_validade,
        data_aquisicao: body.data_aquisicao,
      },
    });
    return NextResponse.json(novoDetalhe, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const body = await req.json();

  try {
    const detalheAtualizado = await prisma.detalhesProduto.update({
      where: { id_detalhes_produto: parseInt(id) },
      data: {
        descricao: body.descricao,
        fabricante: body.fabricante,
        data_validade: body.data_validade,
        data_aquisicao: body.data_aquisicao,
      },
    });
    return NextResponse.json(detalheAtualizado);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    await prisma.detalhesProduto.delete({
      where: { id_detalhes_produto: parseInt(id) },
    });
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}