import { Dialog, Transition } from "@headlessui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReviewModal from "./ReviewModal";

const MarkAsCompletedButton = ({ onClick }) => (
  <button
    className="mt-2 mb-6 bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700 transition"
    onClick={onClick}
  >
    Mark as completed
  </button>
);

const UpcomingExchanges = ({ user, exchangeRequests }) => {
  const [showModal, setShowModal] = useState(false);
  const [activeExchange, setActiveExchange] = useState(null);
  const navigate = useNavigate();

  if (!user) {
    return <div>Please log in to view your upcoming exchanges.</div>;
  }

  const upcoming = exchangeRequests.filter(
    (ex) =>
      ex.status === "accepted" &&
      (ex.toUser.id === user.id || ex.fromUser.id === user.id)
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Upcoming Exchanges</h1>
      <h2 className="text-gray-500 mb-2">
        These are your accepted skill swaps. Message your partner and mark as
        completed when done.
      </h2>

      {upcoming.length === 0 ? (
        <div className="text-gray-500 mb-2">No upcoming exchanges yet.</div>
      ) : (
        upcoming.map((ex) => {
          const isSender = ex.fromUser.id === user.id;
          const partner = isSender ? ex.toUser : ex.fromUser;
          return (
            <div key={ex.id}>
              <div className="rounded-lg shadow p-4 mb-4 bg-white flex flex-col gap-2">
                <div>
                  <span className="font-semibold">With:</span>{" "}
                  {partner.username}
                </div>
                <div>
                  <span className="font-semibold">You offer:</span>{" "}
                  {isSender
                    ? ex.skillsOffered.join(", ")
                    : ex.skillsWanted.join(", ")}
                </div>
                <div>
                  <span className="font-semibold">You receive:</span>{" "}
                  {isSender
                    ? ex.skillsWanted.join(", ")
                    : ex.skillsOffered.join(", ")}
                </div>
                <div>
                  <span className="font-semibold">Status:</span>{" "}
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                    Accepted
                  </span>
                </div>
                <button
                  className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                  onClick={() => navigate(`/messages/${partner.id}`)}
                >
                  Message {partner.username}
                </button>
              </div>
              <MarkAsCompletedButton
                onClick={() => {
                  setActiveExchange(ex);
                  setShowModal(true);
                }}
              />
            </div>
          );
        })
      )}
      <ReviewModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={({ review, rating }) => {
          // Handle review submission here (e.g., send to backend)
          setShowModal(false);
        }}
      />
    </div>
  );
};

export default UpcomingExchanges;
