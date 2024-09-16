"""
user_routes.py

This module implements the user-related routes for a Flask web application. It provides endpoints for retrieving,
updating user information, and updating user passwords.

Routes:
    /profile (GET): Retrieve user information.
    /profile (PUT): Update user information.
    /update_password (POST): Update user password.

Functions:
    get_user_info(): Retrieves the information of the logged-in user.
    update_user_info(): Updates the information of the logged-in user.
    update_password(): Updates the password of the logged-in user.
    init_user_routes(user): Initializes the user routes with the given user object.
"""

from flask import Blueprint, jsonify, request, session

# Define the Blueprint for user-related routes
user_bp = Blueprint('user', __name__)

@user_bp.route("/profile", methods=["GET"])
def get_user_info():
    """
    Retrieve user info.

    This route retrieves the information of the logged-in user. If the user is not logged in,
    it returns a 400 status code with an appropriate message.

    Returns:
        Response: JSON response containing user information or an error message.
    """
    if 'email' not in session:
        return jsonify({"message": "Not logged in"}), 400

    email = session.get('email')
    user_info = USER.get_info(email)
    return jsonify(user_info), 200

@user_bp.route("/profile", methods=["PUT"])
def update_user_info():
    """
    Update user info.

    This route updates the information of the logged-in user. If the user is not logged in,
    it returns a 400 status code with an appropriate message. It can update the user's name and email.

    Returns:
        Response: JSON response indicating the result of the update operation.
    """
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
    """
    Update password.

    This route updates the password of the logged-in user. If the user is not logged in,
    it returns a 400 status code with an appropriate message.

    Returns:
        Response: JSON response indicating the result of the password update operation.
    """
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
    """
    Initializes the user routes with the given user object.

    Args:
        user (User): The user object to be used for user-related operations.
    """
    global USER
    USER = user
