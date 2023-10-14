import axios, { AxiosResponse } from "axios";

const API = axios.create({ 
  baseURL:  "http://localhost:5000"
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")!).token
    }`;
  }
  return req;
});

type ApiFunction = (userData?: object | string) => Promise<AxiosResponse<object>>;

// User apis
export const signIn: ApiFunction = (userData) => API.post("/user/signin", userData);
export const signUp:ApiFunction = (userData) => API.post("/user/signup", userData);
export const updateUser:ApiFunction = (userData) => API.patch("/user/updateuser", userData);
export const updateuserImage:ApiFunction = (userData) => API.patch("/user/updateImage", userData);
export const refreshToken = () => API.post("/user/refreshToken");
export const sendVerificationEmail = () => API.post("/user/sendVerificationEmail");
export const verifyEmail = (token: string) => API.get(`/user/verify/${token}`);
