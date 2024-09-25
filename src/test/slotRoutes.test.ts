import request from 'supertest';
import { app, server } from '../index';
import jwt from 'jsonwebtoken';


describe('Slot Routes', () => {
  let validToken: string;

  beforeAll(async () => {
    // Log in to get a valid token
    const loginResponse = await request(app)
      .post('/auth/login')
      .send({
        email: 'rubenmontero@rocketmail.com', // Make sure this user exists
        password: '123456',
      });

    validToken = loginResponse.body.token; // Store the token for later use

  });

  describe('POST /slots/spin', () => {
    it('should return 400 if user ID is invalid', async () => {
      const response = await request(app)
        .post('/slots/spin')
        .set('Authorization', 'Bearer invalid_token')
        .send({ coins: 20 });
      expect(response.status).toBe(401); // Expecting unauthorized since the token is invalid
    });

    it('should return 400 if insufficient coins', async () => {
      // Simulate insufficient coins directly in the request
      const response = await request(app)
        .post('/slots/spin')
        .set('Authorization', `Bearer ${validToken}`) // Use a valid token here
        .send({ coins: 0 });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Insufficient coins');
    });

    it('should return spin results on success', async () => {
      const response = await request(app)
        .post('/slots/spin')
        .set('Authorization', `Bearer ${validToken}`) // Use a valid token here
        .send({ coins: 1 }); // Assume this user has sufficient coins

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('coins');
      expect(response.body).toHaveProperty('spinResult');
      expect(response.body).toHaveProperty('winAmount');
    });
  });

  describe('GET /slots/coins', () => {
    it('should return coins for a valid user', async () => {
      const response = await request(app)
        .get('/slots/coins')
        .set('Authorization', `Bearer ${validToken}`); // Use a valid token here

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ coins: expect.any(Number) }); // Assuming this is how the response looks
    });

    it('should return 404 if user is not found', async () => {
      const nonExistentUserId = 1234567890; // This should be a valid ID, but it shouldn't exist in your database
      const invalidToken = jwt.sign({ id: nonExistentUserId }, process.env.JWT_SECRET);

      const response = await request(app)
        .get('/slots/coins')
        .set('Authorization', `Bearer ${invalidToken}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'User not found');
    });
  });

  afterAll(done => {
    server.close(done);
  });
});
