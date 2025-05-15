const mongoose = require("mongoose");

const password = process.argv[2];

const url = `mongodb+srv://skillswapuser:${password}@cluster0.jnslbua.mongodb.net/SkillSwap?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  /* password: {
    type: String,
    required: true,
  }, */

  bio: {
    type: String,
    maxlength: 500,
  },

  skillsOffered: [
    {
      type: String, // e.g., "Guitar", "Python"
      trim: true,
      lowercase: true,
    },
  ],

  skillsWanted: [
    {
      type: String, // e.g., "French", "UI Design"
      trim: true,
      lowercase: true,
    },
  ],

  location: {
    type: String, // e.g., "New York" or time zone
  },

  matches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // references other matched users
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: "John Doe",
  email: "john@gmail.com",
});

person.save().then((result) => {
  console.log("person saved!");
  mongoose.connection.close();
});
