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

@app.route("/youthCheckbox")
@requires_auth(sf)
def youthCheck(user):
    email = user.get('Email')
    firstname = user.get('FirstName')
    lastname = user.get('LastName')
    fullname = firstname + " " + lastname
    pod = request.args.get('pod')
    pod_map_name = pod + '_POD_Map__c'

    desc = getattr(sf, pod_map_name).describe()
    # desc = sf.Trainee_POD_Map__c.describe()
    field_names_and_labels = [(field['name'], field['label']) for field in desc['fields']]
    field_names = [field['name'] for field in desc['fields']]

    
    soql = ("SELECT {} FROM " + pod_map_name).format(','.join(field_names))
    # Youth should be changed to Contact once fixed in salesforce
    sf_result = sf.query(format_soql((soql + " WHERE (Youth__r.email = {email_value} AND Youth__r.name={full_name})"), email_value=email, full_name=fullname))

    response = {}
    for name_and_label in field_names_and_labels:
        response[name_and_label[0]] = {
            "name": name_and_label[1],
            "value": None
        }

    for name, value in sf_result["records"][0].items():
        if name in response.keys():
            response[name]["value"] = value
    
    return response

@app.route("/updateCheckbox", methods=['POST'])
@requires_auth(sf)
def updateSalesforce(user):
    email = user.get('Email')
    firstname = user.get('FirstName')
    lastname = user.get('LastName')
    fullname = firstname + " " + lastname

    soql = "SELECT Contact__c FROM Trainee_POD_Map__c"
    sf_result = sf.query(format_soql((soql + " WHERE (Contact__r.email = {email_value} AND Contact__r.name={full_name})"), email_value=email, full_name=fullname))

    print(sf_result)

    tr_pod_id = sf_result['records'][0]['attributes']['url'].split('/')[-1]
    task_title = request.json.get('task_title')
    new_value = request.json.get('new_value')

    sf.Trainee_POD_Map__c.update(tr_pod_id, {task_title: new_value})

    return {}

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
    app.run(debug=True, host=os.environ['LOCAL_IPV4'])
