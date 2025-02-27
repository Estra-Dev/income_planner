const Reviews = ({ reviews }) => {
  return (
    <div className=" mt-2 border-t-2 border-lime-600 p-1 w-full">
      {reviews.length > 0 &&
        reviews.map((review) => (
          <div
            className=" shadow-sm shadow-black/10 rounded-md mt-2 p-2"
            key={review._id}
          >
            <h1 className=" text-xs font-medium text-gray-900">
              {review.userId || review.username}
            </h1>
            <p className=" text-sm text-gray-700 mt-1">
              {"_" + " " + review.content}
            </p>
          </div>
        ))}
    </div>
  );
};

export default Reviews;
