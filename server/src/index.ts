import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import supabase from './supabaseClient.js';

// load env variables fomr dotenv first
config();
const app = express();
const PORT = process.env.LOCAL || 3000;
const ORIGIN = process.env.ORIGIN || 'ERROR NO ORIGIN CONFIGURED';
app.use(cors({
  origin: ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get("/", (_, res) => {
  res.send("<h1>Hello! World!</h1>");
});

app.get('/tasks', async (_, res) => {
  try {
    const { data, error } = await supabase 
    .from('tasks')
    .select();

    if (error) {
      console.log('error', error);
      throw error;
    }
    res.status(200).json(data);
  } catch {
    console.error('Error fetchign users');
    res.status(500).json({ error: 'Error message' });
  }
});

app.listen(PORT, () => {
  console.log('configured origin:', ORIGIN);
  console.log('🔥 Server running on port:', PORT);
});