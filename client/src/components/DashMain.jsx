import { useSelector } from "react-redux";
import { LuNotebookPen } from "react-icons/lu";
import { Link } from "react-router-dom";
import StartIncomeBtn from "./StartIncomeBtn";
import axios from "axios";
import { useEffect, useState } from "react";

const DashMain = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [incomes, setIncomes] = useState([]);
  const [incomeInfo, setIncomeInfo] = useState(null);

  const getIncomes = async () => {
    try {
      const res = await axios.get(
        `/api/income/get-incomes?userId=${currentUser._id}`
      );
      if (res.status === 200) {
        setIncomes(res.data.incomes);
        setIncomeInfo(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getIncomes();
  }, []);

  return (
    <div className=" min-h-screen max-w-2xl mx-auto p-2 mt-1 shadow-sm relative">
      <StartIncomeBtn />
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
      {/* <div className=" bg-gray-200 w-full p-3 border-b-2 border-gray-900/50 mt-2">
        <span className=" flex gap-2 text-3xl font-medium text-gray-700">
          <h1>Tot. Income:</h1>
          <p className=" text-white bg-black/15 px-2">$1200.00</p>
        </span>
        <span className=" flex gap-2 text-sm font-medium text-gray-700 mt-2">
          <h1>Tot. Remainiing Balance:</h1>
          <p className=" font-bold border-b-2 border-gray-900">$400.00</p>
        </span>
      </div> */}
      <div className=" flex flex-wrap w-full justify-around p-3 border-b-2">
        <div className=" w-[45%] mt-2 border-b-2 pb-2 border rounded-md bg-blue-950">
          <div className=" w-full flex justify-center items-center py-5 ">
            <h1 className=" text-[4rem] font-medium font-sans text-white">
              {incomes && incomes.length}
            </h1>
          </div>
          <p className=" text-center text-xs text-white">Total Plans</p>
        </div>
        <div className=" w-[45%] mt-2 border-b-2 pb-2 border rounded-md bg-blue-950">
          <div className=" w-full flex justify-center items-center py-5 ">
            <h1 className=" text-[4rem] font-medium font-sans text-white">
              {incomeInfo && incomeInfo.lastSevenDays}
            </h1>
          </div>
          <p className=" text-center text-xs text-white">
            Plans since 7 days Ago
          </p>
        </div>
        {/* <div className=" w-[45%] mt-2 border-b-2 pb-2 border rounded-md bg-blue-950">
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
        </div> */}
      </div>
      <div className=" w-full mt-5 p-3">
        <div className=" flex justify-between items-end">
          <span>
            <h1 className=" text-3xl font-medium text-gray-800">History</h1>
            <p className=" font-medium text-gray-800/75">
              Recently used Income
            </p>
          </span>
          <Link
            to={`/my-incomes/${currentUser._id}`}
            className=" border border-blue-600 text-gray-700 font-medium text-xs rounded-2xl p-2"
          >
            All Plans
          </Link>
        </div>
        <div className=" w-full py-3 px-2 mt-2 bg-gray-200/65 flex flex-col">
          {incomes.length > 0 ? (
            incomes.map((income) => (
              <Link
                to={`/income/${income.slug}`}
                key={income._id}
                className=" w-full flex justify-between mt-2 bg-blue-950 p-2"
              >
                <div className=" flex-1 flex gap-2 items-center">
                  <LuNotebookPen className=" h-7 w-7 text-white font-medium" />
                  <div className="">
                    <h1 className=" font-medium text-lg text-white">
                      {income.name}
                    </h1>
                    <span className=" flex gap-2 text-xs font-medium text-white">
                      <h1>Income:</h1>
                      <p className=" font-bold border-b-2 border-white">
                        {income.currency + " " + income.incomeAmount}
                      </p>
                    </span>
                  </div>
                </div>

                <span className=" flex items-end gap-2 text-white font-medium text-xs">
                  <p>{new Date(income.updatedAt).toLocaleDateString()}</p>
                </span>
              </Link>
            ))
          ) : (
            <h1 className=" text-center my-6 font-medium text-gray-500">
              No Income Yet!
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashMain;
