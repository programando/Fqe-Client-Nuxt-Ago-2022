import { address } from '@/config/address';
import axios from "axios";

let Api = axios.create({
  baseURL: address.apiUrl
});
 
Api.defaults.withCredentials = true;

//Api.defaults.headers.post['Accept'] = 'application/json'; // for POST requests
//Api.defaults.headers.post['Authorization'] = 'Bearer ' + token


export default Api;