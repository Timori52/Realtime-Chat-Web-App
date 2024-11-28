import SignIn from "./SignIn";
import SignOut from "./SignOut";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const Nav = () => {
 const [user] = useAuthState(auth);
 console.log(user);
 
  
  return (
    <nav className="h-16 bg-gray-800  flex items-center p-4 justify-between rounded-t-2xl">
      <p className="text-white sm:text-2xl text-sm">Chat-App</p>
     {
      user? <SignOut /> : <SignIn />

     }
      
    </nav>
  );
};

export default Nav;
