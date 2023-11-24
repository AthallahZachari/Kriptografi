import React, { useState } from "react";
import "../App.css";
import axios from "axios";

function SignUp() {
  const [fullname, setFullname] = useState("");
  const [phonenum, setPhonenum] = useState("");
  const [password, setPassword] = useState("");
  const [match_password, setMatchpassword] = useState("");
  const [alert, setAlert] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (match_password != password) {
      setAlert("Password don't match, please re-enter!");
      return;
    } else {
      setAlert("");
      console.log({fullname, password, phonenum})
      axios
        .post("http://localhost:8081/signpup", { fullname, password, phonenum })
        .then((res) => {
          console.log(res);

          if (res.data === "Uploaded!") {
            window.location.href = "/login";
          } else {
            console.log("Input failed");
          }
          
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  return (
    <div className="">
      <div className="container text-center mt-7 p-5 mx-auto w-sechs bg-slate-200 shadow-md rounded-md">
        <div>
          <h1 className=" text-5xl font-bold p-5 mb-5 text-slate-700">
            Sign Up
          </h1>
        </div>
        <form className=" w-sieben m-auto" onSubmit={handleSubmit}>
          <label
            htmlFor="Fullname"
            className="block text-left text-gray-700 text-sm font-semibold px-3 mb-2"
          >
            Fullname
          </label>
          <input
            type="text"
            id="Fullname"
            name="Fullname"
            onChange={(e) => setFullname(e.target.value)}
            className="w-full p-2 mb-3 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter Fullname"
          />
          <label
            htmlFor="Fullname"
            className="block text-left text-gray-700 text-sm font-semibold px-3 mb-2"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="Phone Number"
            name="Phone Number"
            onChange={(e) => setPhonenum(e.target.value)}
            className="w-full p-2 mb-3 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter Phone Number"
          />
          <label
            htmlFor="Password"
            className="block text-left text-gray-700 text-sm font-semibold px-3 mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="Password"
            name="Password"
            onChange={(e) => setMatchpassword(e.target.value)}
            className="w-full p-2 mb-3 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter Password"
          />
          <label
            htmlFor="Re-enter Password"
            className="block text-left text-gray-700 text-sm font-semibold px-3 mb-2"
          >
            Re-enter Password
          </label>
          <input
            type="password"
            id="Re-enter Password"
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Re-enter Password"
          />
          {alert && (
            <p className=" text-left text-xs text-red-600 px-3 mb-3">{alert}</p>
          )}
          <button
            type="submit"
            className="w-1/2 my-5 text-center bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
