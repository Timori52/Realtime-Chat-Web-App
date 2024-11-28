import {} from "react";
import Chat from "./components/Chat";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";


import Nav from "./components/Nav";
import "./App.css"

function App() {
  const [user] = useAuthState(auth);
  return (
    <>
      <div className="  sm:w-full md:w-[728px]   mx-auto  text-center mt-10 ">
        <section className="flex flex-col rounded-2xl shadow-blue-400 shadow-2xl  bg-gray-100    h-[80vh]">
          {/* Navbar */}
          <Nav />
          {/* Chat */}
          {user ? <Chat /> : null}
        </section>
      </div>
    </>
  );
}

export default App;
