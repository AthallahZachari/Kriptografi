import "../App.css";
import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Form = () => {
  const [filename, setFilename] = useState("");
  const [filebody, setFilebody] = useState("");


  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:8081/file", { filename, filebody })
      .then((res) => {
        console.log(res);

        if (res.data === "File Uploaded!") {
          window.location.href = "/home";
        } else {
          console.log("Input Failed");
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div>
      <Navbar />
      <div className="container text-center mt-28 p-5 mx-auto w-1/2 bg-slate-200 shadow-md rounded-md">
        <div>
          <h1 className=" text-5xl font-bold p-10 mb-5 text-slate-700">
            Online Text
          </h1>
        </div>
        <form className=" w-acht m-auto" onSubmit={handleSubmit}>
          <label
            htmlFor="Filename"
            className="block text-left text-gray-700 text-sm font-semibold px-3 mb-2"
          >
            Filename
          </label>
          <input
            type="text"
            id="Filename"
            name="Filename"
            onChange={(e) => setFilename(e.target.value)}
            className="w-full p-2 mb-3 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter Filename"
          />
          <label
            htmlFor="Textfield"
            className="block text-left text-gray-700 text-sm font-semibold px-3 mb-2"
          >
            Add Text
          </label>
          <textarea
            name="Textfield"
            id="Textfield"
            rows="7"
            maxLength={255}
            onChange={(e) => setFilebody(e.target.value)}
            className=" resize-none w-full p-2 mb-3 rounded-md focus:outline-none focus:border-blue-500"
          ></textarea>
          <button
            type="submit"
            className="w-1/2 my-5 text-center bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
