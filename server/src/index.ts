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

app.get("/", (_, res) => {
  res.send("<h1>Hello world!</h1>");
})

// what is this suppose to do??
app.get("/oauth", async (req, _) => {
  const code: string = req.query.code as unknown as string;
  console.log("code from google", code); // ref to 17mins if u get a xsrforgery token
  try {
    // const redirectUrl = "https://kanban-boilerplate.vercel.app";
    const redirectUrl = "http://localhost:3001/oauth";
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUrl
    );
    const res = await oAuth2Client.getToken(code);
    const userAccessToken = oAuth2Client.credentials.access_token ?? 'ERROR invalid access token';
    console.log('token acquired, credentials', oAuth2Client.credentials); 
    await getUserData(userAccessToken);
    console.log('res', res);
  } catch (err) {
    console.log('Error with signing in with goodle', err);
  }
});

import { OAuth2Client } from "google-auth-library";

app.post("/request", async function (_, res) {
  console.log('request');
  res.header("Access-Control-Allow-Origin", 'http://localhost:3001');
  res.header("Access-Control-Allow-Credentials", 'true');
  res.header("Referrer-Policy", "no-referrer-when-downgrade");
  // const redirectUrl = "https://kanban-boilerplate.vercel.app";
  const redirectUrl = "http://localhost:3001/oauth";

  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirectUrl
  );

  const authoriseUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: "https://www.googleapis.com/auth/userinfo.profile openid",
    prompt: "consent",
  });
  console.log("auth url", authoriseUrl);
  res.json({ url: authoriseUrl });
});

// todo from video
const getUserData = async (access_token: string) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token${access_token}`
  );
  const data = await response.json();
  console.log("data", data);
};

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
  try {
    const taskId = req.params.id;
    const { stage, desc, name } = req.body;
    const { data, error } = await supabase
      .from("tasks")
      .update({ stage, desc, name })
      .eq("id", taskId)
      .select();

    if (error) {
      console.log("error 😭", error, data);
      res.status(400).json({
        success: false,
        error: error.message,
      });
    } else {
      res.status(200).json({
        success: true,
        result: data,
      });
    }
  } catch (err) {
    res.status(500).json({
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
      .match({ id: taskId });

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

app.post("/task", async (req, res) => {
  try {
    const newTask = req.body;
    const { data, error } = await supabase
      .from("tasks")
      .insert(newTask)
      .select();

    if (error) {
      console.log("error 😭", error, data);
      res.status(400).json({
        success: false,
        error: error.message,
      });
    } else {
      console.log("successfully created task", data);
      res.status(200).json({
        success: true,
        result: data,
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
