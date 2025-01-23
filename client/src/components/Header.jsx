import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar className=" sticky border-b-2 top-0 left-0 z-50">
      <Link
        to={"/"}
        className=" self-center whitespace-nowrap text-sm sm:text-xl font-semibold font-sans text-gray-900"
      >
        <span className=" text-xl sm:text-2xl">Income</span>Planner
      </Link>
      <div className=" flex gap-2 md:order-2">
        <Link to={"/sign-up"}>
          <Button
            size="xs"
            className=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"
          >
            Sign Up
          </Button>
        </Link>
        <Dropdown
          arrowIcon={false}
          inline
          label={<Avatar rounded />}
        ></Dropdown>
      </div>
    </Navbar>
  );
};

export default Header;
