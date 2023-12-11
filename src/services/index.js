import axios from "axios";

let baseURL = process.env.NEXT_PUBLIC_BACKEND_API;

const Api = axios.create({
  baseURL: baseURL,
});

Api.interceptors.request.use((config) => {
  if (!config.headers) {
    return config;
  }

  if (typeof window !== "undefined") {
    let token = localStorage.getItem("token");
    
    if (token) {     
      return {
        ...config,
        headers: {
          ...config.headers,
        },
      };
    } else {
      return config;
    }
  } else {
    return config;
  }
});

Api.interceptors.response.use(
  (res) => {
    return res;
  },
  function (err) {
    const status = err?.response?.status;
    if (status === 422) {
      const messages = err?.response?.data;
      console.log("messages", messages);
    }
    return Promise.reject(err);
  }
);

export default Api;
