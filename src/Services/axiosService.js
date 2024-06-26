import axios from "axios";

// const instance = axios.create({
//   baseURL: "http://localhost:7777/",
//   timeout: 5000,
// });

// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     config.headers.Authorization = token;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default instance;

const instance = axios.create({
  // baseURL: "http://localhost:7777/",
  baseURL:"https://paintcont.online/"
  // baseURL: "http://10.4.2.23:7777/",
  // timeout: 15000,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;