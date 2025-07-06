import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../store/features/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const handleRequest = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + id,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(id));
    } catch (error) {
      console.log("Error", error);
    }
  };

  if (!user) return;
  const { _id, firstName, lastName, about, age, photoUrl, gender } = user;
  return (
    <div key={_id}>
      <div className=" m-10 flex flex-col justify-center items-center">
        <div className=" shadow-md  rounded-lg bg-white p-2">
          <img
            className="rounded-md w-96 h-96 object-cover object-top"
            src={photoUrl}
            alt="profile Pic"
          />
          <h1 className="text-xl">
            {firstName} {lastName}
          </h1>
          <p>
            {gender}, {age}
          </p>
          <p className="text-sm w-96 ">{about}</p>
          <div className="flex justify-center items-center">
            <button
              onClick={() => handleRequest("interested", _id)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md m-2"
            >
              Interested
            </button>
            <button
              onClick={() => handleRequest("ignored", _id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md m-2"
            >
              Ignore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
