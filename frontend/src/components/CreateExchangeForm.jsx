import { useState } from 'react';
import exchangeRequestService from '../services/exchangerequests';

const CreateExchangeForm = ({ user, users, setExchangeRequests, exchangeRequests }) => {
    const [toUserId, setToUserId] = useState("");
    const [skillsOffered, setSkillsOffered] = useState([]);
    const [skillsWanted, setSkillsWanted] = useState([]);

    const otherUsers = users.filter(u => u.username !== user.username);

    const handleSubmit = async (event) => {
        event.preventDefault()

        const newExchangeRequest = await exchangeRequestService.create({
            toUser: toUserId,
            skillsOffered,
            skillsWanted
        })
        setExchangeRequests(exchangeRequests.concat(newExchangeRequest))
        setToUserId("")
        setSkillsOffered([])
        setSkillsWanted([])
    };

    return (
        <section className="rounded-xl shadow bg-white">
            <form className="max-w-xl mx-auto p-6 space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        Create Exchange Request
                    </h1>
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        To user
                    </label>
                    <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={toUserId}
                        onChange={(e) => setToUserId(e.target.value)}
                    >
                        <option value="" disabled>Select a user</option>
                        {otherUsers.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.username}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Skills Offered
                    </label>
                    <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </input>
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Skills Wanted
                    </label>
                    <input className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">

                    </input>
                </div>
                <div>
                    <button type="submit" onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        Create
                    </button>
                </div>
            </form>
        </section>
    )
}

export default CreateExchangeForm;