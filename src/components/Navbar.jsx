import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";

function Navbar({ username }) {
  console.log(username);
  return (
    <>
      <header className="flex justify-between items-center p-5">
        <nav className="ml-5 min-w-[350px] w-[30%]">
          <ul className="flex items-center">
            <li className="mx-2">
              <Link to="/Navbar">Home</Link>
            </li>
            <li className="mx-2">
              <Link to="createEmployee">Create Employee</Link>
            </li>
            <li className="mx-2">
              <Link to="employeeList">Employee List</Link>
            </li>
          </ul>
        </nav>

        <div className=" flex justify-around mx-5 min-w-[180px] w-[20%] ">
          <span className="flex items-center">
            {username}
            <FaRegCircleUser className="mx-2" />
          </span>
          <Link to="/">
            <span>Logout</span>
          </Link>
        </div>
      </header>
      <Outlet />
    </>
  );
}

export default Navbar;
