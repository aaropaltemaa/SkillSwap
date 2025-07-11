import axios from "axios";

const baseRegisterUrl = "/api/register";

const register = async (credentials) => {
  console.log("Sending register request with credentials:", credentials);
  const response = await axios.post(baseRegisterUrl, credentials);
  return response.data;
};

export default { register };
