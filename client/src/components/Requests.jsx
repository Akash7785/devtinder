import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addRequestData } from "../store/features/requestSlice";

const Requests = () => {
  const [requestList, setRequestList] = useState([]);

  const dispatch = useDispatch();
  // const requestList = useSelector((store) => store.request.request);
  // console.log(requestList);

  const requestRecieved = async () => {
    const response = await axios.get(BASE_URL + "/user/requests/received", {
      withCredentials: true,
    });
    console.log(response.data.data);
    setRequestList(response.data.data);
    dispatch(addRequestData(response.data.data));
  };

  useEffect(() => {
    requestRecieved();
  }, []);

  if (!requestList) return;

  if (requestList.length === 0) return <h1>No request found</h1>;

  return (
    <>
      <div className="mt-5">
        <h1 className="text-3xl text-center">All Requests</h1>
        {requestList.map((request) => {
          const { _id, firstName, lastName, age, gender, about, photoUrl } =
            request.fromUserId;
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
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-md m-2">
                        Accept
                      </button>
                      <button className="bg-red-500 text-white px-4 py-2 rounded-md m-2">
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
