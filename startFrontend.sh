#!/bin/bash
cd frontend
yarn add expo
eval $(egrep -v '^#' ../.env | xargs) yarn start