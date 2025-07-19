import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReviewModal from "./ReviewModal";
import reviewsService from "../services/reviews";

const MarkAsCompletedButton = ({ onClick }) => (
  <button
    className="mt-2 mb-6 bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700 transition"
    onClick={onClick}
  >
    Mark as completed
  </button>
);

const UpcomingExchanges = ({
  user,
  exchangeRequests,
  setSuccessMessage,
  successMessage,
}) => {
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
      {successMessage && (
        <div className="bg-green-100 border border-green-400 rounded-2xl text-green-700 px-4 py-3 mb-4 max-w-lg mx-auto">
          {successMessage}
        </div>
      )}
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
        onSubmit={async ({ review, rating }) => {
          if (!activeExchange) return;
          try {
            await reviewsService.create({
              reviewee:
                activeExchange.fromUser.id === user.id
                  ? activeExchange.toUser.id
                  : activeExchange.fromUser.id,
              exchange: activeExchange.id,
              rating,
              comment: review,
            });
            setShowModal(false);
            setSuccessMessage("Review created successfully!");
            // eslint-disable-next-line no-unused-vars
          } catch (err) {
            // Optionally handle error
            alert("Failed to submit review.");
          }
        }}
      />
    </div>
  );
};

export default UpcomingExchanges;
