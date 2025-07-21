import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/users";

const DiscoverPage = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    userService.getAll().then((allUsers) => {
      // Filter out current user
      const otherUsers = user
        ? allUsers.filter((u) => u.id !== user.id)
        : allUsers;
      setUsers(otherUsers);
      setFilteredUsers(otherUsers);
      setLoading(false);
    });
  }, [user]);

  useEffect(() => {
    let filtered = users;

    // Filter by search term (username or name)
    if (searchTerm) {
      filtered = filtered.filter(
        (u) =>
          u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by skill
    if (skillFilter) {
      filtered = filtered.filter((u) =>
        u.skillsOffered?.some((skill) =>
          skill.toLowerCase().includes(skillFilter.toLowerCase())
        )
      );
    }

    setFilteredUsers(filtered);
  }, [searchTerm, skillFilter, users]);

  const getCompatibilityScore = (otherUser) => {
    if (!user || !user.skillsWanted || !user.skillsOffered) return 0;

    const canLearn =
      otherUser.skillsOffered?.filter((skill) =>
        user.skillsWanted.includes(skill)
      ).length || 0;

    const canTeach =
      user.skillsOffered?.filter((skill) =>
        otherUser.skillsWanted?.includes(skill)
      ).length || 0;

    return canLearn + canTeach;
  };

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const scoreA = getCompatibilityScore(a);
    const scoreB = getCompatibilityScore(b);
    return scoreB - scoreA; // Higher scores first
  });

  if (loading) return <div className="text-center">Loading users...</div>;

  return (
    <div className="max-w-6xl mx-auto px-10 py-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Discover Users
        </h1>
        <p className="text-gray-600 mb-6">
          Find people to exchange skills with. Users with matching skills appear
          first.
        </p>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search by name or username
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search users..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by skill offered
              </label>
              <input
                type="text"
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
                placeholder="e.g. JavaScript, Guitar..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {user && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Your skills offered:</strong>{" "}
                {user.skillsOffered?.join(", ") || "None"}
              </p>
              <p className="text-sm text-blue-800">
                <strong>Skills you want:</strong>{" "}
                {user.skillsWanted?.join(", ") || "None"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="mb-4">
        <p className="text-gray-600">
          Found {filteredUsers.length} user
          {filteredUsers.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* User Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedUsers.map((discoveredUser) => {
          const compatibilityScore = getCompatibilityScore(discoveredUser);

          return (
            <div
              key={discoveredUser.id}
              className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/users/${discoveredUser.id}`)}
            >
              {/* Profile Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
                  {discoveredUser.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {discoveredUser.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    @{discoveredUser.username}
                  </p>
                </div>
              </div>

              {/* Compatibility Badge */}
              {user && compatibilityScore > 0 && (
                <div className="mb-3">
                  <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    {compatibilityScore} skill match
                    {compatibilityScore > 1 ? "es" : ""}
                  </span>
                </div>
              )}

              {/* Skills Offered */}
              <div className="mb-3">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Offers:
                </h4>
                {discoveredUser.skillsOffered?.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {discoveredUser.skillsOffered
                      .slice(0, 3)
                      .map((skill, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 rounded-full text-xs ${
                            user?.skillsWanted?.includes(skill)
                              ? "bg-green-100 text-green-800 font-medium"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    {discoveredUser.skillsOffered.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        +{discoveredUser.skillsOffered.length - 3} more
                      </span>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No skills listed</p>
                )}
              </div>

              {/* Skills Wanted */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Wants:
                </h4>
                {discoveredUser.skillsWanted?.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {discoveredUser.skillsWanted
                      .slice(0, 3)
                      .map((skill, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 rounded-full text-xs ${
                            user?.skillsOffered?.includes(skill)
                              ? "bg-blue-100 text-blue-800 font-medium"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    {discoveredUser.skillsWanted.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        +{discoveredUser.skillsWanted.length - 3} more
                      </span>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No skills listed</p>
                )}
              </div>

              {/* Action Buttons */}
              {user && (
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/create-exchange", {
                        state: { selectedUser: discoveredUser },
                      });
                    }}
                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                  >
                    Exchange
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/messages/${discoveredUser.id}`);
                    }}
                    className="flex-1 bg-gray-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-700 transition"
                  >
                    Message
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            <svg
              className="w-16 h-16 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h3 className="text-lg font-medium mb-2">No users found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscoverPage;
