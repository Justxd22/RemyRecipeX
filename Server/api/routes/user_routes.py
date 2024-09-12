"""This to implement user routes"""
from flask import Blueprint, jsonify, request, session

user_bp = Blueprint('user', __name__)

@user_bp.route("/profile", methods=["GET"])
def get_user_info():
    """Retrieve user info."""
    if 'email' not in session:
        return jsonify({"message": "Not logged in"}), 400

    email = session.get('email')
    user_info = USER.get_info(email)
    return jsonify(user_info), 200

@user_bp.route("/profile", methods=["PUT"])
def update_user_info():
    """Update user info."""
    if 'email' not in session:
        return jsonify({"message": "Not logged in"}), 400

    data = request.get_json(silent=True)
    if not data:
        return jsonify({"message": "missing parameters"}), 400

    email = session.get('email')
    new_name = data.get("new_name", None)
    new_email = data.get("new_email", None)
    errors = list()

    if new_name:
        try:
            new_name = USER.update_name(email, new_name)
        except ValueError as e:
            errors.append(str(e))

    if new_email:
        try:
            new_email = USER.update_email(email, new_email)
            session['email'] = new_email
        except ValueError as e:
            errors.append(str(e))

    if errors:
        return jsonify({"message": errors}), 400

    return jsonify({"message": "user info updated"}), 200

@user_bp.route("/update_password", methods=["POST"])
def update_password():
    """Update password."""
    if 'email' not in session:
        return jsonify({"message": "Not logged in"}), 400

    data = request.get_json(silent=True)
    if data is None:
        return jsonify({"message": "missing parameters"}), 400

    email = session.get('email')
    old_password = data.get("old_password")
    new_password = data.get("new_password")

    try:
        USER.update_password(email, old_password, new_password)
        return jsonify({"message": "password updated"})
    except ValueError as e:
        return jsonify({"message": str(e)}), 400


def init_user_routes(user):
    global USER
    USER = user
