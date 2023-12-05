import Navbar from "./Navbar.js";
import axios from "axios";
import "../App.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [phonenum, setPhonenum] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState("");
  const navigate = useNavigate();


  function handleSubmit(event){

    event.preventDefault();
    axios.post("http://localhost:8081/logni", { phonenum, password })
      .then((res) => {
        console.log(res);
        if (res.data.message === "Logged") {
          const token = res.data.token;
          localStorage.setItem("verifToken", token);
          navigate("/home", { state: { phoneNumber: phonenum } });

        } else {
          console.log("Authentication failed");
          if (res.data != "Logged") {
            setAlerta("Wrong password/username or please Sign Up first!");
          } else {
            setAlerta("");
          }
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="Login w-full">
      <div className="container m-auto w-1/3 text-center py-10 px-5 mt-32 rounded-lg bg-slate-200 shadow-lg">
        <h2 className="text-5xl font-bold text-slate-700 mb-10 text-center">
          Michat
        </h2>
        <form
          onSubmit={handleSubmit}
          className=" m-auto flex-col align-middle justify-center w-3/4 mt-10"
        >
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-left text-gray-700 text-sm font-semibold px-3 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={(e) => setPhonenum(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter username"
            />
          </div>
          <div className="">
            <label
              htmlFor="password"
              className="block text-left text-gray-700 text-sm font-semibold px-3 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter password"
            />
            {alerta && (
              <p className=" text-left text-xs text-red-600 px-3 mb-3">
                {alerta}
              </p>
            )}
          </div>
          <Link to="/signup">
            <p className=" py-2 px-1 text-blue-600 text-xs text-left underline cursor-pointer hover:text-blue-800">
              Doesn't have any account?
            </p>
          </Link>
          <button
            type="submit"
            className="w-1/2 mt-5 text-center bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
