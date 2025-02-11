import { Avatar, Button, Dropdown, Modal, Navbar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { signOutSuccess } from "../redux/user/userSlice";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const path = useLocation().pathname;
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  const signOut = async () => {
    try {
      const res = await axios.post(`/api/auth/signout`);
      if (res.status === 200) {
        setModal(false);
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar className=" sticky border-b-2 top-0 left-0 z-50 px-5">
      <Link
        to={"/"}
        className=" self-center whitespace-nowrap text-sm sm:text-xl font-semibold font-sans text-gray-900"
      >
        <span className=" text-xl sm:text-2xl">Income</span>Planner
      </Link>
      {/* <div className=" flex flex-1"></div> */}
      <div className=" flex gap-2 md:order-2">
        {!currentUser ? (
          <Link to={"/sign-in"}>
            <Button
              size="xs"
              className=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"
            >
              Sign In
            </Button>
          </Link>
        ) : (
          <Dropdown
            arrowIcon={true}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <div className=" flex gap-2">
                <div className=" h-10 w-10 rounded-full overflow-hidden object-cover">
                  <img
                    src={currentUser.profilePicture}
                    className=" w-full h-full"
                    alt="user"
                  />
                </div>
                <div className=" flex flex-col gap-1">
                  <span className=" block text-xs font-medium">
                    {currentUser.username}
                  </span>
                  <Link
                    to={`/dashboard?tab=profile`}
                    className=" rounded-lg border p-[1px] px-[2px] font-medium text-xs border-blue-600 text-blue-600"
                  >
                    Goto Profile
                  </Link>
                </div>
              </div>
            </Dropdown.Header>
            <Dropdown.Item>
              <span className=" block text-xs font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Item>

            <Dropdown.Divider />
            <Dropdown.Item onClick={() => setModal(true)}>
              Sign Out
            </Dropdown.Item>
          </Dropdown>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as={"div"} active={path === "/"}>
          <Link to={"/"} className=" text-[11px] font-medium">
            HOME
          </Link>
        </Navbar.Link>
        <Navbar.Link as={"div"} active={path === "/about"}>
          <Link to={"/about"} className=" text-[11px] font-medium">
            ABOUT
          </Link>
        </Navbar.Link>
        <Navbar.Link as={"div"} active={path === "/contact-us"}>
          <Link to={"/contact-us"} className=" text-[11px] font-medium">
            CONTACT US
          </Link>
        </Navbar.Link>
        <Navbar.Link as={"div"} active={path === "/my-incomes"}>
          <Link
            to={`/my-incomes/${currentUser._id}`}
            className=" text-[11px] font-medium"
          >
            MY INCOMES
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>

      <Modal show={modal} onClose={() => setModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <p className=" font-medium text-center text-2xl text-gray-700">
            Signing Out?
          </p>
          <div className=" flex gap-4 justify-center mt-3">
            <Button outline color="failure" size="xs" onClick={signOut}>
              Sign Out
            </Button>
            <Button size="xs" onClick={() => setModal(false)}>
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Navbar>
  );
};

export default Header;
