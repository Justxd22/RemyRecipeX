import os
from dotenv import load_dotenv

load_dotenv()
class BaseConfig:
    HOST_NAME = os.getenv("HOST_NAME", 'localhost')
    APP_PORT = os.getenv("APP_PORT", 5000)

    MONGO_DATABASE = os.getenv("MONGO_DATABASE", 'mongodb://localhost:27017')
    MONGO_URI = os.getenv("MONGO_URI", 'mongodb://localhost:27017')

    CORS_SUPPORTS_CREDENTIALS = os.getenv("CORS_SUPPORTS_CREDENTIALS", 'false')
    SAMESITE_POLICY = os.getenv("SESSION_COOKIE_SAMESITE", 'Lax')

    DEBUG = os.getenv("DEBUG", True)
    SECRET_KEY = os.getenv("SECRET_KEY", "FLASK-RemyRecipeX-APP")
    CORS_CONFIG = {
        'CORS_ORIGINS' : os.getenv("CORS_ORIGINS", '*').split(','),
        'CORS_METHODS': ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'TRACE']
    }

