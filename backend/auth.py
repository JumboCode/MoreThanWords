# auth.py
# Part of: MTW web project
# ref from 
# https://github.com/auth0-samples/auth0-python-api-samples/

from functools import wraps
import json
from os import environ as env
from six.moves.urllib.request import urlopen

from dotenv import load_dotenv, find_dotenv
from flask import Flask, request, _request_ctx_stack
from flask_cors import cross_origin
from jose import jwt

from simple_salesforce import format_soql

import requests

# load the environment variables.
from dotenv import load_dotenv
ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)

# Put Those things into variable.
AUTH0_DOMAIN = env.get("AUTH0_DOMAIN")
API_IDENTIFIER = env.get("API_IDENTIFIER")
ALGORITHMS = ["RS256"]

AUTH_HEADER_PREFIX = "bearer"

# Format error response and append status code.
class AuthError(Exception):
    def __init__(self, error, status_code):
        self.error = error
        self.status_code = status_code


def get_user_info(sf, email):
    """
    given an email, retrieves the user info.
    """
    result = sf.query(format_soql(
        "SELECT Email,FirstName,LastName FROM Contact WHERE (MTW_Role__c = 'MTW Young Adult' AND email = {email_value})",
        email_value=email))
    
    if (result["totalSize"] == 1 and result["records"]):
        print(result)
        user_info = result["records"][0]
        return user_info
    else:
        # if the salesforce request did not return any matching user
        raise AuthError({"code": "not_found_in_salesforce",
                        "description":
                            "The current user is not found in the MoreThanWords Database."}, 
                            401)


def get_token_auth_header():
    """Obtains the access token from the Authorization Header
    """
    auth = request.headers.get("Authorization", None)
    if not auth:
        raise AuthError({"code": "authorization_header_missing",
                        "description":
                            "Authorization header is expected"}, 401)

    parts = auth.split()

    if parts[0].lower() != AUTH_HEADER_PREFIX:
        raise AuthError({"code": "invalid_header",
                        "description":
                            "Authorization header must start with "
                            + AUTH_HEADER_PREFIX}, 401)
    elif len(parts) == 1:
        raise AuthError({"code": "invalid_header",
                        "description": "Token not found"}, 401)
    elif len(parts) > 2:
        raise AuthError({"code": "invalid_header",
                        "description":
                            "Authorization header must be " +
                            AUTH_HEADER_PREFIX + " token"}, 401)

    token = parts[1]
    return token


def requires_scope(required_scope):
    """Determines if the required scope is present in the access token
    Args:
        required_scope (str): The scope required to access the resource
    """
    token = get_token_auth_header()
    unverified_claims = jwt.get_unverified_claims(token)
    if unverified_claims.get("scope"):
        token_scopes = unverified_claims["scope"].split()
        for token_scope in token_scopes:
            if token_scope == required_scope:
                return True
    return False

def requires_auth(sf):
    def requires_auth_withfunc(f):
        """
        Determines if the access token is valid and sets a user object
        based on the AUTH0 account.
        """
        @wraps(f)
        def decorated(*args, **kwargs):
            token = get_token_auth_header()
            # request user info from auth0
            headers = {'Authorization': "Bearer " + token}
            r = requests.get(url = AUTH0_DOMAIN + "/userinfo", headers=headers)
            
            if r.status_code != 200:
                raise AuthError({"code": "invalid_token",
                    "description": "Your Authorization code is invalid"}, 401)
            
            auth_info = r.json()

            # assuming that email is in the 'name' field, due to 
            # how auth0 handles signup.
            user_info = get_user_info(sf, auth_info['name'])

            return f(user=user_info, *args, **kwargs)
        return decorated
    return requires_auth_withfunc
