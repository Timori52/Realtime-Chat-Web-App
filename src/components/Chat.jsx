import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

function Chat() {
  const [messages, setMessages] = useState([]);
  const scrollref = useRef(null);
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const fetchNewMsg = onSnapshot(q, (querySnapshot) => {
      let messages = [];

      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);

      setTimeout(() => {
        scrollref.current.scrollIntoView({ behavior: "smooth" });
      }, 0);
    });
    return () => fetchNewMsg();
  }, []);

  // useEffect(() => {

  //     scrollref.current.scrollIntoView({ behavior: "smooth" });

  // }, [messages]);

  return (
    <>
      <div
        style={{ scrollbarWidth: "none" }}
        className="flex flex-col  p-[1rem] overflow-y-auto "
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
