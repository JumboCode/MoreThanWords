###############################################################################
# auth.py
# Part of: MTW web project
# ref from
# https://github.com/auth0-samples/auth0-python-api-samples/
#
# The main function of this file is requires_auth.
#
# It first gets the auth token by calling get_token_auth_header.
# Then it moves to decode_and_verify_payload, which verifies the auth header.
# Then it parses the sub field to get the auth0 user id.
###############################################################################
from functools import wraps
import json
from datetime import datetime, timedelta
from os import environ as env

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

# auth0 keys caching
auth0_key_expire = None
auth0_jwk = {}

def get_auth0_jwk():
    """
    gets the auth0 token and caches it.
    refreshes the auth0 token if needed (refreshes every two weeks).
    """
    global auth0_key_expire
    global auth0_jwk
    if auth0_key_expire is None or auth0_key_expire < datetime.now():
        request = requests.get(AUTH0_DOMAIN+"/.well-known/jwks.json")
        auth0_jwk = request.json()
        auth0_key_expire = datetime.now() + timedelta(weeks=2)
    return auth0_jwk


# Format error response and append status code.
class AuthError(Exception):
    def __init__(self, error, status_code):
        self.error = error
        self.status_code = status_code


def decode_and_verify_payload(jwt_token):
    """
    decodes the token and verifies if it's issued by auth0.
    if it's valid, the payload will be returned.
    otherwise, an AuthError will be raised.
    """
    
    jwks = get_auth0_jwk()
    try:
        unverified_header = jwt.get_unverified_header(jwt_token)
    except jwt.JWTError:
        raise AuthError({"code": "invalid_header",
                        "description":
                            "Invalid header. "
                            "Use an RS256 signed JWT Access Token"}, 401)
    if unverified_header["alg"] == "HS256":
        raise AuthError({"code": "invalid_header",
                        "description":
                            "Invalid header. "
                            "Use an RS256 signed JWT Access Token"}, 401)
    rsa_key = {}
    for key in jwks["keys"]:
        if key["kid"] == unverified_header["kid"]:
            rsa_key = {
                "kty": key["kty"],
                "kid": key["kid"],
                "use": key["use"],
                "n": key["n"],
                "e": key["e"]
            }
    if rsa_key:
        try:
            payload = jwt.decode(
                jwt_token,
                rsa_key,
                algorithms=ALGORITHMS,
                audience=API_IDENTIFIER,
                issuer=AUTH0_DOMAIN+"/"
            )
        except jwt.ExpiredSignatureError:
            raise AuthError({"code": "token_expired",
                            "description": "token is expired"}, 401)
        except jwt.JWTClaimsError as e:
            print(e)
            raise AuthError({"code": "invalid_claims",
                            "description":
                                "incorrect claims,"
                                " please check the audience and issuer"}, 401)
        except Exception:
            raise AuthError({"code": "invalid_header",
                            "description":
                                "Unable to parse authentication"
                                " token."}, 401)
    return payload


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


def requires_auth(sf):
    def requires_auth_withfunc(f):
        """
        Determines if the access token is valid and sets a user object
        based on the AUTH0 account.
        """
        @wraps(f)
        def decorated(*args, **kwargs):
            token = get_token_auth_header()
            auth_info = decode_and_verify_payload(token)

            # uses the auth0 id to identify users
            user_info = {
                "id": auth_info["sub"]
            }

            return f(user=user_info, *args, **kwargs)
        return decorated
    return requires_auth_withfunc
