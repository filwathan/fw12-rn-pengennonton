import axios from 'axios';
import {PENGEN_NONTON} from '@env';

const http = token => {
  const headers = {};
  if (token) {
    headers.Authorization = 'Bearer ' + token;
  }
  const instance = axios.create({
    baseURL: PENGEN_NONTON,
    // baseURL: 'http://192.168.1.12:8888',
    headers,
  });
  return instance;
};

export default http;
