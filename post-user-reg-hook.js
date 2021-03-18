/**
@param {object} user - The user being created
@param {string} user.id - user id
@param {string} user.tenant - Auth0 tenant name
@param {string} user.username - user name
@param {string} user.email - email
@param {boolean} user.emailVerified - is e-mail verified?
@param {string} user.phoneNumber - phone number
@param {boolean} user.phoneNumberVerified - is phone number verified?
@param {object} user.user_metadata - user metadata
@param {object} user.app_metadata - application metadata
@param {object} context - Auth0 connection and other context info
@param {string} context.requestLanguage - language of the client agent
@param {object} context.connection - information about the Auth0 connection
@param {object} context.connection.id - connection id
@param {object} context.connection.name - connection name
@param {object} context.connection.tenant - connection tenant
@param {object} context.webtask - webtask context
@param {function} cb - function (error, response)
*/

// Perform any asynchronous actions, e.g. send notification to Slack.
const https = require("https");

const heroku_domain = "more-than-words-staging.herokuapp.com";

module.exports = function (user, context, cb) {
  // formatting of the requet
  const email = user.email;
  const postData = JSON.stringify({
    'email': email
  });
  let auth0response = {};
  const options = {
    port: 443,
    host: heroku_domain,
    method: 'POST',
    headers: {
      "Authorization": "Secret whatever",
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(postData)
    },
    path: "/finishSignUp"
  };
  
  // making the request
  const req = https.request(options, res => {
    res.on('data', (d) => {
      try {
        const result = JSON.parse(d.toString());
        if ("err" in result) {
          auth0response.user = user;
          return cb(null, auth0response);
        } else {
          return cb(new PostUserRegistrationError('User info registration server is down.', 
               'Sorry, our server seems to be down. Please retry in a few minutes'));
        }
      } catch (e) {
        return cb(new PostUserRegistrationError('User info registration server is down.', 
               'Sorry, our server seems to be down. Please retry in a few minutes'));
      }
    });
  });

  req.on('error', (e) => {
    return cb(new PostUserRegistrationError('User info registration server is down.', 
              'Sorry, our server seems to be down. Please retry in a few minutes'));
  });

  req.write(postData);

  req.end();
};
