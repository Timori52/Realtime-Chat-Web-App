import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
function SignOut() {
  function logOut() {
    signOut(auth);
  }
  return (
    <div className="  text-white text font-semibold p-3 rounded-xl text-2xl ">
      <button onClick={logOut}>  <FontAwesomeIcon icon={faRightFromBracket} /></button>
    </div>
  );
}

export default SignOut;
