import { NextResponse } from 'next/server';
import prisma from '../../lib/PrismaClient';

/**
 * @swagger
 * tags:
 *   name: Fornecedores
 *   description: API para gerenciar fornecedores
 */

/**
 * @swagger
 * /api/fornecedor:
 *   get:
 *     summary: Retorna todos os fornecedores
 *     tags: [Fornecedores]
 *     responses:
 *       200:
 *         description: Lista de fornecedores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Fornecedor'
 *   post:
 *     summary: Cria um novo fornecedor
 *     tags: [Fornecedores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Fornecedor'
 *     responses:
 *       201:
 *         description: Fornecedor criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fornecedor'
 */

/**
 * @swagger
 * /api/fornecedor/{id}:
 *   get:
 *     summary: Retorna um fornecedor pelo ID
 *     tags: [Fornecedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do fornecedor
 *     responses:
 *       200:
 *         description: Fornecedor encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fornecedor'
 *       404:
 *         description: Fornecedor não encontrado
 *   put:
 *     summary: Atualiza um fornecedor pelo ID
 *     tags: [Fornecedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do fornecedor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Fornecedor'
 *     responses:
 *       200:
 *         description: Fornecedor atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fornecedor'
 *       404:
 *         description: Fornecedor não encontrado
 *   delete:
 *     summary: Deleta um fornecedor pelo ID
 *     tags: [Fornecedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do fornecedor
 *     responses:
 *       204:
 *         description: Fornecedor deletado com sucesso
 *       404:
 *         description: Fornecedor não encontrado
 */

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    if (id) {
      const fornecedor = await prisma.fornecedor.findUnique({
        where: { id_fornecedor: parseInt(id) },
      });
      return NextResponse.json(fornecedor);
    } else {
      const fornecedores = await prisma.fornecedor.findMany();
      return NextResponse.json(fornecedores);
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  const body = await req.json();

  try {
    const novoFornecedor = await prisma.fornecedor.create({
      data: {
        nome_fornecedor: body.nome_fornecedor,
        endereco: body.endereco,
        telefone: body.telefone,
      },
    });
    return NextResponse.json(novoFornecedor, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const body = await req.json();

  try {
    const fornecedorAtualizado = await prisma.fornecedor.update({
      where: { id_fornecedor: parseInt(id) },
      data: {
        nome_fornecedor: body.nome_fornecedor,
        endereco: body.endereco,
        telefone: body.telefone,
      },
    });
    return NextResponse.json(fornecedorAtualizado);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    await prisma.fornecedor.delete({
      where: { id_fornecedor: parseInt(id) },
    });
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}