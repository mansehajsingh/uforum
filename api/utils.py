import json
import bcrypt
from datetime import datetime

# converts a byte payload for post requests into json
def parse_json(payload):
    return json.loads(payload)

def hash_password(password):
    hashed_password = bcrypt.hashpw(bytes(password, "utf-8"), bcrypt.gensalt())
    return hashed_password.decode()

def compare_password(password, hashed_password):
    return bcrypt.checkpw(bytes(password, "utf-8"), bytes(hashed_password, "utf-8"))

def string_to_date(date_string):
    return datetime.strptime(date_string,"%Y-%m-%dT%H:%M:%SZ")