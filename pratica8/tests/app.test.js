const request = require('supertest');
const app = require('../app');

const req = request(app);

let token;

describe('Testes da API', () => {
  it('GET /produtos sem token deve retornar 401', async () => {
    const response = await req.get('/produtos');
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('msg', 'Não autorizado');
  });

  it('GET /produtos com token inválido deve retornar 401', async () => {
    const response = await req.get('/produtos').set('Authorization', '123456789');
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('msg', 'Token inválido');
  });

  it('POST /usuarios/login deve retornar 200 e token', async () => {
    const response = await req.post('/usuarios/login').send({ usuario: 'email@exemplo.com', senha: 'abcd1234' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    token = response.body.token; 
  });

  it('GET /produtos com token válido deve retornar 200', async () => {
    const response = await req.get('/produtos').set('Authorization', token);
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
  });

  it('POST /usuarios/renovar com token válido deve retornar 200 e novo token', async () => {
    const response = await req.post('/usuarios/renovar').set('Authorization', token);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    token = response.body.token;
  });

  it('GET /produtos com novo token deve retornar 200', async () => {
    const response = await req.get('/produtos').set('Authorization', token);
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
  });
});