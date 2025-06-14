const ExchangeRequestsPage = ({ exchangeRequests, user }) => {
    if (!user) {
     return <div>Please log in to view your exchange requests.</div>;

  }

    const sentRequests = exchangeRequests.filter(r => r.fromUser.id === user.id)
    const receivedRequests = exchangeRequests.filter(r => r.toUser.id === user.id)

    const statusColors = {
        pending: 'warning.main',
        accepted: 'success.main',
        rejected: 'error.main',
    };

    return (
  <div className="max-w-2xl mx-auto p-6">
    <h1 className="text-2xl font-bold mb-4">My Exchange Requests</h1>

    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Sent Requests</h2>
      {sentRequests.length === 0 ? (
        <div className="text-gray-500">No sent requests.</div>
      ) : (
        sentRequests.map(request => (
          <div key={request.id} className="rounded-lg shadow p-4 mb-4 bg-white">
            <div>
              <span className="font-semibold">To:</span> {request.toUser.username}
            </div>
            <div>
              <span className="font-semibold">Skills Offered:</span> {request.skillsOffered.join(", ")}
            </div>
            <div>
              <span className="font-semibold">Skills Wanted:</span> {request.skillsWanted.join(", ")}
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
        receivedRequests.map(request => (
          <div key={request.id} className="rounded-lg shadow p-4 mb-4 bg-white">
            <div>
              <span className="font-semibold">From:</span> {request.fromUser.username}
            </div>
            <div>
              <span className="font-semibold">Skills Offered:</span> {request.skillsOffered.join(", ")}
            </div>
            <div>
              <span className="font-semibold">Skills Wanted:</span> {request.skillsWanted.join(", ")}
            </div>
          </div>
        ))
      )}
    </section>
  </div>
)
}

export default ExchangeRequestsPage