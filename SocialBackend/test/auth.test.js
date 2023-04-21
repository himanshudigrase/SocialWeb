import request from 'supertest';
import app from '../app';

describe('User API', () => {
  let token;

  beforeAll(async () => {
    // Login to get a JWT token for protected routes
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'user@example.com',
        password: 'password123',
      });

    token = response.body.token;
  });

  describe('POST /api/users', () => {
    it('registers a new user', async () => {
      const newUser = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        password: 'password123',
        picturePath: '/path/to/picture',
        friends: ['friend1@example.com', 'friend2@example.com'],
        location: 'New York',
        occupation: 'Software Engineer',
      };

      const response = await request(app)
        .post('/api/users')
        .send(newUser)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(newUser);
    });

    it('returns an error if required fields are missing', async () => {
      const newUser = {
        email: 'johndoe@example.com',
        password: 'password123',
      };

      const response = await request(app)
        .post('/api/users')
        .send(newUser)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /api/auth/login', () => {
    it('logs in a user with valid credentials', async () => {
      const credentials = {
        email: 'user@example.com',
        password: 'password123',
      };

      const response = await request(app).post('/api/auth/login').send(credentials);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
    });

    it('returns an error for invalid credentials', async () => {
      const credentials = {
        email: 'user@example.com',
        password: 'invalidpassword',
      };

      const response = await request(app).post('/api/auth/login').send(credentials);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
});
