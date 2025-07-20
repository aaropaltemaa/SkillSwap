import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import userService from "../services/users";

const UserProfilePage = ({ user }) => {
  const { userId } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the user data based on userId from URL
    userService.getAll().then((users) => {
      const foundUser = users.find((u) => u.id === userId);
      setProfileUser(foundUser);
      setLoading(false);
    });
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!profileUser) return <div>User not found</div>;

  return (
    // Core Profile Information
    <section className="flex flex-col items-start bg-gray-100 p-5 h-full max-w-3xl mx-auto rounded-2xl space-y-4">
      <h2 className="font-bold text-3xl">{profileUser.name}</h2>
      <div>{profileUser.username}</div>
      <div>{profileUser.email}</div>
    </section>
  );
};

export default UserProfilePage;
