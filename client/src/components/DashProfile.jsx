import { useDispatch, useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { updateSuccess } from "../redux/user/userSlice";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [details, setDetails] = useState({});
  const [editField, setEditField] = useState(false);
  const [imageFile, setImageFile] = useState("");
  const [imageFileUrl, setImageFileUrl] = useState("");
  const [fileUploadProgress, setFileUploadProgress] = useState(null);
  const [fileUploadError, setFileUploadError] = useState(null);
  const filePicker = useRef();
  const dispatch = useDispatch();

  const handleChanges = (ev) => {
    const { name, value } = ev.target;
    setDetails({ ...details, [name]: value.trim(1) });
  };

  const handleImageChange = (ev) => {
    const file = ev.target.files[0];
    console.log("file", file);
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (Object.keys(details).length === 0) {
      return toast.success("No Changes made");
    }

    try {
      const res = await axios.put(
        `/api/user/update/${currentUser._id}`,
        details,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        console.log("data", res.data);
        dispatch(updateSuccess(res.data));
        setEditField(false);
        setImageFile("");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    setFileUploadError(null);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setFileUploadProgress(null);
        setFileUploadError(
          `Could not complete upload, file must be an image with size less than 10MB.`
        );
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageFileUrl(downloadUrl);
          setDetails({ ...details, profilePicture: downloadUrl });
          setFileUploadProgress(null);
        });
      }
    );
  };

  return (
    <div className=" min-h-screen max-w-2xl mx-auto p-3 flex flex-col justify-start items-start mt-6 shadow-sm">
      <div className=" w-[300px] bg-red-500 h-[300px] rounded-full overflow-hidden relative ">
        {fileUploadProgress && (
          <CircularProgressbar
            value={fileUploadProgress || 0}
            text={`${fileUploadProgress}%`}
            strokeWidth={3}
            styles={{
              root: {
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
              },
              path: {
                stroke: `rgba(120, 200, 100, ${fileUploadProgress / 50})`,
              },
            }}
          />
        )}
        <img
          src={imageFileUrl || currentUser.profilePicture}
          className={` w-full h-full object-cover ${
            fileUploadProgress && "opacity-60"
          }`}
          alt="userProfile"
          onClick={() => filePicker.current.click()}
        />
      </div>
      {fileUploadError && (
        <Alert color="failure" className=" mt-5">
          {fileUploadError}
        </Alert>
      )}
      {imageFile && (
        <Button
          type="button"
          disabled={fileUploadProgress}
          onClick={handleSubmit}
        >
          Upload
        </Button>
      )}
      <input
        hidden
        type="file"
        onChange={handleImageChange}
        ref={filePicker}
        accept="image/*"
      />
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
