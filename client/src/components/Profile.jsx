import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const data = useSelector((store) => store.user.user);

  return (
    <>
      {data && (
        <div>
          <EditProfile user={data} />
        </div>
      )}
    </>
  );
};

export default Profile;
