import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const DashSideBar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location]);
  return (
    <div className=" max-w-2xl text-sm w-full border-b-2 text-gray-600 mx-auto pt-3 flex justify-center">
      <Link
        to={"/dashboard?tab=main"}
        className={`text-center flex-1 pb-1 cursor-pointer ${
          tab === "main" &&
          "border-b-2 border-lime-600 text-gray-800 font-medium"
        }`}
      >
        Dashboard
      </Link>
      <Link
        to={"/dashboard?tab=profile"}
        className={`text-center pb-1 flex-1 cursor-pointer ${
          tab === "profile" &&
          "border-b-2 border-lime-600 text-gray-800 font-medium"
        }`}
      >
        My Profile
      </Link>
    </div>
  );
};

export default DashSideBar;
