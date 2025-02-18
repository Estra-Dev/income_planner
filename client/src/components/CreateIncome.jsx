import { Button, Select, Spinner, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CreateIncome = () => {
  const [incomeDetails, setIncomeDetails] = useState({});
  const navigate = useNavigate();
  const [btn, setBtn] = useState(false);

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setIncomeDetails({ ...incomeDetails, [name]: value });
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setBtn(true);
    try {
      const res = await axios.post(`/api/income/create`, incomeDetails, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 201) {
        setBtn(false);
        toast.success("Income Created");
        navigate(`/income/${res.data.slug}`);
      }
    } catch (error) {
      setBtn(false);
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  console.log(incomeDetails);

  return (
    <div className=" min-h-screen max-w-2xl mx-auto flex flex-col justify-center gap-9">
      <h1 className=" font-medium text-3xl text-gray-700 text-center">
        Create your Income
      </h1>
      <form
        className=" w-full text-gray-600 font-medium"
        onSubmit={handleSubmit}
      >
        <div className=" flex p-2 mt-2 gap-2">
          <div className=" flex flex-col gap-2 justify-center flex-1">
            <label htmlFor="income name">Income Name</label>
            <TextInput
              type="text"
              name="name"
              placeholder="E.g: Salary"
              onChange={handleChange}
            />
          </div>
          <div className=" flex flex-col gap-2 justify-center">
            <label htmlFor="income type">Type</label>
            <Select
              name="type"
              value={incomeDetails.type}
              onChange={handleChange}
            >
              <option value={"monthly"}>Monthly</option>
              <option value={"weekly"}>Weekly</option>
              <option value={"daily"}>Daily</option>
            </Select>
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
            <label htmlFor="income amount">Income Amount</label>
            <TextInput
              type="number"
              name="incomeAmount"
              placeholder="10000"
              onChange={handleChange}
            />
          </div>
          <div className=" flex flex-col gap-2 justify-center ">
            <label htmlFor="currency">Currency</label>
            <TextInput
              type="text"
              name="currency"
              placeholder="e.g: USD"
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

export default CreateIncome;
