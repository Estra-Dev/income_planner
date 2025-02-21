import BigLogo from "../components/BigLogo";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const ContactUs = () => {
  return (
    <div className=" max-w-2xl mx-auto min-h-screen p-3">
      <div className=" mt-5 flex flex-col justify-center items-center">
        <BigLogo />
        <div className=" mt-2 p-4 w-full shadow-md bg-lime-600 rounded-md">
          <h1 className=" font-medium text-lg text-white/80 border-white pb-2 border-b">
            Have Questions? We are here to help!
          </h1>
          <div className=" mt-7">
            <p className=" font-medium text-lg text-white/75 mb-2">
              Got Questions, feedback, or need assistance with QuickPlanna?
              Reach out to us-we'd love to hear from you!
            </p>
            <h1 className=" font-medium text-lg mt-7 text-white/80 pb-2">
              Contact Information
            </h1>
            <p className=" font-medium text-lg text-blue-600/75 mb-2">
              <span className=" font-medium text-white">Email: </span>
              <a href="mailto:dominionib@gmail.com">dominionib@gmail.com</a>
            </p>
            <div className=" font-medium text-lg text-blue-600/75 mb-2">
              <span className=" font-medium text-white">Social Media: </span>
              <div className=" flex gap-2 items-center">
                <FaLinkedin />
                <a href="https://www.linkedin.com/in/dominion-ikonwa-54348a207">
                  Dominion Ikonwa
                </a>
              </div>
              <div className="flex gap-2 items-center">
                <FaXTwitter />
                <a href="https://x.com/Mr_IntelliSense">@Mr_IntelliSense</a>
              </div>
              <p className=" text-white">
                You can also drop us a Direct Message on{" "}
                <span className=" text-blue-600/75">+234-810-586-0804</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
