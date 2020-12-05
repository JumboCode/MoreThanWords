require('dotenv').config();

export default {
  name: 'MoreThanWords',
  version: '1.0.0',
  extra: {
    apiUrl: 'http://YOUR.LOCAL.IP.ADDRESS:5000',
    // apiUrl: 'https://more-than-words.herokuapp.com/' // PROD url
    // apiUrl: 'https://more-than-words-staging.herokuapp.com/' // STAGING url
    auth0_domain: process.env.AUTH0_DOMAIN,
    auth0_client_id: process.env.AUTH0_CLIENT_ID,
    auth0_dbconnection: process.env.AUTH0_DBCONNECTION
  },
};
