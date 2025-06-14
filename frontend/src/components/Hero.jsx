import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          Exchange Skills. Grow Together.
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Share what you know. Learn what you love. Connect with others through
          one-on-one skill swaps.
        </p>
        <div>
          <Link
            to="/register"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
          >
            Start Exchanging Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
