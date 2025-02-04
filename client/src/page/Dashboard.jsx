import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashProfile from "../components/DashProfile";
import DashMain from "../components/DashMain";
import DashSideBar from "../components/DashSideBar";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParam = new URLSearchParams(location.search);
    const tabFromUrl = urlParam.get("tab");

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location]);

  console.log(tab);
  return (
    <div className=" relative">
      <div className="w-full">
        <DashSideBar />
      </div>
      {tab === "profile" && <DashProfile />}
      {tab === "main" && <DashMain />}
    </div>
  );
};

export default Dashboard;
