import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("password");
  const navigate = useNavigate();

  const handleHidePassword = () => {
    if (showPassword === "password") {
      setShowPassword("text");
    }
    if (showPassword === "text") {
      setShowPassword("password");
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(res);
      // dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      // setError(err?.response?.data || "Something went wrong");
      console.log(err);
    }
  };

  return (
    <div className="bg-purple-100">
      <div className=" flex justify-center items-center h-[80vh] ">
        <div className="w-1/4 bg-slate-400 p-3 rounded-lg max-sm:w-full max-sm:mx-7">
          <h1 className="text-white font-semibold text-2xl">Login</h1>

          <label className="input input-bordered mt-4 flex items-center gap-2">
            <MdEmail className="text-gray-500" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              value={email}
              className="grow"
              placeholder="Email"
            />
          </label>

          <label className="input input-bordered mt-4 flex items-center gap-2">
            <FaKey className="text-gray-500" />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword}
            />
            {showPassword === "password" ? (
              <FaEyeSlash onClick={handleHidePassword} className="ml-20" />
            ) : (
              <FaRegEye onClick={handleHidePassword} className="ml-20 " />
            )}
          </label>
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 rounded-lg mt-4 py-3 text-white font-semibold text-xl hover:bg-blue-600"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
