import React from "react";
import NavigationBar from "../components/NavigationBar";
import { useNavigate } from "react-router-dom";
import { scaleIn } from "../animations";
import { RiArrowGoBackLine } from "react-icons/ri";
import { motion } from "framer-motion";
export default function ErrorPage() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <NavigationBar />
      <div className="w-full flex justify-center mt-15">
        <motion.div
          {...scaleIn}
          className="flex justify-center items-center bg-white w-72 min-h-20 rounded-lg shadow shadow-black/50 flex-col gap-3 p-3"
        >
          <h1 className="text-2xl text-center text-red-600">Page Not Found!</h1>
          <button
            onClick={goBack}
            className="shadow shadow-black/50 text-nowrap px-3 py-2 rounded cursor-pointer select-none hover:scale-97 flex justify-center items-center gap-3"
          >
            Go Back <RiArrowGoBackLine className="text-xl" />
          </button>
        </motion.div>
      </div>
    </>
  );
}
