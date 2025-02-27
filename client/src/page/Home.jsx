import { Button, Modal } from "flowbite-react";
import { Link } from "react-router-dom";
import BigLogo from "../components/BigLogo";
import { useEffect, useState } from "react";
import Review from "../components/Review";
import Reviews from "../components/Reviews";
import axios from "axios";
import { useSelector } from "react-redux";

const Home = () => {
  const [allowReview, setAllowReview] = useState(false);
  const [reviewMsg, setReviewMsg] = useState("");
  const [reviewStatus, setReviewStatus] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [showMore, setShowMore] = useState(false);
  const [reviews, setReviews] = useState([]);

  const getReviews = async () => {
    try {
      const res = await axios.get(`/api/review/getreviews`);
      if (res.status === 200) {
        setReviews(res.data);
        console.log("data", res.data);
        if (res.data.length < 5) {
          setShowMore(false);
        } else {
          setShowMore(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(reviews);

  useEffect(() => {
    getReviews();
  }, [reviewMsg]);

  const handleShowMore = async () => {
    const startIndex = reviews.length;

    try {
      const res = await axios.get(
        `/api/review/getreviews?startIndex=${startIndex}`
      );
      if (res.status === 200) {
        setReviews((prev) => [...prev, ...res.data]);
        if (reviews.length < 5) {
          setShowMore(false);
        } else {
          setShowMore(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" max-w-2xl mx-auto min-h-screen p-3 flex flex-col gap-3 items-start mt-5">
      <div className=" mt-2 p-4 w-full shadow-md bg-black/5 rounded-md">
        <h1 className=" font-medium text-xl text-gray-700/85 border-blue-600/50 pb-2 border-b-2">
          Financial planning is a crucial process for managing your finances to
          achieve your life goals.
        </h1>
        <Button size="xs" color="blue" className=" mt-9" outline>
          <Link
            to={"/create-income"}
            className=" rounded-2xl text-xs font-medium "
          >
            Start Planning
          </Link>
        </Button>
      </div>
      <div className=" mt-2 p-4 w-full shadow-md bg-lime-600 rounded-md">
        <p className=" font-medium text-sm text-white/80 border-white pb-2 border-b">
          Track your income and expenses to understand where your money is
          going.
        </p>
        <div className=" mt-7">
          <h1 className=" font-medium text-lg text-white mb-2">
            Use the 50/30/20 rule as a guideline:
          </h1>
          <ul className=" text-white/80">
            <li>50% for needs (rent, utilities, groceries).</li>
            <li>30% for wants (entertainment, dining out).</li>
            <li>20% for savings and debt repayment.</li>
          </ul>
        </div>
      </div>
      <div className=" flex flex-col items-center mt-7 justify-center w-full">
        <BigLogo />

        <Button size="xs" color="blue" className=" mt-7" outline>
          <Link
            to={"/create-income"}
            className=" rounded-2xl text-xs font-medium "
          >
            Start Planning
          </Link>
        </Button>
      </div>
      <div className=" my-2 mt-7 p-2 w-full shadow-md bg-black/5 rounded-md flex flex-col gap-1 justify-start items-start">
        {currentUser && currentUser.numberOfReview < 2 ? (
          <button
            onClick={() => {
              setAllowReview(true);
            }}
            // disabled={disable}
            className=" text-white bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-xs px-2 py-2 text-center me-2 mb-2"
          >
            Give your Review
          </button>
        ) : (
          <p className="text-gray-800 p-1 text-center text-lg font-medium">
            Users Review
          </p>
        )}
        {reviewStatus && (
          <h2 className=" text-lime-600 p-1 bg-lime-600/20 text-sm rounded-sm">
            {reviewMsg}
          </h2>
        )}
        <div className=" w-full">
          <Reviews reviews={reviews} />
          {showMore && (
            <Button
              onClick={handleShowMore}
              color="gray"
              size="xs"
              className=" mt-4"
            >
              See More
            </Button>
          )}
        </div>
      </div>

      <Modal
        show={allowReview}
        onClose={() => setAllowReview(false)}
        size="md"
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <Review
            setAllowReview={setAllowReview}
            setReviewMsg={setReviewMsg}
            setReviewStatus={setReviewStatus}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Home;
