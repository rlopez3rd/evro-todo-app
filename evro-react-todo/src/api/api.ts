import axios, { AxiosInstance } from 'axios';

const apiInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiInstance.interceptors.request.use(
  async (config) => {
    // Set the necessary CORS headers
    config.headers['Access-Control-Allow-Origin'] = '*';
    config.headers['Access-Control-Allow-Headers'] =
      'Origin, X-Requested-With, Content-Type, Accept';
    config.headers['Access-Control-Allow-Methods'] =
      'GET, POST, PUT, DELETE, OPTIONS';
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default apiInstance;
