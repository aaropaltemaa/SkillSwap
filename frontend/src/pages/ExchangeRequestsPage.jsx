
const ExchangeRequestsPage = ({ exchangeRequests }) => {
    const statusColors = {
        pending: 'warning.main',
        accepted: 'success.main',
        rejected: 'error.main',
    };

    if (exchangeRequests.length === 0) {
        return (
            <section className="flex">
                No exchange requests found.
            </section>
        )
    }

    return (
        <>
            <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 mb-13">
                My Exchange Requests
            </h1>
            <section className="max-w-4xl mx-auto px-4">
                <h2 className="text-xl font-semibold text-gray-700">Sent Requests</h2>
                <div className="space-y-4 mb-10">
                    <div className="p-4 border rounded-lg bg-white shadow-sm flex justify-between items-center">
                        <div>
                            <p className="font-medium text-gray-800">To: Sarah Lee</p>
                            <p className="text-sm text-gray-600">
                                You offered: Web Design • You want: Public Speaking
                            </p>
                        </div>
                        <div className="text-sm text-yellow-600 font-medium">Pending</div>
                    </div>
                </div>
            </section>
            <section className="max-w-4xl mx-auto px-4">
                <h2 className="text-xl font-semibold text-gray-700">Received Requests</h2>
                <div className="space-y-4 mb-10">
                    <div className="p-4 border rounded-lg bg-white shadow-sm flex justify-between items-center">
                        <div>
                            <p className="font-medium text-gray-800">From: Sarah Lee</p>
                            <p className="text-sm text-gray-600">
                                They offered: Web Design • They want: Public Speaking
                            </p>
                        </div>
                        <div className="text-sm text-yellow-600 font-medium">Pending</div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ExchangeRequestsPage