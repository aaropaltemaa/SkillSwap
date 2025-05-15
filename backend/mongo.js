const mongoose = require("mongoose");
const User = require("./models/user");

const password = process.argv[2];

const url = `mongodb+srv://apaltemaa:${password}@cluster0.jnslbua.mongodb.net/SkillSwap?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const user = new User({
  username: "johnny",
  name: "John Doe",
  email: "john@gmail.com",
});

user.save().then((result) => {
  console.log("person saved!");
  mongoose.connection.close();
});
