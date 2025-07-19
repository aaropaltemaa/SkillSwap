// Features.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  Users,
  MessageCircle,
  Sparkles,
  User,
  Repeat,
  Calendar,
} from "lucide-react";

const features = [
  {
    icon: <Sparkles size={28} />,
    title: "Skill-Based Matching",
    description:
      "Get automatically matched with users who complement your offered and wanted skills.",
  },
  {
    icon: <MessageCircle size={28} />,
    title: "Secure Messaging",
    description:
      "Chat directly with other users to coordinate sessions and build connections.",
  },
  {
    icon: <Repeat size={28} />,
    title: "Exchange Requests",
    description:
      "Send, receive, and manage skill exchange requests — all in one place.",
  },
  {
    icon: <User size={28} />,
    title: "User Profiles",
    description:
      "Share your skills, bio, and availability so others can connect with you easily.",
  },
  {
    icon: <Calendar size={28} />,
    title: "Availability Scheduling",
    description:
      "Set your weekly availability and coordinate times that work for both users.",
  },
  {
    icon: <Users size={28} />,
    title: "Community-Driven Growth",
    description:
      "Learn and teach in a growing community of motivated, skill-sharing peers.",
  },
];

const Features = () => {
  return (
    <section className="bg-white py-40 px-4 sm:px-6 lg:px-24">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">
          Everything You Need to Swap Skills
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Explore the tools that make learning and teaching effortless on
          SkillSwap.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 rounded-2xl p-8 shadow hover:shadow-lg transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 mx-auto bg-indigo-100 text-indigo-600 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
