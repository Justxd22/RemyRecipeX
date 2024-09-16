"""
auth.py

This module defines the Auth class, which provides methods for user authentication and management in a MongoDB database.
"""

import bcrypt
from datetime import datetime
import regex as re

class Auth:
    """
    A class used to represent authentication operations.

    Attributes:
        db (Database): The MongoDB database instance.
        users (Collection): The MongoDB collection for users.
        email_regex (Pattern): Precompiled regex pattern for validating email addresses.
    """

    def __init__(self, db):
        """
        Initializes an Auth instance.

        Args:
            db (Database): The MongoDB database instance.
        """
        self.db = db
        if not 'users' in db.list_collection_names():
            c = db['users']
            c.insert_one({
                'name': 'admin',
                'email': 'admin@com',
                'password': self.hash_password('admin123'),
                'created_at': datetime.utcnow(),
                })
        self.users = self.db['users']

        # Precompile regex patterns using the regex library
        self.email_regex = re.compile(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
        # self.username_regex = re.compile(r"^[a-zA-Z0-9_-]{3,20}$")


    def register_user(self, email: str, name: str, password: str):
        """
        Registers a new user.

        Args:
            email (str): The email of the user to be registered.
            name (str): The name of the user to be registered.
            password (str): The password of the user to be registered.

        Raises:
            ValueError: If the email is invalid or already exists.

        Returns:
            InsertOneResult: The result of the insert operation.
        """
        # Check if email is valid
        if not self.email_regex.match(email):
            raise ValueError("Invalid email address.")

        # Check if email and username already exist
        e = self.users.find_one({ 'email': email })
        if e:
            raise ValueError(f"User {email} already exists")

        data = {
            'name': name,
            'email': email,
            'password': self.hash_password(password),
            'created_at': datetime.utcnow(),
        }
        user = self.users.insert_one(data)
        return user


    def deregister_user(self, email: str):
        """
        Deregisters a user.

        Args:
            email (str): The email of the user to be deregistered.

        Raises:
            ValueError: If the user could not be deregistered.

        Returns:
            str: A message indicating the result of the deregistration.
        """
        result = self.users.delete_one({'email': email})
        if result.deleted_count == 1:
            return f"User {email} has been deregistered successfully."
        else:
            raise ValueError(f"Failed to deregister user {email}.")


    def valid_login(self, email: str, password: str) -> bool:
        """
        Validates user login credentials.

        Args:
            email (str): The email of the user attempting to log in.
            password (str): The password of the user attempting to log in.

        Returns:
            tuple: A tuple containing a boolean indicating if the login is valid and an integer status code.
        """
        u = self.users.find_one({ 'email': email })
        if not u:
            return (False, 0)
        try:
            if not bcrypt.checkpw(password.encode('utf-8'), u.get('password').encode('utf-8')):
                return (False, 1)
        except Exception:
            return (False, 1)
        return (True, 0)

    @staticmethod
    def hash_password(password: str):
        """
        Hashes a password using bcrypt.

        Args:
            password (str): The password to be hashed.

        Returns:
            str: The hashed password.
        """
        return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
