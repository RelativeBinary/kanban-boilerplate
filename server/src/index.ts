import express from "express";
import cors from "cors";
import { config } from "dotenv";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";

// Load environment variables
config();

const app = express();
const PORT = process.env.PORT || 3000;
const ORIGIN = process.env.ORIGIN || "ERROR NO ORIGIN CONFIGURED";

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Basic route
app.get("/", (_, res) => {
  res.send("<h1>Hello world!</h1>");
});

// Route handlers
app.use("/auth", authRoutes);
app.use("/api", taskRoutes);

app.listen(PORT, () => {
  console.log("Configured origin:", ORIGIN);
  console.log("🔥 Server running on port:", PORT);
});