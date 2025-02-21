import { Link } from "react-router-dom";
import BigLogo from "../components/BigLogo";
import { useSelector } from "react-redux";
import { Button } from "flowbite-react";

const About = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className=" max-w-2xl mx-auto min-h-screen p-3">
      <div className=" mt-5 flex flex-col justify-center items-center">
        <BigLogo />
        <div className=" mt-2 p-4 w-full shadow-md bg-lime-600 rounded-md">
          <h1 className=" font-medium text-lg text-white/80 border-white pb-2 border-b">
            Take control of your finance with confidence.
          </h1>
          <div className=" mt-7">
            <p className=" font-medium text-lg text-white/75 mb-2">
              Welcome to QuickPlanna, the ultimate tool for planning, tracking,
              and optimizing your income.
            </p>
            <p className=" font-medium text-lg text-white/75 mb-2">
              We designed this platform to help individuals(both enterpreneurs,
              employees, and all kinds of income earners) and businesses gain
              financial clarity, make informed decisions, and achieve their
              financial goals effortlessly.
            </p>
          </div>
        </div>
        <h1 className=" mt-6 text-blue-600 text-2xl font-medium">
          Our Mission
        </h1>
        <div className=" mt-2 p-4 w-full shadow-md bg-lime-600 rounded-md">
          <div className=" mt-7">
            <p className=" font-medium text-lg text-white mb-2">
              We believe financial planning should be simple, accessible, and
              stress-free. <br />
              Our mission is to empower users with intuitve tools that help them
              understand their income sources, manage cash flow, and plan for
              the future.
            </p>
          </div>
        </div>
        <div className=" mt-2 p-4 w-full shadow-md bg-lime-600/10 rounded-md">
          <h1 className=" font-medium text-lg text-black/80  border-black/80 pb-2 border-b">
            Why Choose Us?
          </h1>
          <ul className=" text-black/80 mt-7">
            <li>
              <span className=" font-semibold ">User-Friendly:</span> Easily
              track income, expenses, and savings in one place.
            </li>
            <li className=" mt-3 ">
              <span className=" font-semibold">Smart-insights:</span> Get
              data-driven recommendations to improve your financial health.
            </li>
            <li className=" mt-3 ">
              <span className=" font-semibold">Secure and Private:</span> Your
              financial data is protected with a good security standards.
            </li>
            <li className=" mt-3 ">
              <span className=" font-semibold">Customizable Planning:</span>{" "}
              Tailor income plan to fit your lifestyle and goals.
            </li>
          </ul>
        </div>
        <div className=" mt-2 p-4 w-full shadow-md bg-lime-600 rounded-md">
          <h1 className=" font-medium text-lg text-white  border-white/80 pb-2 border-b">
            Join Us on the Journey
          </h1>
          <p className=" text-white/80 mt-7">
            Whether you are an individual looking to track your income or a
            business optimizing revenue streams, QuickPlanna is here to simplify
            your financial Journey.
          </p>
        </div>
        {!currentUser && (
          <Button
            outline
            pill
            size="sm"
            gradientDuoTone="purpleToBlue"
            className=" my-7"
          >
            <Link to={"/sign-in"}>Get Started Today</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default About;
