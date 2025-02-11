// import { Button } from "flowbite-react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const StartIncomeBtn = () => {
  return (
    <Button
      size="xs"
      gradientDuoTone="purpleToBlue"
      outline
      className=" z-50 flex justify-end sticky left-[75%] top-[95%]"
      pill
    >
      <Link
        to={"/create-income"}
        className=" rounded-2xl text-xs text-gray-800 font-medium "
      >
        New Income
      </Link>
    </Button>
  );
};

export default StartIncomeBtn;
