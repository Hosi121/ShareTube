import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // バックエンドのURLに合わせて変更してください
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // エラーハンドリングをここに追加できます
    console.error("API request failed:", error);
    return Promise.reject(error);
  }
);

export default api;
