"""This to implement gpt routes"""
from flask import Blueprint, jsonify, request, session
from .gemi import GEmeni

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

    ans = gem.ask(ingred)
    print(ans, type(ans))
    return jsonify(str(ans)), 200


def init_gpt_routes(gem_key):
    global gem
    gem = GEmeni(gem_key)
