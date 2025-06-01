import express from "express";
import cors from "cors";
import { config } from "dotenv";
import supabase from "./supabaseClient.js";

// load env variables fomr dotenv first
config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const ORIGIN = process.env.ORIGIN || "ERROR NO ORIGIN CONFIGURED";
app.use(
  cors({
    origin: ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// app.use(cors());

app.get("/", (_, res) => {
  res.send("<h1>Hello! World!</h1>");
});

app.get("/tasks", async (_, res) => {
  try {
    const { data, error } = await supabase.from("tasks").select();

    if (error) {
      console.log("error", error);
      throw error;
    }
    res.status(200).json(data);
  } catch {
    console.error("Error fetchign users");
    res.status(500).json({ error: "Error message" });
  }
});

app.post("/task/:id", async (req, res) => {
  // Add 'res' parameter!
  try {
    const taskId = req.params.id;
    const { stage } = req.body;
    const { data, error } = await supabase // Add 'const { data, error } ='
      .from("tasks")
      .update({ stage })
      .eq("id", taskId);

    if (error) {
      console.log("error 😭", error, data);
      res.status(400).json({
        success: false,
        error: error.message,
      });
    } else {
      res.status(200).json({
        // Send response!
        success: true,
        data: data,
      });
    }
  } catch (err) {
    res.status(500).json({
      // Send error response!
      success: false,
      error: err.message,
    });
  }
});

app.delete("/task/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const { data, error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", taskId);

    if (error) {
      console.log("error 😭", error, data);
      res.status(400).json({
        success: false,
        error: error.message,
      });
    } else {
      res.status(200).json({
        success: true,
        data: data,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log("configured origin:", ORIGIN);
  console.log("🔥 Server running on port:", PORT);
});
