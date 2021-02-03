require('dotenv').config();

export default {
  name: 'MoreThanWords',
  version: '1.0.0',
  scheme: "morethanwords",
  extra: {
    apiUrl: 'http://10.245.50.160:5000',
    // apiUrl: 'https://more-than-words.herokuapp.com/' // PROD url
    // apiUrl: 'https://more-than-words-staging.herokuapp.com/' // STAGING url
    auth0_domain: process.env.AUTH0_DOMAIN,
    auth0_client_id: process.env.AUTH0_CLIENT_ID,
    auth0_dbconnection: process.env.AUTH0_DBCONNECTION,
    api_audience: process.env.API_AUDIENCE
  },
};
