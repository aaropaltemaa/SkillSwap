// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah L.",
    location: "New York, USA",
    quote:
      "I taught web design and learned guitar — never thought I’d enjoy learning this much online!",
  },
  {
    name: "Andre T.",
    location: "Montreal, Canada",
    quote:
      "It’s like a barter system for skills. I exchanged French lessons for cooking tips!",
  },
  {
    name: "Mina R.",
    location: "London, UK",
    quote:
      "SkillSwap helped me find a language partner for Spanish and share my photography skills in return.",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gray-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">What Our Users Are Saying</h2>
        <p className="text-gray-600 mb-12 max-w-xl mx-auto">
          Real stories from the SkillSwap community.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <p className="italic text-gray-700 mb-4">“{t.quote}”</p>
              <div className="text-sm font-semibold text-indigo-600">
                {t.name} <span className="text-gray-500">— {t.location}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
