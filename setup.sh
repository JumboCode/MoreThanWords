#!/bin/sh
git update-index --assume-unchanged frontend/app.config.js

## Run below if you want to make global changes to app.config.js
# git update-index --no-assume-unchanged frontend/app.config.js
