from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def helloWorld():
    d = dict();
    d['data'] = 'hello world!!!! pls work!!'
    d['status'] = 'good'
    return d

if __name__ == '__main__':
    app.run(debug=True)
