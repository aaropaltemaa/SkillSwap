import exchangeRequestService from "../services/exchangerequests";

const ExchangeRequestsPage = ({
  exchangeRequests,
  setExchangeRequests,
  user,
}) => {
  if (!user) {
    return <div>Please log in to view your exchange requests.</div>;
  }

  const sentRequests = exchangeRequests
    .filter((r) => r.fromUser.id === user.id)
    .filter((r) => r.status !== "accepted");

  const receivedRequests = exchangeRequests
    .filter((r) => r.toUser.id === user.id)
    .filter((r) => r.status !== "accepted");

  const statusColor = {
    pending: "bg-yellow-100 text-yellow-800",
    accepted: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  const handleStatusChange = async (id, newStatus) => {
    const updated = await exchangeRequestService.updateStatus(id, newStatus);
    setExchangeRequests(
      exchangeRequests.map((req) =>
        req.id === id ? { ...req, status: updated.status } : req
      )
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">My Exchange Requests</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Sent Requests</h2>
        {sentRequests.length === 0 ? (
          <div className="text-gray-500">No sent requests.</div>
        ) : (
          sentRequests.map((request) => (
            <div
              key={request.id}
              className="rounded-lg shadow p-4 mb-4 bg-white"
            >
              <div>
                <span className="font-semibold">To:</span>{" "}
                {request.toUser.username}
              </div>
              <div>
                <span className="font-semibold">Skills Offered:</span>{" "}
                {request.skillsOffered.join(", ")}
              </div>
              <div>
                <span className="font-semibold">Skills Wanted:</span>{" "}
                {request.skillsWanted.join(", ")}
              </div>
              <div className="mt-2">
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusColor[request.status] || "bg-gray-100 text-gray-800"}`}
                >
                  {request.status}
                </span>
              </div>
            </div>
          ))
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Received Requests</h2>
        {receivedRequests.length === 0 ? (
          <div className="text-gray-500">No received requests.</div>
        ) : (
          receivedRequests.map((request) => (
            <div
              key={request.id}
              className="rounded-lg shadow p-4 mb-4 bg-white"
            >
              <div>
                <span className="font-semibold">From:</span>{" "}
                {request.fromUser.username}
              </div>
              <div>
                <span className="font-semibold">Skills Offered:</span>{" "}
                {request.skillsOffered.join(", ")}
              </div>
              <div>
                <span className="font-semibold">Skills Wanted:</span>{" "}
                {request.skillsWanted.join(", ")}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusColor[request.status] || "bg-gray-100 text-gray-800"}`}
                >
                  {request.status}
                </span>
                {request.status === "pending" && (
                  <>
                    <button
                      className="ml-6 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                      onClick={() => handleStatusChange(request.id, "accepted")}
                    >
                      Accept
                    </button>
                    <button
                      className="ml-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      onClick={() => handleStatusChange(request.id, "rejected")}
                    >
                      Decline
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default ExchangeRequestsPage;
