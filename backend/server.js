/* eslint-disable no-undef */
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
app.use(cors());
app.use(express.json());

// Firebase Admin Initialization
const serviceAccount = require('./my-chat-app-505c8-f7580434f1ea.json'); 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// FCM Notification ko is endpoint pr bhejna 
app.post('/send-notification', async (req, res) => {
  const { token, message } = req.body; // `token` or `message` from frontend
 const { title , body} = message; // es tarah destructure karna zruri hai kyuki fcm ka structure maintain krna hai body me object ni string hi ja skti hai
  const notification = {
    notification: {
      title: title,
      body: body,
    },
    token, // Receiver token
  };

  try {
    const response = await admin.messaging().send(notification); // bhejo notif.
    console.log('Notification sent successfully:', response);
    res.status(200).send('Notification sent successfully!');
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).send('Failed to send notification.');
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});