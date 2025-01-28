import { useSelector } from "react-redux";
import { LuNotebookPen } from "react-icons/lu";
import { Link } from "react-router-dom";
import StartIncomeBtn from "./StartIncomeBtn";

const DashMain = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className=" min-h-screen max-w-2xl mx-auto py-2 px-2 flex flex-col mt-1 shadow-sm relative">
      <div className=" px-2 py-1 rounded-l-none rounded-3xl max-w-[200px] w-[100%] truncate flex items-center gap-2 bg-blue-950">
        <div className=" w-5 h-5 rounded-full overflow-hidden object-cover ">
          <img
            src={currentUser.profilePicture}
            alt=""
            className=" w-full h-full"
          />
        </div>
        <p className=" font-medium text-xs text-white">
          {currentUser.username}
        </p>
      </div>
      <div className=" bg-gray-200 w-full p-3 border-b-2 border-gray-900/50 mt-2">
        <span className=" flex gap-2 text-3xl font-medium text-gray-700">
          <h1>Income:</h1>
          <p className=" text-white bg-black/15 px-2">$1200.00</p>
        </span>
        <span className=" flex gap-2 text-sm font-medium text-gray-700 mt-2">
          <h1>Remainiing Balance:</h1>
          <p className=" font-bold border-b-2 border-gray-900">$400.00</p>
        </span>
      </div>
      <div className=" flex flex-wrap w-full justify-around p-3 border-b-2">
        <div className=" w-[45%] mt-2 border-b-2 pb-2 border rounded-md bg-blue-950">
          <div className=" w-full flex justify-center items-center py-5 ">
            <h1 className=" text-[4rem] font-medium font-sans text-white">
              10
            </h1>
          </div>
          <p className=" text-center text-xs text-white">Total Plans</p>
        </div>
        <div className=" w-[45%] mt-2 border-b-2 pb-2 border rounded-md bg-blue-950">
          <div className=" w-full flex justify-center items-center py-5 ">
            <h1 className=" text-[4rem] font-medium font-sans text-white">7</h1>
          </div>
          <p className=" text-center text-xs text-white">
            Plans since 7 days Ago
          </p>
        </div>
        <div className=" w-[45%] mt-2 border-b-2 pb-2 border rounded-md bg-blue-950">
          <div className=" w-full flex justify-center items-center py-5 ">
            <h1 className=" text-[4rem] font-medium font-sans text-white">4</h1>
          </div>
          <p className=" text-center text-xs text-white">Completed Plans</p>
        </div>
        <div className=" w-[45%] mt-2 border-b-2 pb-2 border rounded-md bg-blue-950">
          <div className=" w-full flex justify-center items-center py-5 ">
            <h1 className=" text-[4rem] font-medium font-sans text-white">6</h1>
          </div>
          <p className=" text-center text-xs text-white">Running Plans</p>
        </div>
      </div>
      <div className=" w-full mt-5 p-3">
        <div className=" flex justify-between items-end">
          <span>
            <h1 className=" text-3xl font-medium text-gray-800">History</h1>
            <p className=" font-medium text-gray-800/75">
              Plans since 7 days ago
            </p>
          </span>
          <Link className=" border border-blue-600 text-gray-700 font-medium text-xs rounded-2xl p-2">
            All Plans
          </Link>
        </div>
        <div className=" w-full py-3 px-2 mt-2 bg-gray-200/65 flex flex-col">
          <div className=" w-full flex justify-between mt-2 bg-blue-950 p-2">
            <div className=" flex-1 flex gap-2 items-center">
              <LuNotebookPen className=" h-7 w-7 text-white font-medium" />
              <div className="">
                <h1 className=" font-medium text-lg text-white">Salary Plan</h1>
                <span className=" flex gap-2 text-xs font-medium text-white">
                  <h1>Income:</h1>
                  <p className=" font-bold border-b-2 border-white">$1200.00</p>
                </span>
              </div>
            </div>

            <span className=" flex items-end gap-2 text-white font-medium text-xs">
              <p>Created at:</p>
              <p>27/01/2025</p>
            </span>
          </div>
          <div className=" w-full flex justify-between mt-2 bg-blue-950 p-2">
            <div className=" flex-1 flex gap-2 items-center">
              <LuNotebookPen className=" h-7 w-7 text-white font-medium" />
              <div className="">
                <h1 className=" font-medium text-lg text-white">Salary Plan</h1>
                <span className=" flex gap-2 text-xs font-medium text-white">
                  <h1>Income:</h1>
                  <p className=" font-bold border-b-2 border-white">$1200.00</p>
                </span>
              </div>
            </div>

            <span className=" flex items-end gap-2 text-white font-medium text-xs">
              <p>Created at:</p>
              <p>27/01/2025</p>
            </span>
          </div>
          <div className=" w-full flex justify-between mt-2 bg-blue-950 p-2">
            <div className=" flex-1 flex gap-2 items-center">
              <LuNotebookPen className=" h-7 w-7 text-white font-medium" />
              <div className="">
                <h1 className=" font-medium text-lg text-white">Salary Plan</h1>
                <span className=" flex gap-2 text-xs font-medium text-white">
                  <h1>Income:</h1>
                  <p className=" font-bold border-b-2 border-white">$1200.00</p>
                </span>
              </div>
            </div>

            <span className=" flex items-end gap-2 text-white font-medium text-xs">
              <p>Created at:</p>
              <p>27/01/2025</p>
            </span>
          </div>
        </div>
      </div>
      <StartIncomeBtn />
    </div>
  );
};

export default DashMain;
