import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

service.interceptors.response.use(response => {
  const total = parseInt(response.headers['x-total-count'], 10);

  return Promise.resolve({
    total,
    ...response.data
  });
});

export default service;
