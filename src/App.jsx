import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import CreateEmployee from "./components/CreateEmployee";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import EmployeeList from "./components/EmployeeList";
import { useState } from "react";
import Update from "./components/Update";

function App() {
  const [username, setUser] = useState("");

  const handleUsers = (userProfile) => {
    setUser(userProfile);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login handleUsers={handleUsers} />} />
          <Route path="/register" element={<Register />} />
          <Route path="navbar/" element={<Navbar username={username} />}>
            <Route index element={<Dashboard />} />
            <Route path="createEmployee" element={<CreateEmployee />} />
            <Route path="employeeList" element={<EmployeeList />} />
            <Route path="employeeList/update/:id" element={<Update />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
