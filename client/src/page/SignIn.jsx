import { Button, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import axios from "axios";

const SignIn = () => {
  const [details, setDetails] = useState({});

  const navigate = useNavigate();

  const handleChanges = (ev) => {
    const { name, value } = ev.target;
    setDetails({ ...details, [name]: value.trim(1) });
  };
  console.log(details);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const res = await axios.post(`/api/auth/signin`, details, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 200) {
        navigate("/");
        toast.success("Access Allowed, You are in");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className=" min-h-screen max-w-2xl mx-auto flex flex-col justify-center gap-7 px-4">
      <div className=" w-[100%] overflow-hidden object-cover h-[350px] mt-10 mx-auto">
        <h1 className=" font-semibold text-2xl text-gray-900 text-center mt-6 mb-10">
          Sign in to get started with your IncomePlanner Account
        </h1>
        <img
          src="https://th.bing.com/th/id/OIP.qQoAjkFY1Ti5QuqZzfx2mwAAAA?pid=ImgDet&w=185&h=310&c=7"
          className=" w-full"
          alt=""
        />
      </div>
      <div className=" w-full">
        <h1 className=" text-xl text-blue-600 font-semibold text-center mt-2">
          <span className=" text-3xl">Income</span>Planner
        </h1>
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
          Sign In
        </Button>
      </form>
      <span className=" text-xs flex gap-1 text-gray-600">
        <p>No Account?</p>
        <Link to={"/sign-up"} className=" text-blue-600 font-semibold">
          Sign Up
        </Link>
      </span>
    </div>
  );
};

export default SignIn;
