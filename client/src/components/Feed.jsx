import { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { addFeedData } from "../store/features/feedSlice";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const fetchUsers = async () => {
    if (feed) return;

    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log("res", res.data);
      dispatch(addFeedData(res?.data));
    } catch (err) {
      console.log("Error fetching users for feed:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  if (!feed) return;

  if (feed.length <= 0)
    return <h1 className="flex justify-center my-10">No new users founds!</h1>;

  return (
    feed && (
      <>
        <UserCard user={feed[0]} />
      </>
    )
  );
};

export default Feed;
