const ProfileView = ({ user }) => {
  const { firstName, lastName, about, age, gender, photoUrl } = user;
  return (
    <div className=" m-10">
      <div className=" shadow-md w-80  rounded-lg bg-white p-2">
        <img
          className="rounded-md w-80 object-fill h-96"
          src={photoUrl}
          alt="profile Pic"
        />
        <h1 className="text-xl font-semibold">
          {firstName} {lastName}
        </h1>
        {gender && age && (
          <p className="">
            <span className="font-semibold">{gender}, </span>
            {age}
          </p>
        )}
        <p className="text-sm">{about}</p>
      </div>
    </div>
  );
};

export default ProfileView;
