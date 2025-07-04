import axios from "axios";

const baseUrl = "/api/messages";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getThread = async (userId) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(`${baseUrl}/${userId}`, config);
  return response.data;
};

const sendMessage = async ({ receiver, content }) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(
    baseUrl,
    { receiver, content },
    config
  );
  return response.data;
};

const getThreads = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(`${baseUrl}/threads`, config);
  return response.data;
};

export default { setToken, getThread, sendMessage, getThreads };