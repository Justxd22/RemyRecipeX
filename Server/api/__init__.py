from .routes.auth_routes import auth_bp
from .routes.user_routes import user_bp
from .routes.gpt_routes import gpt_bp
from .routes.movie_routes import movie

def init_api(auth, user, gpt, movie_key):
    from .routes.auth_routes import init_auth_routes
    from .routes.user_routes import init_user_routes
    from .routes.gpt_routes import init_gpt_routes
    from .routes.movie_routes import init_movie_routes

    init_auth_routes(auth)
    init_user_routes(user)
    init_gpt_routes(gpt)
    init_movie_routes(movie_key)
