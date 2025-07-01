import axios from "axios";

const baseUrl = "http://localhost:3001/api/reviews";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const create = async ({ reviewee, exchange, rating, comment }) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(
    baseUrl,
    { reviewee, exchange, rating, comment },
    config
  );
  return response.data;
};

export default { setToken, create };