import dotenv from 'dotenv';

dotenv.config();

const isDevelopment = process.env.NODE_ENV === 'development';
const {
  PRODUCTION_URL_APP,
  PRODUCTION_URL_API,
  MONGO_URL_PRODUCTION,
  MONGO_URL_DEVELOPMENT,
  HOST,
  API_PORT,
  SESSION_NAME,
  SESSION_SECRET,
  SENDGRID_API_KEY,
} = process.env;

const { FACEBOOK_APP_ID, FACEBOOK_CLIENT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
const MONGO_URI = isDevelopment ? MONGO_URL_DEVELOPMENT : MONGO_URL_PRODUCTION;
const ROOT_URL = isDevelopment ? `http://${HOST}:${API_PORT}` : PRODUCTION_URL_API;
const redirectURL = isDevelopment ? `http://${HOST}:3000` : PRODUCTION_URL_APP;

export default {
  rootURL: ROOT_URL,
  apiPort: API_PORT,
  sessionName: SESSION_NAME,
  sessionSecret: SESSION_SECRET,
  redirectURL: redirectURL,
  sendgridKey: SENDGRID_API_KEY,
  auth: {
    facebook: {
      clientId: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: `/auth/facebook/callback`,
    },
    google: {
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `/auth/google/callback`,
    },
  },
  database: {
    connectionURI: MONGO_URI,
  },
};
