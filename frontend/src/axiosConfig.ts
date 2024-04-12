import axios from 'axios';

const instance = axios.create({
  withCredentials: true, // send cookies with requests
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export default instance;
