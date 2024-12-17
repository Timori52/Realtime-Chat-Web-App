require('dotenv').config(); 
const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Parse and use the service account key
const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.post('https://realtime-chat-web-app-woia.onrender.com/send-notification', async (req, res) => {
  const { token, message } = req.body;
const {body,title} = message;
  try {
    const notification = {
      notification: {
        title: title,
        body: body
      },
      token,
    };
    const response = await admin.messaging().send(notification);
    console.log('Notification sent:', response);
    res.status(200).send('Notification sent successfully!');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error sending notification.');
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
