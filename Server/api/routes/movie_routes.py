"""This to implement movie routes"""
from flask import Blueprint, jsonify, request, session

movie = Blueprint('movie', __name__)
movie_url = "https://api.themoviedb.org/3/discover/movie?api_key="
query = ['cooking', 'food', 'chef', 'restaurant', 'baking', 'kitchen', 'culinary', 'recipe', 'cuisine', 'meal', 'food truck', 'barbecue', 'fine dining', 'cooking competition'];

movie.route("/ask", methods=["GET"])
def ask():
    """MOVIEDB api"""
    if 'email' not in session:
        return jsonify({"message": "Not logged in"}), 400
    data = request.get_json(silent=True)
    if data is None:
        return jsonify({"message": "missing parameters"}), 400


    ans, code = gem.ask(ingred, qtype=1)
    if code != 200:
        return jsonify({"message": ans}), 500 
    print(ans, type(ans))
    return jsonify(ans), 200

def init_movie_routes(key):
    global movie_url
    movie_url = movie_url + key