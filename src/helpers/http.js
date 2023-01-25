import axios from 'axios';

const http = token => {
  const headers = {};
  if (token) {
    headers.Authorization = 'Bearer ' + token;
  }
  const instance = axios.create({
    baseURL: 'https://fw12-backend-psi.vercel.app/',
    // baseURL: 'http://192.168.1.12:8888',
    headers,
  });
  return instance;
};

export default http;
