import React from "react";

const UserCard = ({ user }) => {
  if (!user) return;
  const { firstName, lastName, about, age, photoUrl, gender } = user;
  return (
    <div>
      <div className=" m-10 flex flex-col justify-center items-center">
        <div className=" shadow-md  rounded-lg bg-white p-2">
          <img className="rounded-md w-96" src={photoUrl} alt="profile Pic" />
          <h1 className="text-xl">
            {firstName} {lastName}
          </h1>
          <p>
            {gender}, {age}
          </p>
          <p className="text-sm">{about}</p>
          <div className="flex justify-center items-center">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md m-2">
              Interested
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md m-2">
              Ignore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
