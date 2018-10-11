import axios from 'axios';

const isDevelopment = process.env.NODE_ENV === 'development';

export default axios.create({
  baseURL: isDevelopment ? `/api/` : 'https://api.onedeeds.com',
  withCredentials: true,
});
