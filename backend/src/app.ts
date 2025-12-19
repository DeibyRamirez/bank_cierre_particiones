import express from 'express';
import { getHealth } from './api/controllers/health.controller.js';

export const app = express();

app.use(express.json());
app.get('/health', getHealth);
