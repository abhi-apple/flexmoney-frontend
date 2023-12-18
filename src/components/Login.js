import React, { useState } from "react";
import { Link } from "react-router-dom";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    time: "",
  });

  const [emailError, setEmailError] = useState("");
  const [backendError, setBackendError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    } else {
      setEmailError("");
    }

    const response = await fetch(
      "https://calm-plum-goat-veil.cyclic.app/check-user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      }
    );

    const existingUserData = await response.json();

    if (existingUserData.exists) {
      console.log("User exists. Proceeding with form submission...");
      setBackendError("");

      const submitResponse = await submitFormData(formData);

      if (submitResponse.success) {
        console.log("Form data submitted successfully:", formData);
      } else {
        console.error("Form data submission failed:", submitResponse.error);

        alert(
          " You have already Booked Your slot for this month please try next month"
        );
      }
    } else {
      console.log("User does not exist. Cannot submit form.");
      setBackendError("User does not exist.");
    }
  };

  const submitFormData = async (formData) => {
    try {
      const response = await fetch(
        "https://calm-plum-goat-veil.cyclic.app/existing-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data.message || "Server error" };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  return (
    <div className="flex-col m-4 ">
      <div className="justify-center flex">
        <div className=" align-middle text-stone-200 justify-center flex text-3xl mb-9 bg-neutral-800 w-1/4 py-4 rounded-3xl items-center">
          Book Your Slot
        </div>
      </div>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@gmail.com"
            required
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
          {backendError && (
            <p className="text-red-500 text-sm mt-1">{backendError}</p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="option"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Preferred time
          </label>
          <select
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            <option value="" disabled selected>
              Select a time
            </option>
            <option value="6-7AM">6-7AM</option>
            <option value="7-8AM">7-8AM</option>
            <option value="8-9AM">8-9AM</option>
            <option value="5-6PM">5-6PM</option>
          </select>
        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              defaultValue=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-900"
          >
            Pay 500/- Rs INR
          </label>
        </div>

        <div className="mb-5">
          <p className="text-gray-700 text-sm">
            New Member?{" "}
            <Link to="/signup" className="text-blue-700 hover:underline">
              SignUp and Book your Slot
            </Link>
          </p>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Book Slot
        </button>
      </form>
    </div>
  );
};

export default Login;
