import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const Plan = ({ plan, onIncome, onDelete, onEdit }) => {
  const [income, setIncome] = useState("");

  const percent = (plan.amount / onIncome.incomeAmount) * 100;

  console.log("dashbo", percent);

  return (
    <div className=" w-full flex flex-col p-2 shadow-md pb-2 border-t-2 border-gray-700/50">
      <span className=" flex mb-1">
        <h1 className="  font-medium text-gray-800 text-lg border-b-2 border-black/80">
          {plan.name}
        </h1>
      </span>
      <div className=" flex justify-between gap-3 items-end text-gray-900 font-medium text-sm">
        <p className=" flex-1 text-gray-700 border p-1 rounded-md">
          {plan.description}
        </p>
        <div className=" flex flex-col items-end gap-[1px]">
          <p
            className={`font-medium text-blue-600/70 ${
              percent > 75 && "text-red-500/70"
            } ${percent < 35 && "text-green-500/70"}`}
          >
            {percent.toFixed(2)}%
          </p>
          <p className=" text-red-600 font-bold text-xs">
            {onIncome.currency}{" "}
            {plan.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
          </p>
        </div>
        <div className=" flex gap-2">
          <Link to={`/edit-myplan/${plan._id}`} className=" cursor-pointer">
            <FaEdit className=" w-5 h-5 text-blue-600/70" />
          </Link>
          <span
            onClick={() => onDelete(plan._id, plan.name)}
            className=" cursor-pointer"
          >
            <MdDelete className=" w-5 h-5 text-red-700/70" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Plan;
