import dotenv from 'dotenv';

dotenv.config();

const isDevelopment = process.env.NODE_ENV === 'development';
const {
  ROOT_DOMAIN_PROD,
  PRODUCTION_URL_APP,
  PRODUCTION_URL_API,
  MONGO_URL_PRODUCTION,
  MONGO_URL_DEVELOPMENT,
  HOST,
  API_PORT,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  FACEBOOK_APP_ID_PROD,
  FACEBOOK_CLIENT_SECRET_PROD,
  FACEBOOK_APP_ID_DEV,
  FACEBOOK_CLIENT_SECRET_DEV,
  SENDGRID_API_KEY_PROD,
  SENDGRID_API_KEY_DEV,
  MAILCHIMP_API_KEY_PROD,
  MAILCHIMP_API_KEY_DEV,
  MAILCHIMP_LIST_ACTIVE_USERS_PROD,
  MAILCHIMP_LIST_ACTIVE_USERS_DEV,
  STRIPE_API_KEY_DEVELOPMENT,
  STRIPE_SECRET_KEY_DEVELOPMENT,
  STRIPE_PLAN_ID,
  STRIPE_PRODUCTION_ENDPOINTSECRET,
} = process.env;

const MONGO_URI = isDevelopment ? MONGO_URL_DEVELOPMENT : MONGO_URL_PRODUCTION;
const ROOT_SERVER_URL = isDevelopment ? `http://${HOST}:${API_PORT}` : PRODUCTION_URL_API;
const ROOT_CLIENT_URL = isDevelopment ? `http://${HOST}:3000` : PRODUCTION_URL_APP;

export default {
  rootServerURL: ROOT_SERVER_URL,
  rootClientURL: ROOT_CLIENT_URL,
  rootDomainProd: ROOT_DOMAIN_PROD,
  apiPort: API_PORT,
  sendgridKey: isDevelopment ? SENDGRID_API_KEY_DEV : SENDGRID_API_KEY_PROD,
  mailchimpApiKey: isDevelopment ? MAILCHIMP_API_KEY_DEV : MAILCHIMP_API_KEY_PROD,
  maillchimpListActiveUsers: isDevelopment ? MAILCHIMP_LIST_ACTIVE_USERS_DEV : MAILCHIMP_LIST_ACTIVE_USERS_PROD,
  payMethod: {
    // TODO: Fill API key for production
    stripeApiKey: isDevelopment ? STRIPE_API_KEY_DEVELOPMENT : '',
    stripeSecretKey: isDevelopment ? STRIPE_SECRET_KEY_DEVELOPMENT : '',
    stripePlanId: STRIPE_PLAN_ID,
    stripeEndpointSecret: STRIPE_PRODUCTION_ENDPOINTSECRET,
  },
  auth: {
    facebook: {
      clientId: isDevelopment ? FACEBOOK_APP_ID_DEV : FACEBOOK_APP_ID_PROD,
      clientSecret: isDevelopment ? FACEBOOK_CLIENT_SECRET_DEV : FACEBOOK_CLIENT_SECRET_PROD,
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
  isDevelopment,
};
