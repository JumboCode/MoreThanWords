#!/bin/sh
cd backend
py -m venv backendEnv
source backendEnv/scripts/activate
# export SALESFORCE_USERNAME="titapapunne@gmail.com" && export SALESFORCE_PASSWORD="6Tj4DlqskZSb" && export SALESFORCE_SECURITY_TOKEN="ZXNQA0bvcVWJ0eiulugR9gBej"
pip install -r requirements.txt
eval $(egrep -v '^#' ../.env | xargs) py app.py