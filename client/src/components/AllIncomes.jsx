import axios from "axios";
import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { LuNotebookPen } from "react-icons/lu";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const AllIncomes = () => {
  const [incomes, setIncomes] = useState([]);
  const [search, setSearch] = useState({
    name: "",
    currency: "",
    type: "",
  });
  const { userId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  const allIncomes = async () => {
    try {
      const res = await axios.get(`/api/income/get-incomes?userId=${userId}`);
      if (res.status === 200) {
        setIncomes(res.data.incomes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setSearch({ ...search, [name]: value });
  };

  useEffect(() => {
    allIncomes();

    const searchParams = new URLSearchParams(location.search);
    const nameFromUrlParams = searchParams.get("name");
    if (nameFromUrlParams) {
      setSearch({ ...search, name: nameFromUrlParams });
    }
  }, []);

  console.log(search);

  const searchIncome = async (ev) => {
    ev.preventDefault();
    const urlParam = new URLSearchParams(location.search);
    urlParam.set("name", search.name);
    const searchQuery = urlParam.toString();
    navigate(`/my-incomes/${currentUser._id}?name=${search.name}`);

    try {
      const res = await axios.get(`/api/income/get-incomes?${searchQuery}`);
      if (res.status === 200) {
        setIncomes(res.data.incomes);
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" max-w-2xl mx-auto mt-4 p-3">
      <div className=" px-2 py-1 rounded-l-none rounded-3xl max-w-[200px] w-[100%] truncate flex items-center gap-2 bg-blue-950">
        <div className=" w-8 h-8 rounded-full overflow-hidden object-cover ">
          <img
            src={currentUser.profilePicture}
            alt=""
            className=" w-full h-full"
          />
        </div>
        <p className=" font-medium text-sm text-white">
          {currentUser.username}
        </p>
      </div>
      <div className=" mt-3">
        <h1 className=" font-medium text-2xl text-gray-700">
          Search incomes by:
        </h1>
        <form onSubmit={searchIncome} className=" mt-2 w-full">
          <div className=" flex gap-3">
            <TextInput
              type="text"
              name="name"
              placeholder="Search income name..."
              className=" flex-1"
              value={search.name}
              onChange={handleChange}
            />
            <TextInput
              type="text"
              name="currency"
              placeholder="currency"
              className=" w-[20%]"
            />
            <Select name="type">
              <option value="monthly">Monthly</option>
              <option value="monthly">Weekly</option>
              <option value="monthly">Daily</option>
            </Select>
          </div>
          <Button type="submit" onClick={searchIncome}>
            SEarch
          </Button>
        </form>
      </div>

      <div className=" mt-5">
        {incomes.length > 0 ? (
          incomes.map((income) => (
            <Link
              to={`/income/${income.slug}`}
              key={income._id}
              className=" w-full flex justify-between mt-2 bg-blue-950 p-2"
            >
              <div className=" flex-1 flex gap-2 items-center">
                <LuNotebookPen className=" h-7 w-7 text-white font-medium" />
                <div className="">
                  <h1 className=" font-medium text-lg text-white">
                    {income.name}
                  </h1>
                  <span className=" flex gap-2 text-xs font-medium text-white">
                    <h1>Income:</h1>
                    <p className=" font-bold border-b-2 border-white">
                      {income.currency +
                        " " +
                        income.incomeAmount
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                    </p>
                  </span>
                </div>
              </div>

              <span className=" flex items-end gap-2 text-white font-medium text-xs">
                <p>Created at:</p>
                <p>{new Date(income.createdAt).toLocaleDateString()}</p>
              </span>
            </Link>
          ))
        ) : (
          <div className=" flex justify-center items-center">
            <h1>No income.</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllIncomes;
