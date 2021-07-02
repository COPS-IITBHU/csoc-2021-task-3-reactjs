// importing... 
import { API_URL } from "./constants";
import axios from "axios";



var axiosInstance = axios.create({
  baseURL: API_URL,
});



// exporting...
export default axiosInstance;
