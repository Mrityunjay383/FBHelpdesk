import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = "https://fb-helpdesk-mrityunjay-2fb983a3f040.herokuapp.com";
// const baseUrl = "http://localhost:5000";

const request = async (method, url, data) => {
  const { token } = Cookies.get();

  let headers = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    headers,
    validateStatus: false,
    withCredentials: true,
  };

  if (method === "GET") {
    return await axios.get(`${baseUrl}${url}`, config);
  } else if (method === "POST") {
    return await axios.post(`${baseUrl}${url}`, data, config);
  }
};

export const Auth = {
  root: () => {
    return request("GET", "/");
  },
  register: (data) => {
    return request("POST", "/auth/register", data);
  },
  login: (data) => {
    return request("POST", `/auth/login`, data);
  },
};

export const Facebook = {
  uri: "https://fb-helpdesk-mrityunjay-2fb983a3f040.herokuapp.com/facebook",
  deleteIntegration: () => {
    return request("GET", "/facebook/deleteIntegration");
  },
  conversations: () => {
    return request("GET", "/facebook/conversations");
  },
  indieConversation: (data) => {
    return request("POST", "/facebook/indieConversations", data);
  },
  sendMessage: (data) => {
    return request("POST", "/facebook/sendMessage", data);
  },
};
