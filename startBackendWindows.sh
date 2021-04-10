#!/bin/sh
cd backend
py -m venv backendEnv
source backendEnv/scripts/activate
pip install -r requirements.txt
# eval $(egrep -v '^#' ../.env | xargs) py app.py 
py ~/OneDrive/Documents/Ryan/School/"College 2nd Year"/JumboCode/MoreThanWords/MoreThanWords/backend/app.py