require('dotenv').config();

export default {
  name: 'MoreThanWords',
  slug: "mtw",
  orientation: "portrait",
  icon: "./assets/icon.png",
  version: '3.0.1',
  scheme: "morethanwords",
  extra: {
    //apiUrl: 'http://YOUR.LOCAL.IP.ADDRESS:5000',
    apiUrl: 'https://more-than-words.herokuapp.com/', // PROD url
    // apiUrl: 'https://more-than-words-staging.herokuapp.com/', // STAGING url
    auth0_domain: process.env.AUTH0_DOMAIN,
    auth0_client_id: process.env.AUTH0_CLIENT_ID,
    auth0_dbconnection: process.env.AUTH0_DBCONNECTION,
    api_audience: process.env.API_AUDIENCE
  },
  android: {
    "package": "com.jumbocode.mtw_youth",
    "versionCode": 7
  },
  ios: {
    bundleIdentifier: "com.jumbocode.morethanwords"
  }
};
