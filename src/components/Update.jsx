import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Update() {
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
  const handleCkeckBoxchange = (e, index) => {
    const checked = e.target.checked;
    if (checked === true) {
      setCkeckedItems((prevData) => [...prevData, e.target.value]);
    } else {
      setCkeckedItems(checkItems.filter((item) => item != e.target.value));
    }
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setEmployeeList({ ...employeeList, [name]: value });
  };

  const { id } = useParams();

  useEffect(() => {
    try {
      axios.get(`http://localhost:8080/update/${id}`).then((res) => {
        setEmployeeList(res.data);
      });
    } catch (error) {}
  }, [id]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    employeeList.courses = checkItems;
    const res = await axios
      .put(`http://localhost:8080/update/${id}`, employeeList)
      .then((res) => {
        alert(res.data.msg);
        navigate("/Navbar");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-gray-300 h-[100vh] w-[100%] flex justify-center items-center">
      <div className="bg-white h-[90vh]  min-w-[300px] w-[30%] border">
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
              autoComplete="off"
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
              autoComplete="off"
              required
            />
          </div>
          <div className="grid mb-3">
            <label htmlFor="">Moblie No. :</label>
            <input
              className="border outline-none p-1"
              type="text"
              name="number"
              value={employeeList.number}
              onChange={handleOnchange}
              required
            />
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
              <div className="flex" key={index}>
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Update;
