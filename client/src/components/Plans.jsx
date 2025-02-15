import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal } from "flowbite-react";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useSelector } from "react-redux";
import Plan from "./Plan";
import { Link } from "react-router-dom";

const Plans = ({ onIncome }) => {
  const [plans, setPlans] = useState([]);
  const [modal, setModal] = useState(false);
  // const [editModal, setEditModal] = useState(false);

  const [planId, setPlanId] = useState("");
  const [planName, setPlanName] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  console.log("ink", onIncome);

  const getPlans = async () => {
    try {
      const res = await axios.get(
        `/api/plan/get-plans?incomeId=${onIncome._id}`
      );
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

  const handleDelete = async (planId) => {
    try {
      const res = await axios.delete(
        `/api/plan/deleteplan/${planId}/${currentUser._id}`
      );
      console.log(res);
      if (res.status === 200) {
        setModal(false);
        toast.success(res.data);
        setPlans((prev) => {
          prev.filter((plan) => plan._id !== planId);
        });
        getPlans();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      {plans && plans.length < 1 ? (
        <div className=" max-w-2xl mx-auto flex flex-col justify-center items-center gap-3">
          <h1 className=" text-xl text-center mt-11">No Plans yet</h1>
          <Button
            size="xs"
            gradientDuoTone="purpleToBlue"
            outline
            className=""
            pill
          >
            <Link
              to={"/create-income"}
              className=" rounded-2xl text-xs text-gray-800 font-medium "
            >
              Create your first Income
            </Link>
          </Button>
        </div>
      ) : (
        plans &&
        plans.map((plan) => (
          <div key={plan._id}>
            <Plan
              plan={plan}
              onIncome={onIncome}
              onDelete={(planId, planName) => {
                setModal(true);
                setPlanId(planId);
                setPlanName(planName);
              }}
              onEdit={(planId) => {
                // setEditModal(true);
                setPlanId(planId);
              }}
            />
          </div>
        ))
      )}
      <Modal show={modal} onClose={() => setModal(false)} size="xs" popup>
        <Modal.Header />
        <Modal.Body>
          <div className="flex flex-col justify-center items-center">
            <h1 className=" font-medium text-lg text-center">
              Are you sure you want to remove plan for {planName}?
            </h1>
            <span className=" flex gap-3 mt-5">
              <Button
                size="xs"
                outline
                color="gray"
                onClick={() => setModal(false)}
              >
                Cancel
              </Button>
              <Button
                size="xs"
                onClick={() => handleDelete(planId)}
                color="failure"
              >
                Delete
              </Button>
            </span>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Plans;
