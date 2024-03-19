import axios from "axios";
import { list } from "postcss";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function EmployeeList() {
  const [employeeData, setEmployeeData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:8080/Employeedata")
      .then((res) => {
        setEmployeeData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handClick = async (id) => {
    const warning = window.confirm("Are you sure");

    try {
      const response = await axios.delete(
        `http://localhost:8080/itemDelete/${id}`
      );

      location.reload();
      alert(response.data.message);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="h-[100vh] w-[100%] mx-5">
      <table className="w-full border table-auto ">
        <thead className="border text-left">
          <tr className="">
            <th>Sl No.</th>
            <th>Name</th>
            <th>Number</th>
            <th>Designation</th>
            <th>Course</th>
            <th>Gender</th>
            <th>Photo</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-left">
          {employeeData.length === 0 ? (
            <div>
              <p>Records Not Found</p>
            </div>
          ) : (
            employeeData.map((empList, id) => (
              <tr className="border">
                <td>{id + 1}</td>
                <td>{empList.name}</td>
                <td>{empList.number}</td>
                <td>{empList.designation}</td>
                <td>{empList.courses}</td>
                <td>{empList.gender}</td>
                <td>
                  <img src={`${empList.photo}`} alt="photo" />
                </td>
                <td>{empList.email}</td>

                <td>
                  <Link to={`update/` + empList._id}>
                    <span className="mx-5 bg-green-500 px-2 rounded text-center text-white">
                      Edit
                    </span>
                  </Link>
                  <button
                    className="border rounded w-[100px] px-1 my-2 bg-red-600 text-white"
                    onClick={(e) => handClick(empList._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
