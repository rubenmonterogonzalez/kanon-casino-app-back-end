import request from 'supertest';
import { app, server } from '../index';

const testUser = {
  username: 'Ruben',
  email: 'rubenmontero@rocketmail.com',
  password: '123456',
};

describe('Auth Routes', () => {
  describe('POST /auth/login', () => {
    it('should respond with user data on successful login', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ email: testUser.email, password: testUser.password });

      expect(response.statusCode).toBe(200);
      expect(response.body.user).toBeDefined();
      expect(response.body.user).toEqual({ username: testUser.username, email: testUser.email });
      expect(response.body).toHaveProperty('token');
    });
  });

  describe('POST /auth/register', () => {
    it('should respond with user data on successful registration', async () => {
      const uniqueEmail = `testuser+${Date.now()}@example.com`; // Create a unique email for registration
      const response = await request(app)
        .post('/auth/register')
        .send({ username: testUser.username, email: uniqueEmail, password: testUser.password, confirmPassword: testUser.password });

      expect(response.statusCode).toBe(200);
      expect(response.body.user).toBeDefined();
      expect(response.body.user).toEqual({ username: testUser.username, email: uniqueEmail });
      expect(response.body).toHaveProperty('token');
    });
  });

  afterAll(done => {
    server.close(done);
  });
});
