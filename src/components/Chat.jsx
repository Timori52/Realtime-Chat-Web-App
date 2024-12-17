import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { useFCM } from "./FcmTokenContext";

function Chat() {
  const [messages, setMessages] = useState([]);
  const scrollref = useRef(null);
  const { notificationPermission } = useFCM();

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => messages.push({ ...doc.data(), id: doc.id }));
      setMessages(messages);
      scrollref.current?.scrollIntoView({ behavior: "smooth" });
    });
    
    // Request notification permission on load
    notificationPermission();

    return () => unsubscribe();
  }, [notificationPermission]);

  return (
    <>
      <div
        style={{ scrollbarWidth: "none" }}
        className="flex flex-col p-[1rem] overflow-y-auto"
      >
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        <div ref={scrollref}></div>
      </div>
      <SendMessage scrollref={scrollref} />
    </>
  );
}

export default Chat;
