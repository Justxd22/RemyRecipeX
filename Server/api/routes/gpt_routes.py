"""This to implement gpt routes"""
from flask import Blueprint, jsonify, request, session
# import openai stuff
gpt_bp = Blueprint('gpt', __name__)

@gpt_bp.route("/model", methods=["GET"])
def model():
    """Retrieve model info."""
    if 'email' not in session:
        return jsonify({"message": "Not logged in"}), 400

    return jsonify("3.5"), 200
    email = session.get('email')
    user_info = USER.get_info(email)
    return jsonify(user_info), 200
