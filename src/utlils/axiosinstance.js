import axios from "axios";
import { jwtDecode }from "jwt-decode";
import dayjs from "dayjs";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 


const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : null
  
  }
});

axiosInstance.interceptors.request.use(async (req) => {
  const token = localStorage.getItem('access_token');
  const refresh_token = localStorage.getItem('refresh_token');

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
    const user = jwtDecode(token);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) {
      return req;
    } else {
      try {
        const response = await axios.post(`${baseUrl}auth/token/refresh/`, { refresh: refresh_token });
        if (response.status === 200) {
          localStorage.setItem('access_token', response.data.access);
          req.headers.Authorization = `Bearer ${response.data.access}`;
          return req;
        }
      } catch (error) {
        console.error("Token refresh error:", error);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        window.location.href = '/login'; // Redirect to login if token refresh fails
      }
    }
  }

  return req;
}, error => {
  return Promise.reject(error);
});


export default axiosInstance;