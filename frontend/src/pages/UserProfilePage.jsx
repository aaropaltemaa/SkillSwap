import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import userService from "../services/users";

const UserProfilePage = ({ user }) => {
  const { userId } = useParams();
  const navigate = useNavigate();
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
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {profileUser.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {profileUser.name}
            </h1>
            <p className="text-gray-600">@{profileUser.username}</p>
            <p className="text-sm text-gray-500">
              Member since{" "}
              {new Date(profileUser.createdAt).getFullYear() || "recently"}
            </p>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Skills Offered */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-600">
            Skills Offered
          </h2>
          {profileUser.skillsOffered?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {profileUser.skillsOffered.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No skills offered yet</p>
          )}
        </div>

        {/* Skills Wanted */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">
            Skills Wanted
          </h2>
          {profileUser.skillsWanted?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {profileUser.skillsWanted.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No skills wanted yet</p>
          )}
        </div>
      </div>

      {/* Bio Section (if available) */}
      {profileUser.bio && (
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">About</h2>
          <p className="text-gray-700">{profileUser.bio}</p>
        </div>
      )}

      {/* Action Buttons (only show when viewing others) */}
      {user && user.id !== profileUser.id && (
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex gap-4">
            <button
              onClick={() =>
                navigate("/create-exchange", {
                  state: { selectedUser: profileUser },
                })
              }
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Send Exchange Request
            </button>
            <button
              onClick={() => navigate(`/messages/${profileUser.id}`)}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              Message {profileUser.name}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
