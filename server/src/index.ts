import express from 'express';
import supabase from './supabaseClient.js';
import cors from 'cors';
import { config } from 'dotenv';

config()
const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigins = [
  'https://kanban-boilerplate.vercel.app',
  `http://localhost:${PORT}`,
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get("/", (_, res) => {
  res.send("<h1>Hello! World!");
});

app.router.get('/tasks', async (_, res) => {
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
  console.log('listneing supabase: ', supabase);
  console.log(`Server is running on port: ${PORT}`);
});