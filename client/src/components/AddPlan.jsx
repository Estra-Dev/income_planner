import axios from "axios";
import { Button, Textarea, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddPlan = () => {
  const [plan, setPlan] = useState({});
  const { incomeId } = useParams();
  const [income, setIncome] = useState("");
  const navigate = useNavigate();

  console.log("parram", incomeId);
  const getIncome = async () => {
    try {
      const res = await axios.get(`/api/income/get-income/${incomeId}`);
      console.log("first2", res);
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

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setPlan({ ...plan, [name]: value });
  };
  console.log(plan);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const res = await axios.post(`/api/plan/create/${income[0]._id}`, plan, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("plan", res);
      if (res.status === 201) {
        navigate(`/income/${income[0].slug}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" min-h-screen max-w-2xl mx-auto flex flex-col justify-center gap-9">
      <h1 className=" font-medium text-3xl text-gray-700 text-center">
        Set your plans according to your income
      </h1>
      <form
        className=" w-full text-gray-600 font-medium"
        onSubmit={handleSubmit}
      >
        <div className=" flex p-2 mt-2 gap-2">
          <div className=" flex flex-col gap-2 justify-center flex-1">
            <label htmlFor="income name">Plan Name</label>
            <TextInput
              type="text"
              name="name"
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
              placeholder="100"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className=" w-full mt-7 px-3">
          <Button type="submit" className=" bg-blue-950 w-full">
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddPlan;
