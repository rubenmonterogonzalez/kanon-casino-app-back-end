import request from 'supertest';
import { app, server } from '../index';

describe('GET /api/games', () => {
  it('responds with json', async () => {
    const response = await request(app).get('/api/games');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });
});

afterAll(done => {
  server.close(done);
});
