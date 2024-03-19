import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { MdFormatListNumbered } from "react-icons/md";
import Reg from "../images/reg2.jpg";
import { Link } from "react-router-dom";

import axios from "axios";

function Register() {
  const [userData, setUerData] = useState({
    usename: "",
    email: "",
    number: "",
    password: "",
    confmPassword: "",
  });

  const [errorMsg, setErrormsg] = useState("");

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUerData({
      ...userData,
      [name]: value,
    });
  };

  // const validatePassword = (password) => {
  //   if (password.length >= 8) {
  //     return true;
  //   } else {
  //     setErrormsg("password must be 8 character");
  //   }
  // };

  const handleOnsubmit = async (e) => {
    e.preventDefault();

    try {
      if (userData.password !== userData.confmPassword) {
        alert("not Match");
      } else {
        const response = await axios.post(
          "http://localhost:8080/Users",
          userData
        );
        console.log(response);

        if (response.data === "success") {
          setUerData({
            usename: "",
            email: "",
            number: "",
            password: "",
            confmPassword: "",
          });
        }
      }
    } catch (error) {
      setErrormsg(error.response.data.message);
      console.log(errorMsg);
    }
  };

  //console.log(errorMsg);

  return (
    <div className="h-[100vh] w-[100%] bg-gray-200 flex justify-center items-center">
      <div className="border rounded-md shadow bg-white h-[500px] min-w-[500px] w-1/2 mb-12 p-5">
        <div className="grid grid-cols-2">
          <div className="p-5">
            <h1 className="text-3xl py-5">Sign Up</h1>
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
                  name="usename"
                  value={userData.usename}
                  placeholder="username"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="my-4 flex flex items-center  border-0 border-b-2 border-gray hover:border-b-blue-300">
                <IoMdMail />
                <input
                  className="focus:outline-none px-3 p-1 w-full"
                  type="email"
                  name="email"
                  value={userData.email}
                  placeholder="Email"
                  onChange={handleChange}
                />
              </div>
              <div className="my-4 flex flex items-center  border-0 border-b-2 border-gray hover:border-b-blue-300">
                <MdFormatListNumbered />
                <input
                  className="focus:outline-none px-3 w-full"
                  type="text"
                  name="number"
                  value={userData.number}
                  placeholder="Enter number"
                  onChange={handleChange}
                />
              </div>
              <div className="my-4 flex flex items-center  border-0 border-b-2 border-gray hover:border-b-blue-300">
                <FaLock />
                <input
                  className="focus:outline-none px-3 w-full"
                  type="password"
                  name="password"
                  value={userData.password}
                  placeholder="password"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="my-4 flex flex items-center  border-0 border-b-2 border-gray hover:border-b-blue-300">
                <GiConfirmed />
                <input
                  className="focus:outline-none px-3 w-full"
                  type="password"
                  name="confmPassword"
                  value={userData.confmPassword}
                  placeholder="Confirm password"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mt-14">
                <button
                  className="border rounded bg-yellow-500 w-full p-1"
                  type="submit"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
          <div className="text-center p-5">
            <div className="p-5">
              <img className="h-[240px]" src={Reg} alt="" />
            </div>
            <div className="mt-16">
              <Link to="/" className="underline text-red-300">
                I am already member
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
