require('dotenv').config();

export default {
  name: 'MoreThanWords',
  version: '1.0.0',
  scheme: "morethanwords",
  extra: {
<<<<<<< HEAD
    apiUrl: 'http://10.0.0.141:5000/',
=======
    apiUrl: 'http://YOUR.LOCAL.IP.ADDRESS:5000',
>>>>>>> staging
    // apiUrl: 'https://more-than-words.herokuapp.com/' // PROD url
    // apiUrl: 'https://more-than-words-staging.herokuapp.com/' // STAGING url
    auth0_domain: process.env.AUTH0_DOMAIN,
    auth0_client_id: process.env.AUTH0_CLIENT_ID,
    auth0_dbconnection: process.env.AUTH0_DBCONNECTION,
    api_audience: process.env.API_AUDIENCE
  },
};
