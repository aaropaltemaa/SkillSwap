import axios from "axios";

const baseUrl = "http://localhost:3001/api/exchange-requests";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export default { setToken };
