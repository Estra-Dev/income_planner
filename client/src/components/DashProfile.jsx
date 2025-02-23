import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { Button, TextInput } from "flowbite-react";
import { useState } from "react";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [details, setDetails] = useState({});
  const [editField, setEditField] = useState(false);

  const handleChanges = (ev) => {
    const { name, value } = ev.target;
    setDetails({ ...details, [name]: value.trim(1) });
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    // try {
    //   const res = await axios.post(`/api/auth/signup`, details, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   if (res.status === 201) {
    //     navigate("/sign-in");
    //     toast.success(res.data.message);
    //   }
    // } catch (error) {
    //   toast.error(error.response.data.message);
    // }
  };

  return (
    <div className=" min-h-screen max-w-2xl mx-auto p-3 flex flex-col justify-start items-start mt-6 shadow-sm">
      <div className=" w-[300px] bg-red-500 h-[300px] rounded-full overflow-hidden object-cover">
        <img
          src={currentUser.profilePicture}
          className=" w-full h-full"
          alt="userProfile"
        />
      </div>
      <div
        className=" flex flex-col w-full px-7 p-2 gap-2 my-3 border-b-2"
        onClick={() => setEditField(false)}
      >
        <div className=" flex gap-2 items-center">
          <FaUser className=" text-gray-700 w-7 h-7" />
          <p className=" font-medium text-xl text-gray-700">~</p>
          <h1 className=" font-medium text-gray-700">{currentUser.username}</h1>
        </div>
        <div className=" flex gap-2 items-center">
          <MdMarkEmailRead className=" text-gray-700 w-7 h-7" />
          <p className=" font-medium text-xl text-gray-700">~</p>
          <h1 className=" font-medium text-gray-700">{currentUser.email}</h1>
        </div>
      </div>
      <Button
        onClick={() => setEditField(true)}
        className=" bg-lime-600 text-white font-medium"
        disabled={editField}
      >
        Edit Profile
      </Button>
      {editField && (
        <div className=" w-full mt-7">
          <form className=" w-full" onSubmit={handleSubmit}>
            <div className=" w-full flex flex-col gap-2 text-gray-700">
              <label htmlFor="email">Email:</label>
              <TextInput
                type="text"
                placeholder="e.g@company.com"
                name="email"
                value={details.email || currentUser.email}
                onChange={handleChanges}
              />
            </div>
            <div className=" w-full flex flex-col gap-2 text-gray-700 mt-2">
              <label htmlFor="username">Username:</label>
              <TextInput
                type="text"
                name="username"
                value={details.username || currentUser.username}
                placeholder="username"
                onChange={handleChanges}
              />
            </div>
            <div className=" w-full flex flex-col gap-2 text-gray-700 mt-2">
              <label htmlFor="password">Password:</label>
              <TextInput
                type="password"
                name="password"
                placeholder="*************"
                onChange={handleChanges}
              />
            </div>
            <Button
              type="submit"
              className=" w-full mt-3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"
            >
              Update Profile
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DashProfile;
