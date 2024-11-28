/* eslint-disable react/prop-types */
import { auth } from "../firebase";

const Message = ({ message }) => {
  const messageType =
    message.uid === auth.currentUser.uid
      ? `bg-[#395dff] text-white flex-row-reverse text-end float-right rounded-bl-full items-center justify-center`
      : `bg-[#e5e5ea] text-black float-left rounded-br-full`;

  return (
    <div>
      <img src={message.photoURL} alt="photo" className={`${messageType} rounded-full w-10 mt-4 `} referrerPolicy="no-referrer" />
      <div
        className={`${messageType} Message flex items-center shadow-xl m-4 py-2 px-3 rounded-tl-full rounded-tr-full`}
      >
        <p className="Name absolute mt-[-4rem] text-gray-600 text-xs">
          {message.name}
        </p>
        <p>{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
