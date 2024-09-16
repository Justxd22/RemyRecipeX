"""
template_renderer.py

This module defines a Flask Blueprint for serving static files and handling basic routes for a web application.
"""

from flask import Blueprint, send_from_directory, redirect, url_for, session, jsonify
import os

# Define the Blueprint for the web application
web_bp = Blueprint('web_dynamic', __name__, static_folder='../static')


@web_bp.route('/login')
def login():
    """
    Route for the login page.

    If the user is already logged in (i.e., 'username' is in session), they are redirected to the home page.
    Otherwise, the login page is served.

    Returns:
        Response: Redirect to home page or the login page.
    """
    if 'username' in session:
        return redirect(url_for('web_dynamic.serve', path='/'))
    return send_from_directory(web_bp.static_folder, 'index.html')

@web_bp.route('/register')
def register():
    """
    Route for the registration page.

    If the user is already logged in (i.e., 'username' is in session), they are redirected to the home page.
    Otherwise, the registration page is served.

    Returns:
        Response: Redirect to home page or the registration page.
    """
    if 'username' in session:
        return redirect(url_for('web_dynamic.serve', path='/'))
    return send_from_directory(web_bp.static_folder, 'index.html')

@web_bp.route('/status')
def status():
    """
    Route for checking the status of the application.

    Returns a JSON response with a status message.

    Returns:
        Response: JSON response with status information.
    """
    data = { "status": "ok", "msg": "Hello Human!"}
    return jsonify(data)

@web_bp.route('/')
def home():
    """
    Route for the home page.

    Serves the index.html file from the static folder.

    Returns:
        Response: The home page.
    """
    return send_from_directory(web_bp.static_folder, 'index.html')

@web_bp.route('/<path:path>')
def serve(path):
    """
    Route for serving static files.

    If the requested file exists in the static folder, it is served.
    Otherwise, the index.html file is served.

    Args:
        path (str): The path to the requested file.

    Returns:
        Response: The requested file or the index.html file.
    """
    if path != "" and os.path.exists(web_bp.static_folder + '/' + path):
        return send_from_directory(web_bp.static_folder, path)
    else:
        return send_from_directory(web_bp.static_folder, 'index.html')
