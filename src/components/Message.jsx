import { auth } from "../firebase";
import './hellow.css';

const Message = ({ message }) => {
  const messageType =
    message.uid === auth.currentUser.uid
      ? `bg-[#395dff] text-white flex-row-reverse text-end float-right rounded-bl-full`
      : `bg-[#e5e5ea] text-black float-left rounded-br-full`;

  return (
    <div className="MessageContainer">
      <img 
        src={message.photoURL} 
        alt="photo" 
        className={`rounded-full w-10 mt-4 ${messageType}`} 
        referrerPolicy="no-referrer" 
      />
      <div 
        className={`Message flex items-center shadow-xl m-4 py-2 px-3 rounded-tl-full rounded-tr-full ${messageType}`}
      >
        <p className="Name absolute whitespace-nowrap flex-end  text-gray-600 text-xs">
          {message.name}
        </p>
        <p className="MessageText">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
