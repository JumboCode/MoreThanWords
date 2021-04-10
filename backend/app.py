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
    user_id = user.get('id')

    # Extract current pod to update from request arguments
    pod = request.args.get('pod')
    focus_area = request.args.get('focus_area')
    pod_map_name = pod + '_POD_Map__c'

    # Obtain all field names for the query
    desc = getattr(sf, pod_map_name).describe()
    field_names_and_labels = [(field['name'], field['label']) for field in desc['fields']]
    field_names = [field['name'] for field in desc['fields']]

    # Query for all fields for this user
    soql = ("SELECT {} FROM " + pod_map_name).format(','.join(field_names))
    sf_result = sf.query(format_soql((soql + " WHERE (Contact__r.auth0_user_id__c={user_id})"), user_id=user_id))

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

    def clean_response(response):
        new_data = []

        # Helper function to find and update in new_data based on api_name
        def find_and_update(new_data, api_name, index, field_name, get_key=False):
            words_in_api_name = api_name.split("_")
            curr_id = words_in_api_name[len(words_in_api_name) - 3].lower()
            content_index = -1
            try:
                content_index = [ x['id'] for x in new_data[index]['content'] ].index(curr_id)
            except ValueError:
                content_index = -1
            finally:
                if content_index >= 0:
                    if get_key:
                        new_data[index]['content'][content_index][field_name] = api_name
                    else:
                        new_data[index]['content'][content_index][field_name] = response[api_name]["value"]
                return new_data

        # Extract all outcome titles for later use
        for api_name in response.keys():
            if "Outcome" in api_name and focus_area in api_name and "Outcomes" not in api_name:
                new_data.append({
                    'id': api_name[0:3],
                    'title': response[api_name]["name"],
                    'content': []
                })
        
        # Adds task objects to content array of outcome in new_data
        for api_name in response.keys():
            api_name_id = api_name[0:3]
            index = -1
            try:
                index = [ x['id'] for x in new_data ].index(api_name_id)
            except ValueError:
                index = -1
            finally:
                if "Youth" in api_name and index >= 0 and not "BOOL" in api_name:
                    words_in_api_name = api_name.split("_")
                    new_data[index]['content'].append({
                        'api_key': api_name,
                        'api_bool_key': "",
                        'id': words_in_api_name[len(words_in_api_name) - 3].lower(),
                        'key': response[api_name]["name"],
                        'ydmApproved': True, # Change later based on salesforce data
                        'checked': response[api_name]["value"],
                        'starIsFilled': False, # Change later based on salesforce data
                        'pod': pod
                    })
            
        # Updates values of starIsFilled/ydmApproved in content array
        for api_name in response.keys():
            api_name_id = api_name[0:3]
            index = -1
            try:
                index = [ x['id'] for x in new_data ].index(api_name_id)
            except ValueError:
                index = -1
            finally:
                if "YDM" in api_name and index >= 0:
                    new_data = find_and_update(new_data, api_name, index, "ydmApproved")
                if "BOOL" in api_name and index >= 0:
                    new_data = find_and_update(new_data, api_name, index, "starIsFilled")
                    new_data = find_and_update(new_data, api_name, index, "api_bool_key", get_key=True)

        return { 'response': new_data}

    return clean_response(response)

@app.route("/updateCheckbox", methods=['POST'])
@requires_auth(sf)
def updateSalesforce(user):
    # Extract user details from the user object
    user_id = user.get('id')

    # Extract current pod to update from JSON body data
    pod = request.json.get('pod')
    pod_map_name = pod + '_POD_Map__c'

    # Query for this user in Salesforce
    soql = "SELECT Contact__c FROM " + pod_map_name
    sf_result = sf.query(format_soql((soql + " WHERE (Contact__r.auth0_user_id__c={user_id})"), user_id=user_id))

    # Obtain pod ID
    tr_pod_id = sf_result['records'][0]['attributes']['url'].split('/')[-1]
    task_title = request.json.get('task_title')
    new_value = request.json.get('new_value')

    # Update value of specific task in Salesforce
    getattr(sf, pod_map_name).update(tr_pod_id, {task_title: new_value})
    return {}

@app.route("/updateStar", methods=['POST'])
@requires_auth(sf)
def updateStar(user):
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


@app.route("/getMainGoals")
@requires_auth(sf)
def getMainGoals(user):
    email = user.get('Email')
    firstname = user.get('FirstName')
    lastname = user.get('LastName')
    fullname = firstname + " " + lastname

    # Extract current pod to update from request arguments
    # pod = request.args.get('pod')
    pod_names = ['Trainee_POD_Map__c', 'Associate_POD_Map__c', 'Partner_POD_Map__c']
    # for pod_name in pod:

    # pod_map_name = pod + '_POD_Map__c'
    final_response = {}
    # Obtain all field names for the query
    for pod_map_name in pod_names:
        desc = getattr(sf, pod_map_name).describe()
        field_names_and_labels = [(field['name'], field['label']) for field in desc['fields']]
        field_names = [field['name'] for field in desc['fields']]

        # Query for all fields for this user
        soql = ("SELECT {} FROM " + pod_map_name).format(','.join(field_names))
        sf_result = sf.query(format_soql((soql + " WHERE (Contact__r.email = {email_value} AND Contact__r.name={full_name})"), email_value=email, full_name=fullname))

        # Format response
        pod_response = {}
        for name_and_label in field_names_and_labels:
            pod_response[name_and_label[0]] = {
                "name": name_and_label[1],
                "value": None
            }
        
        for name, value in sf_result["records"][0].items():
            if name in pod_response.keys():
                pod_response[name]["value"] = value

        final_response[pod_map_name.split("_")[0]] = pod_response

    return final_response

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
    auth0id = request.json.get('id')
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
    sf.Contact.update(response["records"][0]["Id"], {
        "Has_Youth_App_Account__c": True,
        "auth0_user_id__c": auth0id
    })

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
    result = sf.query(
        format_soql(
            "SELECT Id, Email FROM Contact WHERE (MTW_Role__c = 'MTW Young Adult' AND email = {email_value} AND name={full_name})", 
            email_value=email, 
            full_name=name))

    print(result["totalSize"] == 1)

    if (result["totalSize"] == 1):
        return {"verified": bool(1)} # true
	
	
    return {"verified": bool(0)} # false

@app.route("/calcProgressHomeScreen")
@requires_auth(sf)
def HomeScreenoutcomes(user):
    user_id = user.get('id')

    # Extract current pod to update from request arguments
    pod = request.args.get('pod')
    pod_map_name = pod + '_POD_Map__c'

    desc = getattr(sf, pod_map_name).describe()
    field_names_and_labels = [(field['name'], field['label']) for field in desc['fields']]
    filtered_field_names = [field for field in field_names_and_labels if "Completed__c" in field[0]]
    Pod_field_names = [field[0] for field in filtered_field_names]

    
    # salesforce query of each completed outcome # in trainee pod, based on the email and name
    query_from = "SELECT {} FROM " + pod_map_name
    soql = query_from.format(','.join(Pod_field_names))
    Pod_sf_result = sf.query(format_soql((soql + " WHERE Contact__r.auth0_user_id__c={user_id}"), user_id=user_id))

    # calculate Trainee total 
    Pod_total_count = 0; #create new value in sf_result dict that will store field's total outcomes 
    for field in Pod_field_names:
        field_type = field[3:6].upper()
        for name_and_label in field_names_and_labels:
            if "_Outcome_" + field_type in name_and_label[0]: 
                Pod_total_count += 1
    

    # transform into a python dictionary
    vars(Pod_sf_result)

    # calculate *Trainee* outcomes based on all related fields
    Pod_outcome_sum = 0
    for outcome in Pod_field_names:
        if Pod_sf_result['records']:
            Pod_outcome_sum += Pod_sf_result['records'][0][outcome]
        else:
            Pod_outcome_sum = 0

    pod_outcome = {
        'progress': Pod_outcome_sum,
        'total': Pod_total_count,
    }   

    return pod_outcome
    
@app.route("/calcProgressPodScreen")
@requires_auth(sf)
def podoutcomes(user):
    # parses arguments that user sent via query string
    user_id = user.get('id')

    # Trainee Pod
    # salesforce query for all the field names and labels in the trainee pod 
    desc = sf.Trainee_POD_Map__c.describe()
    field_names_and_labels = [(field['name'], field['label']) for field in desc['fields']]
        
    # filter to get only the trainee outcome field names 
    filtered_field_names = [field for field in field_names_and_labels if "Completed__c" in field[0]]
    Trainee_field_names = [field[0] for field in filtered_field_names]
    
    # salesforce query of each *completed* outcome # in trainee pod, based on the email and name
    soql = ("SELECT {} FROM " + pod_map_name).format(','.join(pod_field_names))
    sf_result = sf.query(format_soql((soql + " WHERE Contact__r.auth0_user_id__c={user_id}"), user_id=user_id))

    # organizing and putting data into dictionary outcome_dict
    outcome_dict = {}
    for field in Trainee_field_names:
        field_type = field[3:6].upper()
        outcome_dict[field_type] = {}
        
        # count the *completed* outcomes for each field:
        if sf_result['records']:
            outcome_dict[field_type]['completed_outcomes'] = sf_result['records'][0][field]
        else:
            outcome_dict[field_type]['completed_outcomes'] = 0
        
        # count the *total* outcomes for each field:
        outcome_dict[field_type]['total_outcomes'] = 0
        for name_and_label in field_names_and_labels:
            if "_Outcome_" + field_type in name_and_label[0]:
                outcome_dict[field_type]['total_outcomes'] += 1
            
            #putting in the name of each field into dictionary
            if field in name_and_label[0]:
                name = name_and_label[1].partition("Outcomes")[0]  #only grab part in label up to the word "Outcomes"
                outcome_dict[field_type]['name'] = name
    
    return outcome_dict

@app.route("/getValidPods")
@requires_auth(sf)
def findValid(user):
    user_id = user.get('id')
    pod_names = ['Trainee_POD_Map__c', 'Associate_POD_Map__c', 'Partner_POD_Map__c']
    total_dict = {}
    for pod_num, pod_map_name in enumerate(pod_names):
        desc = getattr(sf, pod_map_name).describe()
        field_names_and_labels = [(field['name'], field['label']) for field in desc['fields']]
        field_names = [field['name'] for field in desc['fields']]

        # Query for all fields for this user
        soql = ("SELECT {} FROM " + pod_map_name).format(','.join(field_names))
        sf_result = sf.query(format_soql((soql + " WHERE (Contact__r.auth0_user_id__c={user_id})"), user_id=user_id))
        if len(sf_result["records"]) == 0:
            total_dict[pod_map_name] = {'status': 'does not exist', 'completed': False}
            continue
        
        tot_outcomes = 0
        tot_completed = 0
        for field in field_names:
            if 'Outcome' in field:
                tot_outcomes += 1
        for name, value in sf_result["records"][0].items():
            if 'Outcome' in name and value == True:
                tot_completed += 1

        if pod_num == 0:
            status = 'allowed'
        else:
            while pod_num > 0:
                if total_dict[pod_names[pod_num - 1]]['completed'] == True:
                    pod_num -= 1
                    status = 'allowed'
                else:
                    status = 'no access'
                    break    
        total_dict[pod_map_name] = {'status': status, 'completed': True if tot_completed == tot_outcomes else False}
        
    return total_dict

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
