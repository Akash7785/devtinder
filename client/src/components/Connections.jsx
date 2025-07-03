import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
const Connections = () => {
  const [connections, setConnections] = useState([]);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });
      console.log("Responee", res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className=" mt-5">
      <h1 className="text-3xl text-center ">Connections</h1>
      <div className="flex justify-center flex-wrap gap-5">
        <div className="flex w-1/3 justify-center bg-slate-100 m-2 p-2 gap-3 shadow-lg">
          <div>
            <img
              className="rounded-md"
              src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
              alt=""
            />
            <h1 className="font-semibold text-center">Akash</h1>
          </div>
          <div>
            <p className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
              impedit pariatur perferendis cum ullam sequi vitae maiores nobis
              ad quod.
            </p>
            <p className="text-gray-500 my-3">
              Male, <span> 20</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connections;
