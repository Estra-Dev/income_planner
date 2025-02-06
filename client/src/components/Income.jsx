import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Plans from "./Plans";

const Income = () => {
  const { incomeId } = useParams();
  const [income, setIncome] = useState("");

  const getIncome = async () => {
    try {
      const res = await axios.get(`/api/income/get-income/${incomeId}`);
      console.log("first", res);
      if (res.status === 200) {
        setIncome(res.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(income);
  useEffect(() => {
    getIncome();
  }, []);

  return (
    income && (
      <div className=" min-h-screen max-w-2xl mx-auto p-2 flex flex-col mt-1 relative">
        <div className=" bg-gray-200 w-full p-3 border-b-2 border-gray-900/50 mt-2">
          <h1 className=" font-bold text-3xl text-gray-900/60 mb-2">
            {income.name}
          </h1>
          <span className=" flex gap-2 text-3xl font-medium text-gray-700">
            <h1>Income:</h1>
            <p className=" text-white bg-black/15 px-2">
              {income.currency +
                " " +
                income.incomeAmount
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
            </p>
          </span>
          <span className=" flex gap-2 text-sm font-medium text-gray-700 mt-2">
            <h1>Remainiing Balance:</h1>
            <p className=" font-bold border-b-2 border-gray-900">
              {income.currency +
                " " +
                income.incomeAmount
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
            </p>
          </span>
        </div>
        <div className=" mt-3">
          <h1 className=" text-xl font-bold text-gray-800/85">My Plans</h1>

          <div className=" my-7 flex flex-col gap-3">
            <Plans onIncome={income} />
          </div>
        </div>

        <div className=" sticky right-0 bottom-0 flex justify-end w-full z-50">
          <Link
            to={`/add-plan/${incomeId}`}
            className=" border border-blue-600 p-2 rounded-xl text-sm font-semibold cursor-pointer"
          >
            Set Plan
          </Link>
        </div>
      </div>
    )
  );
};

export default Income;
