import React, { useDebugValue, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Reg from "../images/reg2.jpg";
import axios from "axios";
import Navbar from "../components/Navbar";
function Login({ handleUsers }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [mess, setMess] = useState("");

  const navigate = useNavigate();
  const handleOnsubmit = async (e) => {
    e.preventDefault();

    try {
      const responce = await axios.post("http://localhost:8080/Login-users", {
        email,
        password,
      });
      if (responce.data.status === "ok") {
        handleUsers(responce.data.user);
        navigate("/Navbar");
      } else {
        setMess(responce.data.error);
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[100vh] w-[100%] bg-gray-200 flex justify-center items-center">
      <div className="border rounded-md shadow bg-white h-[500px] min-w-[500px] w-1/2 mb-12 p-5">
        <div className="grid grid-cols-2  ">
          <div className="text-center p-5">
            <div className="p-5">
              <img className="h-[300px]" src={Reg} alt="" />
            </div>
            <div>
              <Link to="/register" className="underline text text-red-300">
                Create Account
              </Link>
            </div>
          </div>
          <div className="p-5">
            <h1 className="text-3xl py-5">Sign In</h1>
            <form
              action=""
              className="max-w-md mx-auto"
              onSubmit={handleOnsubmit}
            >
              <div className="my-4 flex items-center  border-0 border-b-2 border-gray hover:border-b-blue-300">
                <FaUser />
                <input
                  className="focus:outline-none  px-3 w-full"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="username"
                  required
                />
              </div>

              <div className="my-4 flex flex items-center  border-0 border-b-2 border-gray hover:border-b-blue-300">
                <FaLock />
                <input
                  className="focus:outline-none px-3 w-full"
                  type="password"
                  value={password}
                  setMess
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  required
                />
              </div>
              <p className="my-2 text-sm text-red-300">{mess}</p>
              <div className="flex items-center">
                <input type="checkbox" />
                <label className="mx-3" htmlFor="">
                  Remember me
                </label>
              </div>
              <div className="mt-14">
                <button
                  className="border rounded bg-yellow-500 w-full p-1"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
