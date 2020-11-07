from flask import Flask
from flask_cors import CORS
import os
from simple_salesforce import Salesforce, format_soql


sf = Salesforce(username=os.environ['titapapunne@gmail.com'],password=os.environ['6Tj4DlqskZSb'],security_token=os.environ['ZXNQA0bvcVWJ0eiulugR9gBej'])

app = Flask(__name__)
CORS(app)

@app.route("/")
def helloWorld():
    d = dict();
    d['data'] = 'hello world!!!! pls work!!'
    d['status'] = 'good'
    return d

@app.route("/youthCheckbox")
def youthCheck():
    

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
