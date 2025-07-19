const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/user");
const config = require("./utils/config");

const seedTestDatabase = async () => {
  try {
    console.log("Seeding test database...");
    console.log("Using database:", config.MONGODB_URI);

    // Ensure we're using test database
    if (
      !config.MONGODB_URI.includes("test") &&
      process.env.NODE_ENV !== "test"
    ) {
      throw new Error("Not running in test environment - refusing to seed");
    }

    // Connect to test database
    await mongoose.connect(config.MONGODB_URI);

    // Clear existing data
    await User.deleteMany({});
    console.log("Cleared existing users");

    // Create test users
    const passwordHash1 = await bcrypt.hash("sekret", 10);
    const passwordHash2 = await bcrypt.hash("password456", 10);

    const users = [
      {
        username: "root",
        name: "Root User",
        email: "root@example.com",
        passwordHash: passwordHash1,
        skillsOffered: ["javascript", "react"],
        skillsWanted: ["python", "django"],
      },
      {
        username: "user2",
        name: "User Two",
        email: "user2@example.com",
        passwordHash: passwordHash2,
        skillsOffered: ["python", "django"],
        skillsWanted: ["javascript", "react"],
      },
    ];

    const savedUsers = await User.insertMany(users);
    console.log(
      "Test database seeded successfully with users:",
      savedUsers.map((u) => u.username)
    );

    await mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding test database:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

// Allow running this script directly
if (require.main === module) {
  seedTestDatabase();
}

module.exports = seedTestDatabase;
