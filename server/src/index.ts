// index.js
import express from "express";
import { middleware } from "#middlewares/middlewares.js";
import supabase from "#config/supabaseClient.js";
import cors from 'cors';

const app = express();
const port = process.env.PORT ?? "2000";
const corsOptions = {
  origin: `http://localhost:3001`, 
  credentials: false,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World! From Railway!");
  console.log("Response sent");
  console.log("Some change to the file", middleware);
});

app.router.get('/tasks', async (require, res) => {
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

app.listen(port, () => {
  console.log('supabase', supabase);
  console.log(`Example app listening on port ${port}`);
});
