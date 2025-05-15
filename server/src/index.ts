import express from 'express';
import { config } from 'dotenv';
import supabaseKey from './supabaseClient.js';

console.log(supabaseKey);

config()

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (_, res) => {
  res.send("<h1>Hello! World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});