import { Button, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [details, setDetails] = useState({});

  const handleChanges = (ev) => {
    const { name, value } = ev.target;
    setDetails({ ...details, [name]: value.trim(1) });
  };
  console.log(details);

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  return (
    <div className=" min-h-screen max-w-2xl mx-auto flex flex-col justify-center gap-7 px-4">
      <div className=" w-full">
        <h1 className=" text-xl text-blue-600 font-semibold text-center">
          <span className=" text-3xl">Income</span>Planner
        </h1>
        <p className=" text-center text-gray-700 text-sm">
          Sign up to get started
        </p>
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
