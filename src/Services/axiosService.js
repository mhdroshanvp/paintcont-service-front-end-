import axios from "axios";
import { useLocation } from "react-router-dom";

const instance = axios.create({
  // baseURL: "http://localhost:7777/",
  baseURL:"https://paintcont.online/"
  // timeout: 15000,
});

instance.interceptors.request.use(
  (config) => {

    let path = window.location.pathname.split("/")[1]
    let token 


    if(path.toLocaleLowerCase() === "painter"){
      token = localStorage.getItem("Painter_token")
    }else if (path.toLocaleLowerCase() === "user"){
      token = localStorage.getItem("token")
    }else if(path.toLocaleLowerCase() == "admin"){
      token = localStorage.getItem("admin_token")
    }


    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default instance;