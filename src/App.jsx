import Chat from "./components/Chat";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Nav from "./components/Nav";
import "./App.css";
import {FcmTokenProvider} from "./components/FcmTokenContext"

function App() {
  const [user] = useAuthState(auth);
  
  return (
    <>

    <FcmTokenProvider>


      <div className=" flex  sm:w-[600px] md:w-[728px]    mx-auto  text-center justify-center mt-10 ">
        <section className="flex w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl   mx-2 sm:mx-4 flex-col rounded-2xl shadow-blue-400 shadow-2xl  bg-gray-100    h-[80vh]">
          {/* Navbar */}
          <Nav />
          {/* Chat */}
          {user ? <Chat /> : null}
        </section>
      </div>
    </FcmTokenProvider>
    </>
  );
}

export default App;
