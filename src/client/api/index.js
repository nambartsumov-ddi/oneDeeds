import axios from 'axios';

const isDevelopment = process.env.NODE_ENV === 'development';

export default axios.create({
  baseURL: isDevelopment ? `/api/` : process.env.PRODUCTION_URL_API,
});
