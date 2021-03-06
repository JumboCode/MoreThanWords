from flask import Flask
from flask_cors import CORS
import os # for environment variables
from flask import request, jsonify # imported for parsing arguemnts
from simple_salesforce import Salesforce, format_soql # import Salesforce
from auth import AuthError, requires_auth


# global connection to Salesforce so we don't need to connect everytime
sf = Salesforce(
    username=os.environ['SALESFORCE_USERNAME'],
    password=os.environ['SALESFORCE_PASSWORD'],
    security_token=os.environ['SALESFORCE_SECURITY_TOKEN'])
app = Flask(__name__)
CORS(app)

@app.route("/youthCheckbox")
@requires_auth(sf)
def youthCheck(user):
    # Extract user details from the user object
    email = user.get('Email')
    firstname = user.get('FirstName')
    lastname = user.get('LastName')
    fullname = firstname + " " + lastname

    # Extract current pod to update from request arguments
    pod = request.args.get('pod')
    pod_map_name = pod + '_POD_Map__c'

    # Obtain all field names for the query
    desc = getattr(sf, pod_map_name).describe()
    field_names_and_labels = [(field['name'], field['label']) for field in desc['fields']]
    field_names = [field['name'] for field in desc['fields']]

    # Query for all fields for this user
    soql = ("SELECT {} FROM " + pod_map_name).format(','.join(field_names))
    sf_result = sf.query(format_soql((soql + " WHERE (Contact__r.email = {email_value} AND Contact__r.name={full_name})"), email_value=email, full_name=fullname))

    # Format response
    response = {}
    for name_and_label in field_names_and_labels:
        response[name_and_label[0]] = {
            "name": name_and_label[1],
            "value": None
        }
    for name, value in sf_result["records"][0].items():
        if name in response.keys():
            response[name]["value"] = value
    print(response)
    return response

@app.route("/updateCheckbox", methods=['POST'])
@requires_auth(sf)
def updateSalesforce(user):
    # Extract user details from the user object
    email = user.get('Email')
    firstname = user.get('FirstName')
    lastname = user.get('LastName')
    fullname = firstname + " " + lastname

    # Extract current pod to update from JSON body data
    pod = request.json.get('pod')
    pod_map_name = pod + '_POD_Map__c'

    # Query for this user in Salesforce
    soql = "SELECT Contact__c FROM " + pod_map_name
    sf_result = sf.query(format_soql((soql + " WHERE (Contact__r.email = {email_value} AND Contact__r.name={full_name})"), email_value=email, full_name=fullname))

    # Obtain pod ID
    tr_pod_id = sf_result['records'][0]['attributes']['url'].split('/')[-1]
    task_title = request.json.get('task_title')
    new_value = request.json.get('new_value')

    # Update value of specific task in Salesforce
    getattr(sf, pod_map_name).update(tr_pod_id, {task_title: new_value})

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

    # print(result["totalSize"] == 1)

    if (result["totalSize"] == 1):
        return {"verified": bool(1)} # true
	
    return {"verified": bool(0)} # false

@app.route("/calcProgressHomeScreen")
@requires_auth(sf)
def HomeScreenoutcomes(user):
    # parses arguments that user sent via query string
    email = user['Email']
    firstname = user['FirstName']
    lastname = user['LastName']
    name = firstname + " " + lastname 

# Trainee Pod
    desc = sf.Trainee_POD_Map__c.describe()
    field_names_and_labels = [(field['name'], field['label']) for field in desc['fields']]
    filtered_field_names = [field for field in field_names_and_labels if "Completed__c" in field[0]]
    Trainee_field_names = [field[0] for field in filtered_field_names]

    # salesforce query of each completed outcome # in trainee pod, based on the email and name
    soql = "SELECT {} FROM Trainee_POD_Map__c".format(','.join(Trainee_field_names))
    Trainee_sf_result = sf.query(format_soql((soql + " WHERE (Contact__r.email = {email_value} AND Contact__r.name={full_name})"), email_value=email, full_name=name))
    
    # calculate Trainee total 
    Trainee_total_count = 0; #create new value in sf_result dict that will store field's total outcomes 
    for field in Trainee_field_names:
        field_type = field[3:6].upper()
        for name_and_label in field_names_and_labels:
            if "_Outcome_" + field_type in name_and_label[0]: 
                Trainee_total_count += 1

    # transform into a python dictionary
    vars(Trainee_sf_result)

    # calculate *Trainee* outcomes based on all related fields
    Trainee_outcome_sum = 0
    for outcome in Trainee_field_names:
        Trainee_outcome_sum += Trainee_sf_result['records'][0][outcome]

# Associate Pod
    Associate_desc = sf.Associate_POD_Map__c.describe()
    Associate_field_names_and_labels = [(field['name'], field['label']) for field in Associate_desc['fields']]
    Associate_filtered_field_names = [field for field in Associate_field_names_and_labels if "Completed__c" in field[0]]
    Associate_field_names = [field[0] for field in Associate_filtered_field_names]

    # salesforce query of each completed outcome # in associate pod, based on the email and name
    soql = "SELECT {} FROM Associate_POD_Map__c".format(','.join(Associate_field_names))
    Associate_sf_result = sf.query(format_soql((soql + " WHERE (Contact__r.email = {email_value} AND Contact__r.name={full_name})"), email_value=email, full_name=name))

    # calculate Trainee total 
    Associate_total_count = 0; #create new value in sf_result dict that will store field's total outcomes 
    for field in Associate_field_names:
        field_type = field[3:6].upper()
        for name_and_label in Associate_field_names_and_labels:
            if "_Outcome_" + field_type in name_and_label[0]: 
                Associate_total_count += 1

    # transform into a python dictionary
    vars(Associate_sf_result)

    # calculate *Trainee* outcomes based on all related fields
    Associate_outcome_sum = 0
    for outcome in Associate_field_names:
        Associate_outcome_sum += Associate_sf_result['records'][0][outcome]

  
# Partner Pod
    desc = sf.Partner_POD_Map__c.describe()
    Partner_field_names_and_labels = [(field['name'], field['label']) for field in desc['fields']]
    Partner_filtered_field_names = [field for field in Partner_field_names_and_labels if "Completed__c" in field[0]]
    Partner_field_names = [field[0] for field in Partner_filtered_field_names]

    # calculate Trainee total 
    Partner_total_count = 0; #create new value in sf_result dict that will store field's total outcomes 
    for field in Partner_field_names:
        field_type = field[3:6].upper()
        for name_and_label in Partner_field_names_and_labels:
            if "_Outcome_" + field_type in name_and_label[0]: 
                Partner_total_count += 1
     
    # salesforce query of each completed outcome # in trainee pod, based on the email and name
    soql = "SELECT {} FROM Partner_POD_Map__c".format(','.join(Partner_field_names))
    Partner_sf_result = sf.query(format_soql((soql + " WHERE (Contact__r.email = {email_value} AND Contact__r.name={full_name})"), email_value=email, full_name=name))
  
    # print('_________________________________________________')
    # print(Partner_sf_result)

    # transform into a python dictionary
    # vars(Partner_sf_result)

    # calculate *Partner* outcomes based on all related fields
    # Partner_outcome_sum = 0
    # for outcome in Partner_field_names:
    #     Partner_outcome_sum += Partner_sf_result['records'][0][outcome]

    # print(Partner_outcome_sum)
    
    # TODO:  Partner Pod
    sum_pod_outcome = {
        'Trainee_complete': Trainee_outcome_sum,
        'Trainee_total': Trainee_total_count,
        'Associate_complete': Associate_outcome_sum,
        'Associate_total': Associate_total_count,
        # 'Partner_complete': Partner_outcome_sum,
        'Partner_total': Partner_total_count
    }    
    
    return sum_pod_outcome
    
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
    filtered_field_names = [field for field in field_names_and_labels if "Completed__c" in field[0]]
    Trainee_field_names = [field[0] for field in filtered_field_names]

    # salesforce query of each *completed* outcome # in trainee pod, based on the email and name
    soql = "SELECT {} FROM Trainee_POD_Map__c".format(','.join(Trainee_field_names))
    sf_result = sf.query(format_soql((soql + " WHERE (Contact__r.email = {email_value} AND Contact__r.name={full_name})"), email_value=email, full_name=name))

    # count the *total* outcomes for each field 
    for field in Trainee_field_names:
        field_type = field[3:6].upper()
        sf_result[field_type + "_totalcount"] = 0; #create new value in sf_result dict that will store field's total outcomes 
        for name_and_label in field_names_and_labels:
            if "_Outcome_" + field_type in name_and_label[0]: 
                sf_result[field_type + "_totalcount"] += 1
    
    return sf_result

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
