import { Link } from "react-router-dom";
import "../App.css";

function Navbar() {
  return (
    <div className="Navbar fixed w-full top-0 flex p-5 justify-between align-middle bg-gray-100 bg-opacity-30 backdrop-blur-sm">
      <div className="logo text-lg">
        <h1 className=" text-3xl font-extrabold text-slate-900">Logo</h1>
      </div>
      <ul className="flex justify-evenly items-center min-w-96 ">
        <Link to={'/home'}>
          <li className=" px-3 font-semibold  text-lg cursor-pointer text-slate-400 hover:text-blue-600">
            Home
          </li>
        </Link>
        <li className=" px-3 font-semibold text-lg cursor-pointer text-slate-400 hover:text-blue-600">
          About
        </li>
        <li className=" px-3 font-semibold text-lg cursor-pointer text-slate-400 hover:text-blue-600">
          Profile
        </li>
        <li className=" px-3 font-semibold text-lg cursor-pointer text-slate-400 hover:text-blue-600">
          New Chat
        </li>
        <Link to={"/login"}>
          <button className="py-2 px-4 ml-5 rounded-md bg-blue-600 text-slate-200 hover:bg-blue-700 font-semibold">
            Logout
          </button>
        </Link>
      </ul>
    </div>
  );
}

export default Navbar;
