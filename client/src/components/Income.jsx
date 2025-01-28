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

  return <div>Income</div>;
};

export default Income;
