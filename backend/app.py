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
@requires_auth(sf)
def outcomes(user):
    # parses arguments that user sent via query string
    email = user['Email']
    firstname = user['FirstName']
    lastname = user['LastName']
    name = firstname + " " + lastname 

    # Trainee Pod
    # salesforce query for all the field names and labels in the trainee pod 
    desc = sf.Trainee_POD_Map__c.describe()
    field_names_and_labels = [(field['name'], field['label']) for field in desc['fields']]
    
    # filter to get only the trainee outcome field names 
    filtered_field_names = [field for field in field_names_and_labels if "Outcomes__c" in field[0]]
    Trainee_field_names = [field[0] for field in filtered_field_names]

    # salesforce query of each *completed* outcome # in trainee pod, based on the email and name
    soql = "SELECT {} FROM Trainee_POD_Map__c".format(','.join(Trainee_field_names))
    sf_result = sf.query(format_soql((soql + " WHERE (Contact__r.email = {email_value} AND Contact__r.name={full_name})"), email_value=email, full_name=name))
    
    # count the *total* outcomes for each field 
    for field in Trainee_field_names:
        field_type = field[3:6].upper()
        sf_result[field_type + "_totalcount"] = 0; #create new value in sf_result dict that will store field's total outcomes 
        for name_and_label in field_names_and_labels:
            if "Outcome_" + field_type in name_and_label[0]: 
                sf_result[field_type + "_totalcount"] += 1
    
    return sf_result

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
