from flask import Flask
from flask_cors import CORS
import os # for environment variables
from flask import request # imported for parsing arguemnts
from simple_salesforce import Salesforce, format_soql # import Salesforce

# global connection to Salesforce so we don't need to connect everytime, CHANGE TO ENV VARIABLE OR take  
sf = Salesforce(username=os.environ['SALESFORCE_USERNAME'],password=os.environ['SALESFORCE_PASSWORD'],security_token=os.environ['SALESFORCE_SECURITY_TOKEN'])
app = Flask(__name__)
CORS(app)

# route to verify sign up and check whether user who wants to register is 
# allowed to use the app by checking salesforce database
@app.route("/verifySignUp")
def verify():
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


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
