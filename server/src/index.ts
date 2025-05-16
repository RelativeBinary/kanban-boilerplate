import express from 'express';
import supabase from './supabaseClient.js';
// import cors from 'cors';
import { config } from 'dotenv';

config()
const app = express();
const PORT = process.env.PORT || 3000;
// const corsOptions = {
//   origin: `http://localhost:3001`, 
//   credentials: false,            //access-control-allow-credentials:true
//   optionSuccessStatus: 200
// }
// app.use(cors());

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