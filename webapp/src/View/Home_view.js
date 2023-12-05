import { React, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Link, useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const phoneNumber = location.state?.phoneNumber;


  return (
    <div>
      <Navbar />
      <div className=" text-center py-12 px-28 mt-24">
        <h1 className=" text-left text-5xl text-blue-800 font-bold">
          Welcome {phoneNumber}
        </h1>
        <p className=" text-xs text-left w-1/4 text-slate-400 pt-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique sed
          ex accusamus dolores ratione
        </p>
      </div>
      <div className="grid grid-cols-4 gap-4 my-5">
        <div className=" h-56 col-span-3">
          <div className="card-holder p-5">
            <div className="card-submit w-acht m-auto mb-8 p-7 bg-slate-100 rounded-md shadow-md">
              <h1 className=" text-2xl font-semibold text-slate-800">
                Upload File
              </h1>
              <p className=" w-1/2 py-3 text-xs font-medium text-slate-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Pariatur dolor sit quidem deleniti, magni expedita
              </p>
              <Link
                to={'/uploadform'}
                className=" text-sm text-blue-900 "
              >
                Submit File
              </Link>
            </div>
            <div className="card-submit w-acht m-auto mb-8 p-7 bg-slate-100 rounded-md shadow-md">
              <h1 className=" text-2xl font-bold text-slate-800">
                Submission History
              </h1>
              <p className=" w-1/2 py-3 text-xs font-medium text-slate-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Pariatur dolor sit quidem deleniti, magni expedita
              </p>
              <Link className=" text-sm text-blue-900 ">
                View Submission History
              </Link>
            </div>
            <div className="card-submit w-acht m-auto mb-8 p-7 bg-slate-100 rounded-md shadow-md">
              <h1 className=" text-2xl font-semibold text-slate-800">
                Cryptography
              </h1>
              <p className=" w-1/2 py-3 text-xs font-medium text-slate-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Pariatur dolor sit quidem deleniti, magni expedita
              </p>
              <Link className=" text-sm text-blue-900 ">Try me!</Link>
            </div>
            <div className="card-history"></div>
          </div>
        </div>
        <div className=" h-56 bg-gray-100 col-span-1">
          <div className="projects"></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
