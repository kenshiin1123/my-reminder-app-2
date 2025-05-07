import React from "react";
import Header from "../components/Header.jsx";
import Clock from "../components/Clock/Index";
import { FaCircleInfo } from "react-icons/fa6";
export default function Homepage() {
  return (
    <>
      <Header>Homepage</Header>
      <Clock />
      <div className="flex justify-center items-center mt-10 flex-col gap-3 mb-20 ">
        <p className="bg-green-400 text-sm text-white p-2 rounded flex justify-center items-center gap-2 mx-3">
          <FaCircleInfo /> Saved locally. Log in to sync.
        </p>
        <div className="flex gap-10">
          <button className="px-3 py-2 w-20 h-10 shadow shadow-gray-600 rounded active:scale-97  text-black">
            Register
          </button>
          <button className="px-3 py-2 w-20 h-10 shadow shadow-gray-600 rounded active:scale-97 bg-black text-white">
            LOGIN
          </button>
        </div>
      </div>
    </>
  );
}
