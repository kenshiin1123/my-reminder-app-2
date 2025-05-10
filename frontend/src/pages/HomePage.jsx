import React from "react";
import Header from "../components/Header.jsx";
import Clock from "../components/Clock/Index";
import { FaCircleInfo } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import useReminder from "../store/useReminder.js";
import { logout } from "../api/auth.api.js";

export default function Homepage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useReminder();
  return (
    <>
      <Header>Homepage</Header>
      <Clock />
      {isLoggedIn ? (
        <div className="flex mt-10">
          <button
            onClick={async () => {
              await logout();
              navigate("/");
            }}
            className="mx-auto bg-white text-black px-4 py-2 rounded active:scale-95 active:shadow-black/50 shadow shadow-black"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center mt-10 flex-col gap-3 mb-20 ">
          <p className="bg-green-400 text-sm text-white p-2 rounded flex justify-center items-center gap-2 mx-3">
            <FaCircleInfo /> Sign up or log in to access your account.
          </p>
          <div className="flex gap-10">
            <Link
              to={"/register"}
              className="px-3 py-2 w-20 h-10 shadow shadow-gray-600 rounded active:scale-97  text-black text-center"
            >
              Register
            </Link>
            <Link
              to={"/login"}
              className="px-3 py-2 w-20 h-10 shadow shadow-gray-600 rounded active:scale-97 bg-black text-white text-center"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
