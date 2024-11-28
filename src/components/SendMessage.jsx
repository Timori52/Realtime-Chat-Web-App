/* eslint-disable react/prop-types */
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../firebase";


function SendMessage({scrollref}) {
  const [input, setInput] = useState("");

  async function sendMessage(e) {
    e.preventDefault();
    const { displayName, uid, photoURL} = auth.currentUser;
    console.log(photoURL);
    await addDoc(collection(db, "messages"), {
      text: input,
      timestamp: serverTimestamp(),
      name: displayName,
      photoURL,
      uid,
    });
    
    setInput("");
    scrollref.current.scrollIntoView({behavior: 'smooth'})
  }

  return (
    <>
      <form
        onSubmit={sendMessage}
        className="h-14 w-full md:w-[728px] border-none rounded-full  flex text-xl absolute  bottom-0"
      >
        <input
          type="text"
          id="sendmsg" style={{boxShadow:'inset 4px 4px 8px rgba(0, 0, 0, 0.2), inset -4px -4px 8px rgba(255, 255, 255, 0.8)' }}
          className="  w-full rounded-l-2xl  text-xl p-3 bg-white text-black outline-none border-none "
          placeholder="Start typing here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          disabled={input.trim().length === 0}
          className={`w-[20%] rounded-r-2xl py-2  text-white transition-all duration-300 ${
            input.trim().length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-400 hover:shadow-[0_0px_15px_5px_rgba(144,238,144,0.8)]"
          }`}
        >
          Send
        </button>
      </form>
    </>
  );
}

export default SendMessage;
