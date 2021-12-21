import axios from 'axios';
import store from '../store';
import { api } from '../urlConfig';

const token = window.localStorage.getItem('tokenAdmin');

// console.error('token: ', token)

const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    'Accept': 'application/json',
    'Content-Type': ' application/json',
    'Authorization': `Bearer ${token}`
  }
})

axiosInstance.interceptors.request.use((req) => {
  const { auth } = store.getState();
  // console.error('token: ',auth.token)
  if(auth.token){
      req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
})

export default axiosInstance;