from flask import Flask
from flask_cors import CORS
import os # for environment variables
from flask import request, jsonify # imported for parsing arguemnts
from simple_salesforce import Salesforce, format_soql # import Salesforce

from auth import AuthError, requires_auth


# global connection to Salesforce so we don't need to connect everytime, CHANGE TO ENV VARIABLE OR take  
sf = Salesforce(
    username=os.environ['SALESFORCE_USERNAME'],
    password=os.environ['SALESFORCE_PASSWORD'],
    security_token=os.environ['SALESFORCE_SECURITY_TOKEN'])
app = Flask(__name__)
CORS(app)


# Error handler for the Auth Error
@app.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response


@app.route("/userinfo")
@requires_auth(sf)
def sample(user):
    return jsonify(user)


@app.route("/finishSignUp", methods=['POST'])
def finishSignup():
    """
    After sign up, to be called by auth0 to checkoff the box in salesforce
    to indicate that the account has been registered.
    """
    secret = request.headers.get('Authorization')
    email = request.json.get('email')
    correct_secret = os.environ.get('VERIFY_SIGNUP_SECRET')
    # exit when the wrong secret is provided
    if (not secret or secret != "Secret " + correct_secret):
        response = jsonify({"code": "invalid_secret",
                            "description": "Access denied."})
        response.status_code = 401
        return response
    
    # get the object
    response = sf.query(
        format_soql("SELECT Id, Has_Youth_App_Account__c FROM Contact WHERE (email = {email})", 
                    email=email))
    if response.get("totalSize") is None or response.get("totalSize") < 0:
        response = jsonify({
            "code": "user_not_found", 
            "description": "The User is not found in the database."
        })
        response.status_code = 401
        return response
    
    # update the contact
    sf.Contact.update(response["records"][0]["Id"], {"Has_Youth_App_Account__c": True})

    return jsonify({"result": "success"})


# route to verify sign up and check whether user who wants to register is 
# allowed to use the app by checking salesforce database
@app.route("/verifySignUp")
def verify():
	# secret to check if the client is valid
    secret = request.args.get('secret')
    correct_secret = os.environ.get('VERIFY_SIGNUP_SECRET')
    if (not secret or secret != correct_secret):
	    response = jsonify({"code": "invalid_secret",
						"description": "Access denied."})
	    response.status_code = 401
	    return response

	# parses arguments that user sent via query string
    email = request.args.get('email')
    firstname = request.args.get('firstname')
    lastname = request.args.get('lastname')
    name = firstname + " " + lastname
    print("name: ", name)

    # salesforce query based on the email, firstname & lastname
    result = sf.query(format_soql("SELECT Id, Email FROM Contact WHERE (email = {email_value} AND name={full_name})", email_value=email, full_name=name))

    print(result["totalSize"] == 1)

    if (result["totalSize"] == 1):
        return {"verified": bool(1)} # true
	
	
    return {"verified": bool(0)} # false

@app.route("/calculateProgressBar")
def outcomes():
    # parses arguments that user sent via query string
    email = request.args.get('email')
    firstname = request.args.get('firstname')
    lastname = request.args.get('lastname')
    name = firstname + " " + lastname 

    # salesforce query of each completed outcome # in trainee pod, based on the email and name
    outcomes_result = sf.query(format_soql("SELECT TR_CareerExpl_Completed__c, TR_Competency_Completed__c, TR_LifeEssentials_Completed__c FROM Trainee_POD_Map__c WHERE (Contact__r.email = {email_value} AND Contact__r.name={full_name})",
                email_value = email, full_name=name))   
    return outcomes_result

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
