import axios from "axios";
import { jwtDecode }from "jwt-decode";
import dayjs from "dayjs";

const baseUrl = "http://localhost:8000/api/v1";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('access') ? `Bearer ${localStorage.getItem('access')}` : null
  
  }
});

axiosInstance.interceptors.request.use(async (req) => {
  const token = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : "";
  const refresh_token = localStorage.getItem('refresh') ? JSON.parse(localStorage.getItem('refresh')) : "";

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
    const user = jwtDecode(token);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) {
      return req;
    } else {
      try {
        const response = await axios.post(`${baseUrl}/auth/token/refresh/`, { refresh: refresh_token });
        if (response.status === 200) {
          localStorage.setItem('access', JSON.stringify(response.data.access));
          req.headers.Authorization = `Bearer ${response.data.access}`;
          return req;
        }
      } catch (error) {
        console.error("Token refresh error:", error);
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
  }

  return req;
}, error => {
  return Promise.reject(error);
});

export default axiosInstance;
