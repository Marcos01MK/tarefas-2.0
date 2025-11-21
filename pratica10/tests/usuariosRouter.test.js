const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);
let userId;
let token;

describe('POST /usuarios', () => {
  it('deve criar um usuário e retornar 201', async () => {
    const response = await request
      .post('/usuarios')
      .send({ email: 'usuario@email.com', senha: 'abcd1234' })
      .expect(201)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('_id');
    expect(response.body.email).toBe('usuario@email.com');
    userId = response.body._id;
  });

  it('deve retornar 422 para requisição sem JSON', async () => {
    const response = await request
      .post('/usuarios')
      .expect(422)
      .expect('Content-Type', /json/);

    expect(response.body.msg).toBe('Email e Senha são obrigatórios');
  });
});

describe('POST /usuarios/login', () => {
  it('deve logar e retornar 200 com token', async () => {
    const response = await request
      .post('/usuarios/login')
      .send({ usuario: 'usuario@email.com', senha: 'abcd1234' })
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('token');
    token = response.body.token;
  });

  it('deve retornar 401 para credenciais inválidas', async () => {
    const response = await request
      .post('/usuarios/login')
      .expect(401)
      .expect('Content-Type', /json/);

    expect(response.body.msg).toBe('Credenciais inválidas');
  });
});

describe('POST /usuarios/renovar', () => {
  it('deve renovar token e retornar 200', async () => {
    const response = await request
      .post('/usuarios/renovar')
      .set('authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('token');
  });

  it('deve retornar 401 para token inválido', async () => {
    const response = await request
      .post('/usuarios/renovar')
      .set('authorization', 'Bearer 123456789')
      .expect(401)
      .expect('Content-Type', /json/);

    expect(response.body.msg).toBe('Token inválido');
  });
});

describe('DELETE /usuarios/:id', () => {
  it('deve deletar usuário e retornar 204', async () => {
    await request
      .delete(`/usuarios/${userId}`)
      .set('authorization', `Bearer ${token}`)
      .expect(204);
  });
});