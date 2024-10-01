import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/swp391/", 
});

// làm 1 hành động gì đó trc khi call api
const handleBefore = (config) => {
    const token = localStorage.getItem("token")?.replaceAll('"', "");
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  };
  
  const handleError = (error) => {
    console.log(error);
  };
  
  api.interceptors.request.use(handleBefore, handleError);

export default api;