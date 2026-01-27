import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.0.104:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ================= REQUEST INTERCEPTOR =================
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    // ✅ Attach token globally for ALL APIs
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ================= RESPONSE INTERCEPTOR =================
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.error("401 Unauthorized – token expired or invalid");

      // OPTIONAL (later):
      // 1. Refresh token
      // 2. Logout user
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
