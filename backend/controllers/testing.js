const router = require("express").Router();
const ExchangeRequest = require("../models/exchangerequest");
const User = require("../models/user");

router.post("/reset", async (request, response) => {
  await ExchangeRequest.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

module.exports = router;
