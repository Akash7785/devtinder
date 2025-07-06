import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequestData, removeRequest } from "../store/features/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request.request);
  console.log("object", requests);

  const fetchRequest = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequestData(response.data.data));
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  const reviewRequest = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(id));
      console.log(res);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return (
      <h1 className="text-center text-3xl font-semibold h-screen mt-5">
        No request found
      </h1>
    );

  return (
    <>
      <div className="mt-5">
        <h1 className="text-3xl text-center">All Requests</h1>
        {requests.map((request) => {
          const { _id, firstName, lastName, age, gender, about, photoUrl } =
            request.fromUserId;
          const id = request._id;

          return (
            <div>
              <div key={_id} className="flex justify-center flex-wrap gap-5">
                <div className="flex w-1/3  bg-slate-100 m-2 p-2 gap-3 shadow-lg">
                  <div className="w-36 h-36">
                    <img
                      className="rounded-md w-36 h-36 object-cover"
                      src={photoUrl}
                      alt="user photo"
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
                    <div className="flex justify-center items-center">
                      <button
                        onClick={() => reviewRequest("accepted", id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md m-2"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => reviewRequest("rejected", id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md m-2"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Requests;
