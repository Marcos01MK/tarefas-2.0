const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);
let produtoId;

describe('Recurso /produtos', () => {
  it('deve criar um produto com POST /produtos e retornar 201', async () => {
    const response = await request.post('/produtos').send({ nome: 'Laranja', preco: 10.0 });
    expect(response.status).toBe(201);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('_id');
    expect(response.body.nome).toBe('Laranja');
    expect(response.body.preco).toBe(10.0);
    produtoId = response.body._id;
  });

  it('deve retornar 422 para POST /produtos sem JSON', async () => {
    const response = await request.post('/produtos').send({});
    expect(response.status).toBe(422);
    expect(response.type).toBe('application/json');
    expect(response.body.msg).toBe('Nome e preço do produto são obrigatórios');
  });

  it('deve listar produtos com GET /produtos e retornar 200', async () => {
    const response = await request.get('/produtos');
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('deve buscar produto por ID com GET /produtos/:id e retornar 200', async () => {
    const response = await request.get(`/produtos/${produtoId}`);
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('_id');
    expect(response.body.nome).toBe('Laranja');
    expect(response.body.preco).toBe(10.0);
  });

  it('deve retornar 400 para GET /produtos/0 (parâmetro inválido)', async () => {
    const response = await request.get('/produtos/0');
    expect(response.status).toBe(400);
    expect(response.type).toBe('application/json');
    expect(response.body.msg).toBe('Parâmetro inválido');
  });

  it('deve retornar 404 para GET /produtos/000000000000000000000000 (não encontrado)', async () => {
    const response = await request.get('/produtos/000000000000000000000000');
    expect(response.status).toBe(404);
    expect(response.type).toBe('application/json');
    expect(response.body.msg).toBe('Produto não encontrado');
  });

  it('deve atualizar produto com PUT /produtos/:id e retornar 200', async () => {
    const response = await request.put(`/produtos/${produtoId}`).send({ nome: 'Laranja Pera', preco: 18.00 });
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('_id');
    expect(response.body.nome).toBe('Laranja Pera');
    expect(response.body.preco).toBe(18.00);
  });

  it('deve retornar 422 para PUT /produtos/:id sem JSON', async () => {
    const response = await request.put(`/produtos/${produtoId}`).send({});
    expect(response.status).toBe(422);
    expect(response.type).toBe('application/json');
    expect(response.body.msg).toBe('Nome e preço do produto são obrigatórios');
  });

  it('deve retornar 400 para PUT /produtos/0 (parâmetro inválido)', async () => {
    const response = await request.put('/produtos/0').send({ nome: 'Teste', preco: 1.0 });
    expect(response.status).toBe(400);
    expect(response.type).toBe('application/json');
    expect(response.body.msg).toBe('Parâmetro inválido');
  });

  it('deve retornar 404 para PUT /produtos/000000000000000000000000 (não encontrado)', async () => {
    const response = await request.put('/produtos/000000000000000000000000').send({ nome: 'Teste', preco: 1.0 });
    expect(response.status).toBe(404);
    expect(response.type).toBe('application/json');
    expect(response.body.msg).toBe('Produto não encontrado');
  });

  it('deve deletar produto com DELETE /produtos/:id e retornar 204', async () => {
    const response = await request.delete(`/produtos/${produtoId}`);
    expect(response.status).toBe(204);
    expect(response.text).toBe('');
  });

  it('deve retornar 400 para DELETE /produtos/0 (parâmetro inválido)', async () => {
    const response = await request.delete('/produtos/0');
    expect(response.status).toBe(400);
    expect(response.type).toBe('application/json');
    expect(response.body.msg).toBe('Parâmetro inválido');
  });

  it('deve retornar 404 para DELETE /produtos/:id (já deletado)', async () => {
    const response = await request.delete(`/produtos/${produtoId}`);
    expect(response.status).toBe(404);
    expect(response.type).toBe('application/json');
    expect(response.body.msg).toBe('Produto não encontrado');
  });
});