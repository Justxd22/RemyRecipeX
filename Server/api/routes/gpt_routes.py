"""This to implement gpt routes"""
from flask import Blueprint, jsonify, request, session
from .gemi import GEmeni

# Initialize a Flask blueprint for GPT-related routes
gpt_bp = Blueprint('gpt', __name__)

@gpt_bp.route("/model", methods=["GET"])
def model():
    """
    Retrieve the model information.

    This endpoint returns basic information about the model version.
    It checks if the user is logged in before returning the model info.
    
    Returns:
        - JSON response with model version if logged in.
        - 400 error if the user is not authenticated.
    """
    if 'email' not in session:
        return jsonify({"message": "Not logged in"}), 400

    return jsonify("3.5"), 200
    email = session.get('email')
    user_info = USER.get_info(email)
    return jsonify(user_info), 200

# chat_session.send_message("tomato, rice, green salad, cheese, cooked chicken, corn")


@gpt_bp.route("/ask", methods=["POST"])
def ask():
    """Retrieve receipi info."""
    if 'email' not in session:
        return jsonify({"message": "Not logged in"}), 400
    data = request.get_json(silent=True)
    if data is None:
        return jsonify({"message": "missing parameters"}), 400
    ingred = data.get("input")
    if not ingred:
        return jsonify({"message": "missing parameters"}), 400

    ans, code = gem.ask(ingred, qtype=1)
    if code != 200:
        return jsonify({"message": ans}), 500 
    print(ans, type(ans))
    return jsonify(ans), 200

@gpt_bp.route("/recipe", methods=["POST"])
def recipe():
    """Retrieve receipi info."""
    if 'email' not in session:
        return jsonify({"message": "Not logged in"}), 400
    data = request.get_json(silent=True)
    if data is None:
        return jsonify({"message": "missing parameters"}), 400
    ingred = data.get("input")
    if not ingred:
        return jsonify({"message": "missing parameters"}), 400

    ans, code = gem.ask(ingred, qtype=2)
    if code != 200:
        return jsonify({"message": ans}), 500 
    print(ans, type(ans))
    return jsonify(ans), 200

def init_gpt_routes(gem_key):
    global gem
    gem = GEmeni(gem_key)
