// HowItWorks.jsx
import { motion } from "framer-motion";
import { Lightbulb, Users, Send } from "lucide-react";

const steps = [
  {
    icon: <Lightbulb size={32} />,
    title: "List Your Skills",
    description:
      "Add the skills you offer and the ones you want to learn. Your profile becomes your personal exchange hub.",
  },
  {
    icon: <Users size={32} />,
    title: "Get Matched",
    description:
      "We’ll suggest users whose skills complement yours so you can swap and grow together.",
  },
  {
    icon: <Send size={32} />,
    title: "Start Swapping",
    description:
      "Send requests, chat, and schedule your first skill exchange — all inside the app.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">
          How SkillSwap Works
        </h2>
        <p className="text-gray-600 text-center max-w-xl mx-auto mb-12">
          It’s easy to get started. Just follow these three simple steps.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
            >
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-indigo-100 text-indigo-600 rounded-full">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
