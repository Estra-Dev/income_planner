import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Plans from "./Plans";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useSelector } from "react-redux";
import { Button, Modal } from "flowbite-react";

const Income = () => {
  const { incomeId } = useParams();
  const [income, setIncome] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [deleteModal, setDeleteModal] = useState(false);
  const navigate = useNavigate();

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

  const percent = income && (income.balance / income.incomeAmount) * 100;
  console.log("per", percent);

  console.log(income);
  useEffect(() => {
    getIncome();
  }, []);

  const deleteIncome = async (incomeId) => {
    try {
      const res = await axios.delete(
        `/api/income/deleteincome/${incomeId}/${currentUser._id}`
      );
      if (res.status === 200) {
        toast.success(res.data);
        navigate(`/my-incomes/${currentUser._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                income.balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
            </p>
            <p
              className={` font-medium ${
                percent >= 75 && "text-green-600"
              } text-blue-600 ${percent < 35 && "text-red-600"}${
                percent <= 49 && " text-yellow-400"
              } `}
            >
              ({`${percent.toFixed(2)}%`})
            </p>
          </span>
        </div>
        <div className=" mt-3">
          <h1 className=" text-xl font-bold text-gray-800/85">My Plans</h1>

          <div className=" my-7 flex flex-col gap-3">
            <Plans onIncome={income} />
          </div>
        </div>
        <Button
          onClick={() => setDeleteModal(true)}
          outline
          gradientDuoTone="purpleToBlue"
          className=" mt-10"
        >
          Delete Income
        </Button>

        <div className=" sticky right-0 top-[95%] flex justify-end w-full z-50">
          <Link
            to={`/add-plan/${incomeId}`}
            className=" border-2 border-blue-600 p-2 rounded-xl text-sm font-semibold cursor-pointer bg-blue-700/95 text-white"
          >
            Set Plans
          </Link>
        </div>
        <Modal
          show={deleteModal}
          onClose={() => setDeleteModal(false)}
          size="xs"
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <h1 className=" text-center font-medium text-xl">
              Are you sure you want to delete{" "}
              <span className=" border-b text-blue-600 border-black pb-1">
                {income.name}
              </span>{" "}
              income?
            </h1>
            <span className=" flex gap-3 justify-center mt-4">
              <Button size="xs" outline onClick={() => setDeleteModal(false)}>
                Cancel
              </Button>
              <Button
                size="xs"
                outline
                color="failure"
                onClick={() => deleteIncome(income._id)}
              >
                Delete
              </Button>
            </span>
          </Modal.Body>
        </Modal>
      </div>
    )
  );
};

export default Income;
