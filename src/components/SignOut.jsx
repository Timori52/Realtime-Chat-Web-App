import { auth } from "../firebase";
import {signOut } from "firebase/auth";
function SignOut() {


  function logOut() {

signOut(auth);

  }
  return <div className=" bg-white text-black font-semibold p-3 rounded-xl ">

<button onClick={logOut}> Sign Out</button>

  </div>;
}

export default SignOut;
