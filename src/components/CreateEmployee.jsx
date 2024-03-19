import { data } from "autoprefixer";
import axios from "axios";
import React, { useEffect, useState } from "react";
import EmployeeList from "./EmployeeList";

function CreateEmployee() {
  const [employeeList, setEmployeeList] = useState({
    name: "",
    email: "",
    number: "",
    designation: "",
    gender: "",
    courses: [],
    photo: "",
  });

  const coursedata = [
    { courseName: "MCA" },
    { courseName: "BCA" },
    { courseName: "Mtech" },
  ];

  const [checkItems, setCkeckedItems] = useState([]);
  let name, value;
  const handleOnchange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setEmployeeList({
      ...employeeList,
      [name]: value,
    });
  };

  const [phoneNumber, setNumber] = useState("");
  const [isValid, setIsvalid] = useState(true);

  const handleOnNumber = (e) => {
    const inputNumber = e.target.value;
    const phoneRegex = /^\d{10}$/; // validatate of 10 digit phone number
    setIsvalid(phoneRegex.test(inputNumber));
    setNumber(inputNumber);
  };

  function handleCkeckBoxchange(e, index) {
    const checked = e.target.checked;
    if (checked === true) {
      setCkeckedItems((prevData) => [...prevData, e.target.value]);
    } else {
      setCkeckedItems(checkItems.filter((item) => item != e.target.value));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(phoneNumber.length);

    if (phoneNumber.length > 10 || phoneNumber.length < 10) {
      setIsvalid(false);
    } else {
      employeeList.courses = checkItems;
      employeeList.number = phoneNumber;

      try {
        const res = await axios.post(
          "http://localhost:8080/Employee",
          employeeList
        );
        if (res.data.status === "success") {
          alert("registration success");
          location.reload();
        } else {
          alert(res.data.status);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="bg-gray-300 h-[calc(100vh-65px)] w-[100%] flex justify-center items-center">
      <div className="bg-white h-[90vh]  min-w-[400px] w-[35%] border">
        <div className="mt-5 text-center">
          <strong>Create Employee</strong>
        </div>
        <form action="" className="p-5" onSubmit={handleSubmit}>
          <div className="grid mb-3">
            <label htmlFor="">Name</label>
            <input
              className="border outline-none p-[3px]"
              type="text"
              name="name"
              value={employeeList.name}
              onChange={handleOnchange}
              required
            />
          </div>
          <div className="grid mb-3">
            <label htmlFor="">Email</label>
            <input
              className="border outline-none p-1"
              type="email"
              name="email"
              value={employeeList.email}
              onChange={handleOnchange}
              placeholder="Enter Email"
              required
            />
          </div>
          <div className="grid mb-3">
            <label htmlFor="">Moblie No. :</label>
            <input
              className="border outline-none p-1"
              type="text"
              name="number"
              value={phoneNumber}
              onChange={handleOnNumber}
              required
            />
            {!isValid && (
              <p className="text-[13px] text-red-500">
                Number must be 10 digits
              </p>
            )}
          </div>
          <div className="mb-3">
            <select
              name="designation"
              className="w-[100%] p-1 border"
              value={employeeList.designation}
              onChange={handleOnchange}
              required
            >
              <option value="">Designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="" className="">
              Gender :
            </label>
            <br />
            <input
              type="radio"
              name="gender"
              value="male"
              onChange={handleOnchange}
            />
            <label className="mx-2" htmlFor="">
              Male
            </label>
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={handleOnchange}
            />
            <label className="mx-2" htmlFor="">
              Female
            </label>
            <input
              type="radio"
              name="gender"
              value="other"
              onChange={handleOnchange}
            />
            <label className="mx-2" htmlFor="">
              Other
            </label>
          </div>
          <div className="w-[100%] p-1 flex">
            <label htmlFor="" className="">
              Courses:
            </label>
            <br />
            {coursedata.map((course, index) => (
              <div className="flex">
                <input
                  type="checkbox"
                  className="mx-2"
                  value={course.courseName}
                  onChange={(e) => handleCkeckBoxchange(e, index)}
                />
                <label htmlFor="">{course.courseName}</label>
              </div>
            ))}
          </div>
          <div className="py-2">
            <label className="inline-block  mb-2" htmlFor="">
              Upload Image :
            </label>
            <br />
            <input
              type="file"
              name="photo"
              accept="image/jpeg ,image/jpg ,image/png"
              onChange={handleOnchange}
              required
            />
          </div>
          <div className="mt-6">
            <button
              className="border rounded-xl p-2 w-[150px] bg-yellow-500 hover:bg-yellow-400 hover:text-white"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEmployee;
