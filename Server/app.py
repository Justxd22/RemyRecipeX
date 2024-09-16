# #!/usr/bin/python3

from flask import Flask
from flask_cors import CORS
from flask_session import Session
from datetime import timedelta
from middleware import auth_middleware

# Import your modules
from models.auth import Auth
from models.user import User

def create_app():
    # Import your modules
    from api import auth_bp, user_bp, init_api, gpt_bp
    from errors import error
    from database import init_db
    from config import get_config
    from web_dynamic import web_bp

    app = Flask(__name__)
    app.secret_key = app.config['SECRET_KEY']


    app.config.from_object(get_config())
    print(" d " +  app.config['GEMINI_API_KEY'] + " ddd")

    app.config.update(
        SESSION_COOKIE_SECURE=False,  # Ensure cookies are only sent over HTTPS
        SESSION_COOKIE_HTTPONLY=True,  # Prevent JavaScript access to session cookie
        SESSION_COOKIE_SAMESITE=app.config["SAMESITE_POLICY"],  # Restrict cookie sending for cross-site requests
        # SESSION_COOKIE_SAMESITE='Lax',  # Restrict cookie sending for cross-site requests
        PERMANENT_SESSION_LIFETIME=timedelta(minutes=90),  # Set session lifetime
    )

    CORS(
        app,
        resources={
            r"/*":
                {
                    "origins": app.config["CORS_CONFIG"]["CORS_ORIGINS"],
                    "methods": app.config["CORS_CONFIG"]["CORS_METHODS"],
                    "supports_credentials": True
                    }
                },
        supports_credentials=app.config["CORS_SUPPORTS_CREDENTIALS"].lower() == 'true',
        )
 # Allow all origins and all methods
    # CORS(
    #     app,
    #     resources={r"/*": {"origins": "*", "methods": "*"}},
    #     supports_credentials=app.config["CORS_SUPPORTS_CREDENTIALS"].lower() == 'true',
    # )
    # CORS(app, supports_credentials=True, origins="http://127.0.0.1:5173")
    app.config['SESSION_TYPE'] = 'filesystem'
    Session(app)

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(user_bp, url_prefix='/api/user')
    app.register_blueprint(gpt_bp, url_prefix='/api/gpt')
    app.register_blueprint(error)
    app.register_blueprint(web_bp)

    # Initialize the database
    db = init_db(app)

    # Make db available to the app
    app.db = db

    # Initialize API
    auth = Auth(app.db)
    user = User(app.db)
    init_api(auth, user, app.config['GEMINI_API_KEY'])

    # Apply middleware
    auth_middleware(app)

    return app

app = create_app()

@app.route('/')
def main_route():
    return "hello friend!"

if __name__ == '__main__':
    app.run(
        host=app.config['HOST_NAME'],
        port=app.config['APP_PORT'],
        debug=app.config['DEBUG'].lower() == 'true',
        )
