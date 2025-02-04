import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal } from "flowbite-react";

const Plans = ({ onIncome }) => {
  const [plans, setPlans] = useState([]);
  const [modal, setModal] = useState(false);

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

  const handleDelete = async (planId) => {
    try {
      const res = await axios.delete(`/api/plan/deleteplan/${planId}`);
      console.log(res);
      if (res.status === 200) {
        setPlans((prev) => {
          prev.filter((plan) => plan._id !== planId);
        });
        getPlans();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return plans && plans.length < 1 ? (
    <h1>No Plans yet</h1>
  ) : (
    plans &&
      plans.map((plan) => (
        <div
          className=" w-full flex flex-col p-2 shadow-md pb-2"
          key={plan._id}
        >
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
              <span onClick={() => setModal(true)}>Delete</span>
            </div>
          </div>
          <Modal show={modal} onClose={() => setModal(false)} size="xs" popup>
            <Modal.Header />
            <Modal.Body>
              <div className="flex flex-col justify-center items-center">
                <h1 className=" font-medium text-lg text-center">
                  Are you sure you want to delete this plan?
                </h1>
                <span className=" flex gap-3 mt-5">
                  <Button size="xs" outline color="gray">
                    Cancel
                  </Button>
                  <Button
                    size="xs"
                    onClick={() => handleDelete(plan._id)}
                    color="failure"
                  >
                    Delete
                  </Button>
                </span>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      ))
  );
};

export default Plans;
