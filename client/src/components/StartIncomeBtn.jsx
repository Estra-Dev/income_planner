// import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const StartIncomeBtn = () => {
  return (
    <div className=" sticky right-0 bottom-5 w-full flex justify-end">
      <Link
        to={"/create-income"}
        className=" border border-blue-700 rounded-2xl text-xs p-2 bg-blue-700 text-white font-medium"
      >
        New Income
      </Link>
    </div>
  );
};

export default StartIncomeBtn;
