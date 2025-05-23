import axios from "axios";

const baseRegisterUrl = "http://localhost:3001/api/register";

const register = async (credentials) => {
  console.log("Sending register request with credentials:", credentials);
  const response = await axios.post(baseRegisterUrl, credentials);
  return response.data;
};

export default { register };
