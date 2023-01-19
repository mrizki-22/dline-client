import React from "react";
import { TextField, Button } from "@mui/material/";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
function Login() {
  const navigate = useNavigate();
  const notifyError = (msg) => toast.error(msg);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    try {
      const res = await axios.post(`${SERVER_URL}/admins/login`, form);
      localStorage.setItem("token", res.data);

      navigate("/admin/dashboard");
    } catch (error) {
      notifyError(error.response.data.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <TextField label="Username" name="username" />
        <TextField label="Password" type={"password"} name="password" />
        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
