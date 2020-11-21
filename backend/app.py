from flask import Flask
from flask_cors import CORS
import os
from simple_salesforce import Salesforce, format_soql

sf = Salesforce(username=os.environ['SALESFORCE_USERNAME'],password=os.environ['SALESFORCE_PASSWORD'],security_token=os.environ['SALESFORCE_SECURITY_TOKEN'])

app = Flask(__name__)
CORS(app)

@app.route("/")
def helloWorld():
    Id = "0030d00002VUcwSAAT"
    desc = sf.Trainee_POD_Map__c.describe()
    field_names = [field['name'] for field in desc['fields']]
    soql = "SELECT {} FROM Trainee_POD_Map__c".format(','.join(field_names))
    result = sf.query(format_soql((soql + " WHERE Contact__c={youth_id}"), youth_id=Id))
    return desc

@app.route("/youthCheckbox")
def youthCheck():
    # Id = "0030d00002VUcwSAAT"
    # desc = sf.Trainee_POD_Map__c.describe()
    # field_names = [field['name'] for field in desc['fields']]
    # soql = "SELECT {} FROM Trainee_POD_Map__c".format(','.join(field_names))
    # result = sf.query(format_soql((soql + " WHERE Contact__c={youth_id}"), youth_id=Id))
    # return result

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
