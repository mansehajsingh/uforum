import json
import bcrypt

# converts a byte payload for post requests into json
def parse_json(payload):
    return json.loads(payload)

def hash_password(password):
    hashed_password = bcrypt.hashpw(bytes(password, "utf-8"), bcrypt.gensalt())
    return hashed_password.decode()