const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('tardygram routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('create a user via post', async() => {
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
        profilePhotoUrl: 'https://bit.ly/2S8jhAM'
      });
    
    expect(response.body).toEqual({
      id: expect.any(String),
      email: 'test@test.com',
      profilePhotoUrl: 'https://bit.ly/2S8jhAM'
    });
  });
});
