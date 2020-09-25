#!/bin/sh
cd backend
python3 -m venv backendEnv
source backendEnv/bin/activate
pip install -r requirements.txt
cd -
cd backend
eval $(egrep -v '^#' ../.env | xargs) python3 app.py
