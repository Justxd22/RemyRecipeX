from flask import Blueprint, jsonify, request, session

auth_bp = Blueprint('auth', __name__)


@auth_bp.route("/logout", methods=["DELETE"])
def logout():
    """Logout route."""
    if 'email' not in session:
        return jsonify({"message": "Not logged in"}), 400

    email = session.pop('email', None)
    response = jsonify({"email": email, "message": "logged out"})
    return response

@auth_bp.route("/login", methods=["POST"])
def login():
    """Login route."""

    if 'email' in session:
        return jsonify({"message": "Already logged in"}), 200

    data = request.get_json(silent=True)
    if data is None:
        return jsonify({"message": "missing parameters"}), 400

    email = data.get("email")
    password = data.get("password")
    state, code = AUTH.valid_login(email, password)

    if not state:
        return jsonify({"message": "Not registered" if not code else "Incorrect password"}), 400

    session['email'] = email
    response = jsonify({"email": email, "message": "logged in"})
    return response


@auth_bp.route("/deregister", methods=["POST"])
def deluser():
    """Del user."""
    user = session.get('email', None)
    try:
        msg = AUTH.deregister_user(user)
        session.pop('email', None)
        return jsonify({"email": user, "message": msg})
    except ValueError as e:
        return jsonify({"message": str(e)}), 400


@auth_bp.route("/register", methods=["POST"])
def users():
    """New user."""

    if 'email' in session:
        return jsonify({"message": "Already logged in"}), 200
    data = request.get_json(silent=True)
    if data is None:
        return jsonify({"message": "missing parameters"}), 400

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    if not name or not email or not password:
        return jsonify({"message": "missing parameters"}), 400
    try:
        AUTH.register_user(email, name, password)
        return jsonify({"email": email, "message": "user created"})
    except ValueError as err:
        return jsonify({"message": str(err)}), 400
        
@auth_bp.route("/check-session", methods=["GET"])
def check_session():
    """Check session status."""
    if 'email' in session:
        return jsonify({"code": 1}), 200
    else:
        return jsonify({"code": 0}), 400

def init_auth_routes(auth):
    global AUTH
    AUTH = auth
