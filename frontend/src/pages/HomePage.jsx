import Hero from '../components/Hero'

const HomePage = ({ successMessage, user }) => (
    <>
        {successMessage && (
            <div className="bg-green-100 border border-green-400 rounded-2xl text-green-700 px-4 py-3 mb-4 max-w-lg mx-auto">
                {successMessage}
            </div>
        )}
        <Hero />
        {user && <h3 className="mt-4">Welcome {user.username}</h3>}
    </>
)

export default HomePage