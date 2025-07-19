import { useState } from "react";
import { useNavigate } from "react-router";
import exchangeRequestService from "../services/exchangerequests";

const CreateExchangeForm = ({
  user,
  users,
  setExchangeRequests,
  exchangeRequests,
  setSuccessMessage,
}) => {
  const [toUserId, setToUserId] = useState("");
  const [skillsOfferedInput, setSkillsOfferedInput] = useState("");
  const [skillsWantedInput, setSkillsWantedInput] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="text-red-600">
        You must be logged in to create an exchange request.
      </div>
    );
  }

  const otherUsers = users.filter((u) => u.username !== user.username);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Convert comma-separated input to array and trim whitespace
    const skillsOffered = skillsOfferedInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const skillsWanted = skillsWantedInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (!toUserId || skillsOffered.length === 0 || skillsWanted.length === 0) {
      setError(
        "Please fill all fields and provide at least one skill in each."
      );
      return;
    }

    try {
      const newExchangeRequest = await exchangeRequestService.create({
        toUser: toUserId,
        skillsOffered,
        skillsWanted,
      });
      setExchangeRequests(exchangeRequests.concat(newExchangeRequest));
      setToUserId("");
      setSkillsOfferedInput("");
      setSkillsWantedInput("");
      setError(null);
      setSuccessMessage("Exchange request created successfully!");
      navigate("/");
    } catch (err) {
      setError("Failed to create exchange request.");
    }
  };

  return (
    <section className="rounded-xl shadow bg-white">
      <form className="max-w-xl mx-auto p-6 space-y-6" onSubmit={handleSubmit}>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Create Exchange Request
          </h1>
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To user
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={toUserId}
            onChange={(e) => setToUserId(e.target.value)}
            required
          >
            <option value="" disabled>
              Select a user
            </option>
            {otherUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Skills Offered (comma separated)
          </label>
          <input
            data-testid="skills-offered"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            value={skillsOfferedInput}
            onChange={(e) => setSkillsOfferedInput(e.target.value)}
            placeholder="e.g. Guitar, Python"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Skills Wanted (comma separated)
          </label>
          <input
            data-testid="skills-wanted"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            value={skillsWantedInput}
            onChange={(e) => setSkillsWantedInput(e.target.value)}
            placeholder="e.g. French, UI Design"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateExchangeForm;
