/* axios instance placeholder; using direct axios calls in pages */
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL||"http://localhost:5001",
  withCredentials: true, // ✅ cookie send hoga automatically
});

export default api;
