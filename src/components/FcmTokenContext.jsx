import { createContext, useState, useContext } from "react";
import { messaging } from "../firebase.js";
import { getToken } from "firebase/messaging";

const fcmContext = createContext();


// eslint-disable-next-line react/prop-types
export  const  FcmTokenProvider = ({children}) => {
    const [token, setToken] = useState(null);
   
      const notificationPermission = async () => {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          console.log(permission);
          const fcmToken = await getToken(messaging, {
            vapidKey:
              "BJhwdaGlMLwC9tL-OWNWyRhbxghyM0o5vOaU75u0tj_Y4UKD1ZLD8miE5d_fucRkk9oW2KGtdOQzcWICU4nsj8g",
          });
          setToken(fcmToken);
          console.log("HERE'S THE TOKEN", fcmToken);
        }
      };
      notificationPermission();
   



    return (
        <fcmContext.Provider value={{token,notificationPermission}} >
            {children}
        </fcmContext.Provider>
    )

}
export function useFCM(){
    return useContext(fcmContext);
}

