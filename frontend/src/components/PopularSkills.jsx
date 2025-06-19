const skills = [
  { icon: "💻", label: "Programming" },
  { icon: "🎨", label: "Art & Design" },
  { icon: "🗣️", label: "Languages" },
  { icon: "🎸", label: "Music" },
  { icon: "📷", label: "Photography" },
  { icon: "👨‍🍳", label: "Cooking" },
  { icon: "📈", label: "Marketing" },
  { icon: "✍️", label: "Writing" },
];

const PopularSkills = () => {
  return (
    <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Popular Skill Categories</h2>
        <p className="text-gray-600 mb-12 max-w-xl mx-auto">
          Explore what people are teaching and learning on SkillSwap.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-gray-50 hover:bg-indigo-100 transition-colors rounded-xl shadow-sm p-6 text-center cursor-pointer"
            >
              <div className="text-3xl mb-2">{skill.icon}</div>
              <h3 className="text-lg font-medium text-gray-800">
                {skill.label}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularSkills;
