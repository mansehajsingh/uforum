DEFAULT_REQUEST_FORMAT = "json"

# Dictionary of all api url endpoints, with a description, and the accepted method(s)
API_ROUTES = {
    "/api": {
        "description": "Base api endpoint. Returns all routes, with a description of each coupled with the method(s) they use.",
        "methods": ["GET"],
        "requires_auth": False
    }
}

