from flask import Flask
from flask_cors import CORS
import os
from simple_salesforce import Salesforce, format_soql


sf = Salesforce(username='titapapunne@gmail.com',password='6Tj4DlqskZSb',security_token='ZXNQA0bvcVWJ0eiulugR9gBej')

app = Flask(__name__)
CORS(app)

@app.route("/")
def helloWorld():
    Id = "0030d00002VUcwSAAT"
    desc = sf.Trainee_POD_Map__c.describe()
    field_names = [field['name'] for field in desc['fields']]
    soql = "SELECT {} FROM Trainee_POD_Map__c".format(','.join(field_names))
    result = sf.query(format_soql((soql + " WHERE Contact__c={youth_id}"), youth_id=Id))
    return result

# @app.route("/youthCheckbox")
# def youthCheck():
#     result = sf.query(format_soql("SELECT TR_Attendance__c FROM Trainee_POD_Map__c WHERE Contact__c={name_id}"), name_id=result.Id)
#     return result

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
