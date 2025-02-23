import { Link } from "react-router-dom";

const BigLogo = () => {
  return (
    <div className=" flex flex-col items-center justify-center">
      <Link
        to={"/"}
        className=" self-center whitespace-nowrap text-2xl sm:text-3xl font-semibold font-sans text-blue-600 shadow-sm shadow-gray-800/5 p-1"
      >
        <span className=" text-3xl  font-bold sm:text-4xl text-lime-700/90">
          Quick
        </span>
        Planna
      </Link>
      <i className=" font-medium text-gray-800/75 text-sm">
        Let us help you stick to plan...
      </i>
    </div>
  );
};

export default BigLogo;
