import axios from "axios";
import { Button, Spinner, Textarea, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useSelector } from "react-redux";

const UpdatePlan = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [edit, setEdit] = useState({});
  const [plan, setPlan] = useState("");
  const { planId } = useParams();
  const [btn, setBtn] = useState(false);
  const navigate = useNavigate();
  const getPlans = async () => {
    try {
      const res = await axios.get(`/api/plan/get-plans?planId=${planId}`);
      if (res.status === 200) {
        setPlan(res.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setEdit({ ...edit, [name]: value });
  };

  useEffect(() => {
    getPlans();
  }, []);

  const handleEdit = async (ev) => {
    ev.preventDefault();
    setBtn(true);
    if (Object.keys(edit).length === 0) {
      toast.success("No changes made");
      return;
    }
    try {
      const res = await axios.put(
        `/api/plan/editplan/${planId}/${currentUser._id}`,
        edit,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.status === 200) {
        setBtn(false);
        navigate(`/income/${res.data.incomeSlug}`);
      }
    } catch (error) {
      setBtn(false);
      console.log(error);
    }
  };

  return (
    <div>
      {plan && (
        <form
          className=" w-full text-gray-600 font-medium"
          onSubmit={handleEdit}
        >
          <div className=" flex p-2 mt-2 gap-2">
            <div className=" flex flex-col gap-2 justify-center flex-1">
              <label htmlFor="income name">Plan Name</label>
              <TextInput
                type="text"
                name="name"
                value={edit.name || plan.name}
                placeholder="E.g: Transport"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className=" flex p-2 mt-2 gap-2 items-start">
            <div className=" flex flex-col gap-2 justify-center flex-1">
              <label htmlFor="income description">
                Income Description (optional*)
              </label>
              <Textarea
                rows={3}
                name="description"
                value={edit.description || plan.description}
                placeholder="Enter Description"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className=" flex p-2 mt-2 gap-2 items-start">
            <div className=" flex flex-col gap-2 justify-center ">
              <label htmlFor="income amount">Plan Amount</label>
              <input
                type="number"
                name="amount"
                value={edit.amount || plan.amount}
                placeholder="100"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className=" w-full mt-7 px-3">
            <Button
              disabled={btn}
              type="submit"
              className=" bg-blue-950 w-full"
            >
              {btn ? (
                <>
                  <Spinner />
                  <span className=" ml-1">Updating...</span>
                </>
              ) : (
                <p>Update</p>
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdatePlan;
