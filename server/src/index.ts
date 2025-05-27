import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import supabase from './supabaseClient.js';

// load env variables fomr dotenv first
config();
const app = express();
const PORT = process.env.LOCAL || 3000;
const LOCAL_UI_PORT = process.env.LOCAL_UI_PORT || 3001;
const allowedOrigins = [
  'https://kanban-boilerplate.vercel.app',
  `http://localhost:${LOCAL_UI_PORT}`,
];

// app.use(cors({
//   origin: function(origin, callback) {
//     console.log('conifgured origin: ', origin);
//     // Allow requests with no origin (like mobile apps or curl requests)
//     if (!origin) return callback(null, true);
    
//     if (allowedOrigins.indexOf(origin) === -1) {
//       console.log('origin not found: ', origin);
//       const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
app.use(cors());

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
  console.log('>:3 Server running on port:', PORT);
});