import axios from "axios";
import { Button, Spinner, Textarea, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddPlan = () => {
  const [plan, setPlan] = useState({});
  const { incomeId } = useParams();
  const [income, setIncome] = useState("");
  const navigate = useNavigate();
  const [btn, setBtn] = useState(false);

  const getIncome = async () => {
    try {
      const res = await axios.get(`/api/income/get-income/${incomeId}`);

      if (res.status === 200) {
        setIncome(res.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getIncome();
  }, []);

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setPlan({ ...plan, [name]: value });
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setBtn(true);
    try {
      const res = await axios.post(`/api/plan/create/${income._id}`, plan, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 201) {
        setBtn(false);
        navigate(`/income/${income.slug}`);
      }
    } catch (error) {
      setBtn(false);
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
          <Button disabled={btn} type="submit" className=" bg-blue-950 w-full">
            {btn ? (
              <>
                <Spinner />
                <span className=" ml-1">Creating...</span>
              </>
            ) : (
              <p>Create</p>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddPlan;
