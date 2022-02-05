DEFAULT_REQUEST_FORMAT = "json"

# Dictionary of all api url endpoints, with a description, and the accepted method(s)
API_ROUTES = {
    "/api": {
        "description": "Base api endpoint. Returns all routes, with a description of each coupled with the method(s) they use.",
        "methods": ["GET"],
        "requires_auth": False
    },

    "/api/create-user": {
        "description": "Creates a new user with a username, hashed password, and full name. Username must be between 4-20 characters inclusive. Full name must be under 100 characters. Password must be between 4-30 characters inclusive.",
        "methods": ["POST"],
        "requires_auth": False,
        "body_fields": ["username", "password", "full_name"]
    },

    "/api/login": {
        "description": "Creates a new session instance and returns session details to be stored in a cookie.",
        "methods": ["POST"],
        "requires_auth": False,
        "body_fields": ["username", "password"]
    },

    "/api/logout": {
        "description": "Deletes session record inside of the database.",
        "methods": ["POST"],
        "requires_auth": False,
        "body_fields": ["username", "password", "full_name"]
    }

}

