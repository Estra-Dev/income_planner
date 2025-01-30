import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Income = () => {
  const { incomeId } = useParams();
  const [income, setIncome] = useState("");

  const getIncome = async () => {
    try {
      const res = await axios.get(`/api/income/get-income/${incomeId}`);
      if (res.status === 200) {
        setIncome(res.data);
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
    <div className=" min-h-screen max-w-2xl mx-auto p-2 flex flex-col mt-1">
      {income && (
        <div className=" bg-gray-200 w-full p-3 border-b-2 border-gray-900/50 mt-2">
          <h1 className=" font-bold text-3xl text-gray-900/60 mb-2">
            {income[0].name}
          </h1>
          <span className=" flex gap-2 text-3xl font-medium text-gray-700">
            <h1>Income:</h1>
            <p className=" text-white bg-black/15 px-2">
              {income[0].currency +
                " " +
                income[0].incomeAmount
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
            </p>
          </span>
          <span className=" flex gap-2 text-sm font-medium text-gray-700 mt-2">
            <h1>Remainiing Balance:</h1>
            <p className=" font-bold border-b-2 border-gray-900">
              {income[0].currency +
                " " +
                income[0].incomeAmount
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
            </p>
          </span>
        </div>
      )}
    </div>
  );
};

export default Income;
