import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import UserCard from "./UserCard";

const Feed = () => {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log("res", res.data);
      setUsers(res.data);
    } catch (err) {
      console.log("Error fetching users for feed:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <UserCard user={users[1]} />
    </>
  );
};

export default Feed;
