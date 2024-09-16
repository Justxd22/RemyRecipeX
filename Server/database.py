"""
database.py

This module provides functionality to initialize a connection to a MongoDB database using the pymongo library.
"""

from pymongo import MongoClient

def init_db(app):
    """
    Initializes the MongoDB database connection using the provided Flask app configuration.

    Args:
        app (Flask): The Flask application instance containing the configuration.

    Returns:
        Database: The initialized MongoDB database instance.

    Example:
        app.config['MONGO_URI'] = 'mongodb://localhost:27017/myDatabase'
        app.config['MONGO_DATABASE'] = 'myDatabase'
        db = init_db(app)
    """
    client = MongoClient(app.config['MONGO_URI'])
    db = client[app.config['MONGO_DATABASE']]

    print("Database initialized successfully")

    return db