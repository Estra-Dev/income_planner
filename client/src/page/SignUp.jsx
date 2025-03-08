import axios from "axios";
import { Button, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import BigLogo from "../components/BigLogo";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [details, setDetails] = useState({});

  const navigate = useNavigate();

  const handleChanges = (ev) => {
    const { name, value } = ev.target;
    setDetails({ ...details, [name]: value.trim(1) });
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();

    try {
      const res = await axios.post(`/api/auth/signup`, details, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 201) {
        navigate("/sign-in");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className=" min-h-screen max-w-sm mx-auto flex flex-col justify-center gap-3 px-6">
      <div className=" w-[100%] overflow-hidden object-cover mx-auto">
        <div className=" w-full text-center">
          <BigLogo />
        </div>
        <h1 className=" font-semibold text-[16px] sm:text-sm text-gray-700/85 mt-6 mb-2">
          You are just a step away to start planning and tracking your income.
        </h1>
        <h1 className=" font-semibold text-[16px] sm:text-sm text-gray-700/85 mb-5">
          Signup and get access to QuickPlanna services, just one account is
          enough for you.
        </h1>
        {/* <img
          src="https://th.bing.com/th/id/OIP.qQoAjkFY1Ti5QuqZzfx2mwAAAA?pid=ImgDet&w=185&h=310&c=7"
          className=" w-full"
          alt=""
        /> */}
      </div>

      <form className=" w-full" onSubmit={handleSubmit}>
        <div className=" w-full flex flex-col gap-2 text-gray-700">
          <label htmlFor="email">Email:</label>
          <TextInput
            type="text"
            placeholder="e.g@company.com"
            name="email"
            onChange={handleChanges}
          />
        </div>
        <div className=" w-full flex flex-col gap-2 text-gray-700 mt-2">
          <label htmlFor="username">Username:</label>
          <TextInput
            type="text"
            name="username"
            placeholder="username"
            onChange={handleChanges}
          />
        </div>
        <div className=" w-full flex flex-col gap-2 text-gray-700 mt-2">
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
          className=" w-full mt-3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"
        >
          Sign Up
        </Button>
        <p className=" text-center my-6 font-medium text-gray-700/75">OR</p>
        <OAuth />
      </form>
      <span className=" text-xs flex gap-1 text-gray-600">
        <p>Already have an account?</p>
        <Link to={"/sign-in"} className=" text-blue-600 font-semibold">
          Sign In
        </Link>
      </span>
    </div>
  );
};

export default SignUp;
