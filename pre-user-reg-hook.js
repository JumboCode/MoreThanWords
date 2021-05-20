/**
@param {object} user - The user being created
@param {string} user.tenant - Auth0 tenant name
@param {string} user.username - user name
@param {string} user.password - user's password
@param {string} user.email - email
@param {boolean} user.emailVerified - is e-mail verified?
@param {string} user.phoneNumber - phone number
@param {boolean} user.phoneNumberVerified - is phone number verified?
@param {object} context - Auth0 connection and other context info
@param {string} context.renderlanguage - language used by signup flow
@param {string} context.request.ip - ip address
@param {string} context.request.language - language of the client agent
@param {object} context.connection - information about the Auth0 connection
@param {object} context.connection.id - connection id
@param {object} context.connection.name - connection name
@param {object} context.connection.tenant - connection tenant
@param {object} context.webtask - webtask context
@param {function} cb - function (error, response)
*/


const https = require("https");

const heroku_domain = "more-than-words-staging.herokuapp.com";

module.exports = function (user, context, cb) {
  // formatting of the requet
  const firstname = user.user_metadata["firstname"];
  const lastname = user.user_metadata["lastname"];
  const pass = "SVyiF72hZFC90S3PLcfifAbJTNljDv";
  const path = encodeURIComponent("verifySignUp?email=" + user.email + "&secret=" + pass + "&firstname=" + firstname + "&lastname=" + lastname);
  const options = {
    port: 443,
    host: heroku_domain,
    method: 'GET',
    path: path
  };
  
  // making the request
  const req = https.request(options, res => {
    res.on('data', (d) => {
      try {
        const result = JSON.parse(d.toString());
        console.log(result);
        let response = {};
        if (result.verified) {
          user.name = firstname + " " + lastname;
          user.family_name = lastname;
          user.given_name = firstname;
          response.user = user;
          return cb(null, response);
        } else {
          return cb(new PreUserRegistrationError('Failed User verification', 
              'Sorry, your information does not seem to match our records. ' + 
              'Please make your info is correct and try again.'));
        }
      } catch (e) {
        return cb(new PreUserRegistrationError('User info registration server is down.', 
               'Sorry, our server seems to be down. Please retry in a few minutes'));
      }
    });
  });

  req.on('error', (e) => {
    return cb(new PreUserRegistrationError('User info registration server is down.', 
              'Sorry, our server seems to be down. Please retry in a few minutes'));
  });

  req.end();

  

  // Add user or app metadata to the newly created user
  // response.user.user_metadata = { foo: 'bar' };
  // response.user.app_metadata = { vip: true, score: 7 };

  // Deny the user's registration and send a localized message to New Universal Login
  // if (denyRegistration) {
  //    const LOCALIZED_MESSAGES = {
  //      en: 'You are not allowed to register.',
  //      es: 'No tienes permitido registrarte.'
  //    };
  //
  //    const localizedMessage = LOCALIZED_MESSAGES[context.renderLanguage] || LOCALIZED_MESSAGES['en'];
  //    return cb(new PreUserRegistrationError('Denied user registration in Pre User Registration Hook', localizedMessage));
  // }
};
