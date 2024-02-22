import axios from "axios";

const baseUrl = "http://localhost:5000";

const request = async (method, url, data) => {
  const config = {
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
  logout: () => {
    return request("GET", "/auth/logout");
  },
};

export const Facebook = {
  uri: "https://7468-223-178-99-249.ngrok-free.app/facebook",
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
