from flask import Flask
from flask_cors import CORS
from flask import request

from simple_salesforce import Salesforce, format_soql

import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
CORS(app)

sf = Salesforce(username=os.getenv('SALESFORCE_USERNAME'),
    password=os.getenv('SALESFORCE_PASSWORD'), 
    security_token=os.getenv('SALESFORCE_SECURITY_TOKEN'))

@app.route("/")
def helloWorld():
    d = dict();
    d['data'] = 'hello world!!!! pls work!!'
    d['status'] = 'good'
    return d


@app.route("/reset", methods=['POST'])
def resetPassword():
    """
    checks if the user is in the mtw salesforce database, 
    before sending verification email.
    """
    req_data = request.json
    if 'email' not in req_data:
        return {'data': 'no email present in the data',
            'status': 'bad'}
    
    email = req_data['email']

    print(email)

    soql_str = """
    SELECT count() FROM Contact WHERE MTW_Role__c = 'MTW Young Adult' AND Email = {email_value}
    """
    query_soql = format_soql(soql_str, email_value=email)
    result = sf.query(query_soql)

    print(result["totalSize"] >= 1)

    # look up if email exists
    if result["totalSize"] >= 1:
        return {'data': 'Your verification email has been successly sent',
                'status': 'good'}
    else:
        return {'data': 'Your Email is not registered in our databased.',
                'status': 'bad'}, 403


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
