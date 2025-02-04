import axios from "axios";
import { useEffect, useState } from "react";

const Plans = ({ onIncome }) => {
  const [plans, setPlans] = useState([]);

  console.log("ink", onIncome);

  const getPlans = async () => {
    try {
      const res = await axios.get(`/api/plan/get-plans/${onIncome._id}`);
      console.log("first12", res.data);
      if (res.status === 200) {
        setPlans(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);
  return plans < 0 ? (
    <h1>No Plans yet</h1>
  ) : (
    plans.map((plan) => (
      <div className=" w-full flex flex-col p-2 shadow-md pb-2" key={plan._id}>
        <span className=" flex mb-1">
          <h1 className="  font-medium text-gray-700 text-lg border-b-2 border-black/80">
            {plan.name}
          </h1>
        </span>
        <div className=" flex justify-between gap-3 items-end text-gray-900 font-medium text-sm">
          <p className=" flex-1">{plan.description}</p>
          <p className=" text-red-600 font-bold">
            {onIncome.currency} {plan.amount}
          </p>
          <div className=" flex gap-2">
            <h1>Edit</h1>
            <h1>Delete</h1>
          </div>
        </div>
      </div>
    ))
  );
};

export default Plans;
