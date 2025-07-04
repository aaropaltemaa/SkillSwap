import axios from "axios";

const baseLoginUrl = "/api/login";

const login = async (credentials) => {
  console.log("Sending login request with credentials:", credentials);
  const response = await axios.post(baseLoginUrl, credentials);
  return response.data;
};

export default { login };
