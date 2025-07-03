import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../store/features/connectionSlice";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });
      setConnections(res.data.data);
      dispatch(addConnections(res.data.data));

      console.log("Responee", res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1> No Connections Found</h1>;

  return (
    <>
      <div className=" mt-5">
        <h1 className="text-3xl text-center ">Connections</h1>
        {connections.map((connection) => {
          const { _id, firstName, lastName, age, photoUrl, about, gender } =
            connection;
          return (
            <div key={_id} className="flex justify-center flex-wrap gap-5">
              <div className="flex w-1/3  bg-slate-100 m-2 p-2 gap-3 shadow-lg">
                <div className="w-36 h-36">
                  <img
                    className="rounded-md w-36 h-36 object-cover"
                    src={photoUrl}
                    alt=""
                  />
                </div>
                <div>
                  <h1 className="text-lg font-semibold">
                    {firstName} {lastName}
                  </h1>
                  <p className="">{about}</p>
                  <p className="text-gray-500 my-3">
                    {gender} <span> {age}</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Connections;
