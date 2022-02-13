from rest_framework.response import Response
from rest_framework import status

from functools import wraps
import uuid
from .models import *
from .utils import compare_password, parse_json, string_to_date
from .serializers import SessionSerializer, UserSerializer
from datetime import timedelta, datetime, timezone

# decorator which authenticates the current user session
def require_auth(f):

    @wraps(f)
    def wrapper(*args, **kwargs):
        
        try:
            session = parse_json(args[0].body)["session"]
        except:
            Response(status=status.HTTP_400_BAD_REQUEST) # if no session object exists in the request body
        
        if "username" in session and "session_id" in session:
            if lookup_session(session["username"], session["session_id"]) == True: # session creds are valid
                return f(*args, **kwargs)
            else:
                return Response(status=status.HTTP_401_UNAUTHORIZED) # session creds are invalid
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST) # required fields did not exist

    return wrapper

# verifies that the login details are valid
def is_valid_login(username: str, password: str) -> bool:
    query_set = User.objects.filter(username=username)

    if query_set.exists():
        user = UserSerializer(query_set.first()).data

        return compare_password(password, user["password"])          

    else:
        return False

# search the database for the existence of the session
def lookup_session(username: str, session_id: str) -> bool:
        query_set = Session.objects.filter(username=username, session_id=session_id)
        if query_set.exists():
            session = SessionSerializer(query_set.first()).data

            if (
                session["username"] == username and 
                session["session_id"] == session_id and 
                string_to_date(session["expiry_date"]) > datetime.now(timezone.utc)  # if it is not expired
            ):
                return True

        return False

# create the session for the user and return details to be put in the response
def create_session(username: str) -> dict:

    delete_session(username=username)

    session_details = {
        "session": {
                        "username": username,
                        "session_id": uuid.uuid4().hex,
                        "expiry_date": (datetime.now(timezone.utc) + timedelta(days=15))
        }
    }

    session = Session(
                username=User.objects.get(username=username), 
                session_id=session_details["session"]["session_id"], 
                expiry_date=session_details["session"]["expiry_date"]
            )
    
    session.save()

    return session_details

# delete existing user session
def delete_session(username: str) -> None:
    Session.objects.filter(username=username).delete()