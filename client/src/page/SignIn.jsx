import { Button, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import BigLogo from "../components/BigLogo";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const [details, setDetails] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChanges = (ev) => {
    const { name, value } = ev.target;
    setDetails({ ...details, [name]: value.trim(1) });
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    dispatch(signInStart());
    try {
      const res = await axios.post(`/api/auth/signin`, details, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 200) {
        dispatch(signInSuccess(res.data));
        // navigate("/dashboard?tab=main");
        navigate("/");
        toast.success("Access Allowed, You are in");
      }
    } catch (error) {
      dispatch(signInFailure(error.response.data.message));
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className=" min-h-screen max-w-sm mx-auto flex flex-col justify-center gap-3 px-6">
      <div className=" w-[100%] overflow-hidden object-cover mt-10 mx-auto">
        <div className=" w-full flex justify-center">
          <BigLogo />
        </div>
        <h1 className=" font-semibold text-[16px] sm:text-sm text-gray-700/85 mt-6 mb-2">
          Only signin via Email is supported for now. Use your account Email to
          Signin.
        </h1>
      </div>

      <form
        className=" w-full text-sm font-medium text-gray-600"
        onSubmit={handleSubmit}
      >
        <div className=" w-full flex flex-col gap-1">
          <label htmlFor="email">Email:</label>
          <TextInput
            type="text"
            placeholder="e.g@company.com"
            name="email"
            onChange={handleChanges}
          />
        </div>
        <div className=" w-full flex flex-col gap-1 mt-3">
          <label htmlFor="password">Password:</label>
          <TextInput
            type="password"
            name="password"
            placeholder="*************"
            onChange={handleChanges}
          />
        </div>
        <Button
          type="submit"
          className=" w-full mt-10 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"
        >
          Sign In
        </Button>
        <p className=" text-center my-6 font-medium">OR</p>
        <OAuth />
      </form>
      <span className=" text-xs flex gap-1 text-gray-600 mt-3">
        <p>No Account?</p>
        <Link to={"/sign-up"} className=" text-blue-600 font-semibold">
          Sign Up
        </Link>
      </span>
    </div>
  );
};

export default SignIn;
