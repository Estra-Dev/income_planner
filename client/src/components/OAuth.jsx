import { Button } from "flowbite-react";
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

const OAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoogleSubmit = async () => {
    dispatch(signInStart());
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      console.log(resultFromGoogle);
      const res = await axios.post(
        `/api/auth/google`,
        {
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          googlePhotoUrl: resultFromGoogle.user.photoURL,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.status === 200) {
        dispatch(signInSuccess(res.data));
        toast.success("Access Allowed, You are in");
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.response.data.message));
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <Button
      className=" w-full"
      color="lime"
      gradientDuoTone="purpleToBlue"
      outline
      onClick={handleGoogleSubmit}
      type="button"
    >
      <span>
        <FcGoogle className=" w-5 h-5 mr-2" />
      </span>
      Continue with Google
    </Button>
  );
};

export default OAuth;
