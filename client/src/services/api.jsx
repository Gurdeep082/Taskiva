// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000     https://taskiva-1.onrender.com/api",
});

export default API;