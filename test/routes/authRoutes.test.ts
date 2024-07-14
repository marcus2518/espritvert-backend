import { expect } from 'chai';
import request from 'supertest';
import express from 'express';
import authRoutes from '../../src/routes/authRoutes';

// Mock the controller functions
import * as authController from '../../src/controllers/authController';

// Create an Express app and use the auth routes
const app = express();
app.use(express.json()); // For parsing application/json
app.use('/api/auth', authRoutes);

// Mock registerUser and signInUser controllers
authController.registerUser = async (req, res) => {
    const { user, password } = req.body;
    if (!user || !password) {
        return res.status(400).send({ message: 'Bad request' });
    }
    return res.status(201).send({ message: 'User registered successfully' });
};

authController.signInUser = async (req, res) => {
    const { user, password } = req.body;
    if (!user || !password) {
        return res.status(400).send({ message: 'Bad request' });
    }
    return res.status(200).send({ message: 'OK' });
};

describe('Auth Routes', () => {
    describe('POST /api/auth/register', () => {
        it('should register a new user', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({ user: 'john_doe@gmail.com', password: 'password123' });

            expect(res.status).to.equal(201);
            expect(res.body.message).to.equal('User registered successfully');
        });

        it('should return 400 for bad request', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({ user: 'john_doe@gmail.com' }); // Missing password

            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('Bad request');
        });
    });

    describe('POST /api/auth/signin', () => {
        it('should sign in a user', async () => {
            const res = await request(app)
                .post('/api/auth/signin')
                .send({ user: 'john_doe@gmail.com', password: 'password123' });

            expect(res.status).to.equal(200);
            expect(res.body.message).to.equal('OK');
        });

        it('should return 400 for bad request', async () => {
            const res = await request(app)
                .post('/api/auth/signin')
                .send({ user: 'john_doe@gmail.com' }); // Missing password

            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('Bad request');
        });
    });
});
