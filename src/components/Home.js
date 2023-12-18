import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col space-y-28 m-8 ">
      <div className="flex justify-center w-full">
        <h1 className="text-5xl ">Welcome to the Home Page</h1>
      </div>
      <div className="flex  justify-evenly w-full">
        <Link to="/signup">
          {" "}
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            New User
          </button>
        </Link>
        <Link to="/login">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Existing User
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
