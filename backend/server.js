require("dotenv").config();
const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Parse and use the service account key
const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Global tokens object to store user tokens
const tokens = {};

// Save FCM Token
app.post("/save-token", (req, res) => {
  const { userId, token } = req.body;

  // Validate request body
  if (!userId || !token) {
    console.log("Missing userId or token:", { userId, token });
    return res.status(400).send("Invalid request. userId and token are required.");
  }

  // Save token to the global tokens object
  tokens[userId] = token;
  console.log("Tokens stored:", tokens);
  res.status(200).send("Token saved successfully!");
});

// Send Notifications
app.post("/send-notification", async (req, res) => {
  const { senderId, message } = req.body;

  // Validate request body
  if (!senderId || !message || !message.title || !message.body) {
    console.log("Invalid request data:", { senderId, message });
    return res.status(400).send("Invalid request. senderId and message (with title and body) are required.");
  }

  const { body, title } = message;

  try {
    // Collect all tokens except the sender's token
    const targetTokens = Object.values(tokens).filter((token, index) => {
      const userId = Object.keys(tokens)[index];
      return userId !== senderId; // Exclude sender's token
    });

    if (targetTokens.length === 0) {
      return res.status(400).send("No valid tokens to send notifications.");
    }

    // Prepare notifications for all target tokens
    const notifications = targetTokens.map((token) => ({
      notification: {
        title: title,
        body: body,
      },
      token,
    }));

    // Send notification for each target token
    const promises = notifications.map((notif) => admin.messaging().send(notif));
    const responses = await Promise.all(promises);

    console.log("Notifications sent:", responses);
    res.status(200).send("Notifications sent successfully!");
  } catch (error) {
    console.error("Error sending notifications:", error);
    res.status(500).send("Error sending notifications.");
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
