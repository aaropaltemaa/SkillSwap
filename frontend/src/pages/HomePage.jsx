import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";

const HomePage = ({ successMessage }) => (
  <>
    {successMessage && (
      <div className="bg-green-100 border border-green-400 rounded-2xl text-green-700 px-4 py-3 mb-4 max-w-lg mx-auto">
        {successMessage}
      </div>
    )}
    <Hero />
    <div className="mt-4"></div>
    <HowItWorks />
  </>
);

export default HomePage;
