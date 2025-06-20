import express from "express";
import { OAuth2Client } from "google-auth-library";

const router = express.Router();

// OAuth request endpoint
router.post("/request", async (_, res) => {
  try {
    console.log("OAuth request initiated");

    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Referrer-Policy", "no-referrer-when-downgrade");

    const redirectUrl =
      process.env.NODE_ENV === "production"
        ? "https://kanban-boilerplate.vercel.app/oauth"
        : "http://localhost:3001/oauth";

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

    console.log("Auth URL generated:", authoriseUrl);
    res.json({ url: authoriseUrl });
  } catch (error) {
    console.error("Error generating auth URL:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate authentication URL",
    });
  }
});

// OAuth callback endpoint
router.get("/oauth", async (req, res) => {
  const code = req.query.code;

  if (!code) {
    res.status(400).json({
      success: false,
      error: "Authorization code not provided",
    });
  } else {
    console.log("Authorization code received:", code);

    try {
      const redirectUrl =
        process.env.NODE_ENV === "production"
          ? "https://kanban-boilerplate.vercel.app/oauth"
          : "http://localhost:3001/oauth";

      const oAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        redirectUrl
      );

      const tokenResponse = await oAuth2Client.getToken(code as string);
      const userAccessToken = oAuth2Client.credentials.access_token;
      console.log('tokenResponse', tokenResponse);
      if (!userAccessToken) {
        throw new Error("Failed to obtain access token");
      }

      console.log("Token acquired successfully");

      const userData = await getUserData(userAccessToken);

      res.json({
        success: true,
        user: userData,
        message: "Authentication successful",
      });
    } catch (error) {
      console.error("Error during OAuth process:", error);
      res.status(500).json({
        success: false,
        error: "Authentication failed",
      });
    }
  }
});

// Helper function to get user data
const getUserData = async (accessToken: string) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("User data retrieved:", data);
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export default router;
