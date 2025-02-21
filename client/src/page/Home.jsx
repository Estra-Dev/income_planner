import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import BigLogo from "../components/BigLogo";

const Home = () => {
  return (
    <div className=" max-w-2xl mx-auto min-h-screen p-3 flex flex-col gap-3 items-start mt-5">
      <div className=" mt-2 p-4 w-full shadow-md bg-black/5 rounded-md">
        <h1 className=" font-medium text-xl text-gray-700/85 border-blue-600/50 pb-2 border-b-2">
          Financial planning is a crucial process for managing your finances to
          achieve your life goals.
        </h1>
        <Button size="xs" color="blue" className=" mt-9" outline>
          <Link
            to={"/create-income"}
            className=" rounded-2xl text-xs font-medium "
          >
            Start Planning
          </Link>
        </Button>
      </div>
      <div className=" mt-2 p-4 w-full shadow-md bg-lime-600 rounded-md">
        <p className=" font-medium text-sm text-white/80 border-white pb-2 border-b">
          Track your income and expenses to understand where your money is
          going.
        </p>
        <div className=" mt-7">
          <h1 className=" font-medium text-lg text-white mb-2">
            Use the 50/30/20 rule as a guideline:
          </h1>
          <ul className=" text-white/80">
            <li>50% for needs (rent, utilities, groceries).</li>
            <li>30% for wants (entertainment, dining out).</li>
            <li>20% for savings and debt repayment.</li>
          </ul>
        </div>
      </div>
      <div className=" flex flex-col items-center mt-7 justify-center w-full">
        <BigLogo />
        <i className=" font-medium text-gray-800/75 text-sm">
          Let us help you stick to plan...
        </i>
        <Button size="xs" color="blue" className=" mt-7" outline>
          <Link
            to={"/create-income"}
            className=" rounded-2xl text-xs font-medium "
          >
            Start Planning
          </Link>
        </Button>
      </div>
      <div className=" my-2 p-4 w-full h-[200px] shadow-md bg-black/5 rounded-md flex justify-center items-center">
        <Button
          size="sm"
          color="gray"
          disabled={true}
          className=" text-blue-600"
        >
          Give your Review
        </Button>
      </div>
    </div>
  );
};

export default Home;
