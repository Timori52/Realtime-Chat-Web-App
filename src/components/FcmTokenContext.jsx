/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";
import { messaging } from "../firebase.js";
import { getToken } from "firebase/messaging";
import { auth } from "../firebase";

const fcmContext = createContext();

export const FcmTokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const userId = auth.currentUser?.uid;
  console.log(userId);
  

  const notificationPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      try {
        const fcmToken = await getToken(messaging, {
          vapidKey:
            "BJhwdaGlMLwC9tL-OWNWyRhbxghyM0o5vOaU75u0tj_Y4UKD1ZLD8miE5d_fucRkk9oW2KGtdOQzcWICU4nsj8g",
        });
        setToken(fcmToken);
        console.log("FCM Token fetched successfully:", fcmToken);
      } catch (error) {
        console.error("Error fetching FCM token:", error);
      }
    } else {
      console.warn("Notification permission not granted.");
    }
    await fetch("https://realtime-chat-web-app-woia.onrender.com/save-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        token: token
      }),
    });
  };

  useEffect(() => {
    // Automatically fetch the token on component mount if permission is already granted
    if (Notification.permission === "granted"  ) {
      notificationPermission();
      // console.log(Notification.permission);

    }
  }, []);

  return (
    <fcmContext.Provider value={{ token, notificationPermission, userId }}>
      {children}
    </fcmContext.Provider>
  );
};

export function useFCM() {
  return useContext(fcmContext);
}
