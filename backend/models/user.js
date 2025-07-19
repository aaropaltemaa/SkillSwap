const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minLength: 3,
  },
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

  passwordHash: {
    type: String,
    required: true,
  },

  bio: {
    type: String,
    maxlength: 500,
  },

  skillsOffered: [
    {
      type: String,
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
      ref: "Person", // references other matched users
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model("User", userSchema);
