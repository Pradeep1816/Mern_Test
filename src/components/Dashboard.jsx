import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <div className="bg-gray-200 h-[calc(100vh-86px)] w-[100%] flex justify-center items-center">
        <div>
          <h1 className="text-3xl">Welcome Admin Panel</h1>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
