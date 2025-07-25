// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://127.0.0.1:8000/", // Django backend
// });

// // Get tokens from localStorage
// const getAccessToken = () => localStorage.getItem("access");
// const getRefreshToken = () => localStorage.getItem("refresh");

// // Request interceptor to attach access token
// api.interceptors.request.use((config) => {
//   const token = getAccessToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Response interceptor for automatic token refresh
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If access token expired (401) and request not retried already
//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       const refresh = getRefreshToken();
//       if (refresh) {
//         try {
//           // Request new access token using refresh token
//           const res = await axios.post("http://127.0.0.1:8000/api/token/refresh/", { refresh });

//           // Save new token and retry original request
//           localStorage.setItem("access", res.data.access);
//           originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
//           return api(originalRequest);
//         } catch (refreshError) {
//           console.error("Refresh token invalid", refreshError);
//           localStorage.removeItem("access");
//           localStorage.removeItem("refresh");
//           window.location.href = "/login"; // redirect to login
//         }
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;



import axios from "axios";
import {jwtDecode} from "jwt-decode";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

const getAccessToken = () => localStorage.getItem("access");
const getRefreshToken = () => localStorage.getItem("refresh");

// Decode JWT expiry
const isTokenExpiringSoon = (token) => {
  try {
    const decoded = jwtDecode(token);
    const exp = decoded.exp * 1000;
    const now = Date.now();
    return exp - now < 60 * 1000; // less than 1 min remaining
  } catch (err) {
    return true;
  }
};

// Request interceptor
api.interceptors.request.use(async (config) => {
  let token = getAccessToken();
  const refresh = getRefreshToken();

  if (token && isTokenExpiringSoon(token) && refresh) {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/token/refresh/", { refresh });
      token = res.data.access;
      localStorage.setItem("access", token);
    } catch (err) {
      console.error("Refresh token expired", err);
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      window.location.href = "/login";
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor fallback (in case token unexpectedly expired)
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = getRefreshToken();
      if (refresh) {
        try {
          const res = await axios.post("http://127.0.0.1:8000/api/token/refresh/", { refresh });
          localStorage.setItem("access", res.data.access);
          originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
          return api(originalRequest);
        } catch (err) {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
