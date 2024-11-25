import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';
import swaggerSpec from '../lib/swagger';

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html');
    res.send(swaggerUi.generateHTML(swaggerSpec));
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestão de Estoque',
      version: '1.0.0',
      description: 'API para gerenciar categorias, fornecedores, produtos, estoquistas, movimentações de estoque, pedidos de reposição e detalhes de produtos',
    },
    components: {
      schemas: {
        Categoria: {
          type: 'object',
          properties: {
            id_categoria: {
              type: 'integer',
              description: 'ID da categoria',
            },
            nome_categoria: {
              type: 'string',
              description: 'Nome da categoria',
            },
          },
        },
        Fornecedor: {
          type: 'object',
          properties: {
            id_fornecedor: {
              type: 'integer',
              description: 'ID do fornecedor',
            },
            nome_fornecedor: {
              type: 'string',
              description: 'Nome do fornecedor',
            },
            endereco: {
              type: 'string',
              description: 'Endereço do fornecedor',
            },
            telefone: {
              type: 'string',
              description: 'Telefone do fornecedor',
            },
          },
        },
        Produto: {
          type: 'object',
          properties: {
            id_produto: {
              type: 'integer',
              description: 'ID do produto',
            },
            nome_produto: {
              type: 'string',
              description: 'Nome do produto',
            },
            categoria_id: {
              type: 'integer',
              description: 'ID da categoria',
            },
            preco: {
              type: 'number',
              description: 'Preço do produto',
            },
            quantidade_estoque: {
              type: 'integer',
              description: 'Quantidade em estoque',
            },
            fornecedor_id: {
              type: 'integer',
              description: 'ID do fornecedor',
            },
          },
        },
        Estoquista: {
          type: 'object',
          properties: {
            id_estoquista: {
              type: 'integer',
              description: 'ID do estoquista',
            },
            nome_estoquista: {
              type: 'string',
              description: 'Nome do estoquista',
            },
            email_estoquista: {
              type: 'string',
              description: 'Email do estoquista',
            },
          },
        },
        MovimentacaoEstoque: {
          type: 'object',
          properties: {
            id_movimentacao: {
              type: 'integer',
              description: 'ID da movimentação',
            },
            estoquista_id: {
              type: 'integer',
              description: 'ID do estoquista',
            },
            produto_id: {
              type: 'integer',
              description: 'ID do produto',
            },
            tipo: {
              type: 'string',
              description: 'Tipo de movimentação',
            },
            quantidade: {
              type: 'integer',
              description: 'Quantidade movimentada',
            },
            data_hora: {
              type: 'string',
              format: 'date-time',
              description: 'Data e hora da movimentação',
            },
          },
        },
        PedidoReposicao: {
          type: 'object',
          properties: {
            id_pedido: {
              type: 'integer',
              description: 'ID do pedido de reposição',
            },
            estoquista_id: {
              type: 'integer',
              description: 'ID do estoquista',
            },
            produto_id: {
              type: 'integer',
              description: 'ID do produto',
            },
            quantidade: {
              type: 'integer',
              description: 'Quantidade solicitada',
            },
            data_criacao: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação do pedido',
            },
          },
        },
        DetalhesProduto: {
          type: 'object',
          properties: {
            id_detalhes_produto: {
              type: 'integer',
              description: 'ID dos detalhes do produto',
            },
            descricao: {
              type: 'string',
              description: 'Descrição do produto',
            },
            fabricante: {
              type: 'string',
              description: 'Fabricante do produto',
            },
            data_validade: {
              type: 'string',
              format: 'date-time',
              description: 'Data de validade do produto',
            },
            data_aquisicao: {
              type: 'string',
              format: 'date-time',
              description: 'Data de aquisição do produto',
            },
          },
        },
      },
    },
  },
  apis: ['./src/app/api/**/*.ts'], // Caminho para os arquivos de API
};

const swaggerSpec = swaggerJSDoc(options);

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;