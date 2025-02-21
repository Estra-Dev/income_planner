import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div>
      <Link
        to={"/"}
        className=" self-center whitespace-nowrap text-sm sm:text-xl font-semibold font-sans text-blue-600 shadow-sm shadow-gray-800/5 p-1"
      >
        <span className=" text-xl  font-bold sm:text-2xl text-lime-700/90">
          Quick
        </span>
        Planna
      </Link>
    </div>
  );
};

export default Logo;
