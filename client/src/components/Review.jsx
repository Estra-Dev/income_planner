import { Button, Textarea } from "flowbite-react";
import { useState } from "react";
import BigLogo from "./BigLogo";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateSuccess } from "../redux/user/userSlice";

const Review = ({ setAllowReview, setReviewMsg, setReviewStatus }) => {
  const [review, setReview] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setReview({ ...review, [name]: value });
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const res = await axios.post(`/api/review/create`, review, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 201) {
        // setReviewStatus(true);
        console.log("data", res);
        dispatch(updateSuccess(res.data.rest));
        navigate("/");
        setReviewMsg(`Review sent, thank you ${currentUser.username}!`);
        setAllowReview(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" max-w-xl mx-auto">
      <BigLogo />
      <form className=" mt-6" onSubmit={handleSubmit}>
        <div className=" flex flex-col gap-1 items-end">
          <Textarea
            placeholder="Send your review..."
            onChange={handleChange}
            name="content"
            rows={3}
          />
          <Button gradientDuoTone="purpleToBlue" type="submit" size="xs">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Review;
