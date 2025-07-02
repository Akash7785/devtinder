const ProfileView = ({ user }) => {
  const { firstName, lastName, about, age, gender, photoUrl } = user;
  return (
    <div className=" m-10">
      <div className=" shadow-md   rounded-lg bg-white p-2">
        <img className="rounded-md w-96" src={photoUrl} alt="profile Pic" />
        <h1 className="text-xl">
          {firstName} {lastName}
        </h1>
        <p>
          {gender}, {age}
        </p>
        <p className="text-sm">{about}</p>
      </div>
    </div>
  );
};

export default ProfileView;
