"""
user.py

This module defines the User class, which provides methods for managing user information in a MongoDB database.
"""

import regex as re
import bcrypt
from models.auth import Auth

class User:
    """
    A class used to represent a User and manage user-related operations.

    Attributes:
        db (Database): The MongoDB database instance.
        users (Collection): The MongoDB collection for users.
        email_regex (Pattern): Precompiled regex pattern for validating email addresses.
    """

    def __init__(self, db):
        """
        Initializes a User instance.

        Args:
            db (Database): The MongoDB database instance.
        """
        self.db = db
        self.users = self.db['users']

        # Precompile regex patterns using the regex library
        self.email_regex = re.compile(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
        # self.username_regex = re.compile(r"^[a-zA-Z0-9_-]{3,20}$")

    def update_name(self, email, new_name):
        """
        Updates the name of a user.

        Args:
            email (str): The email of the user whose name is to be updated.
            new_name (str): The new name to be set.

        Returns:
            str: The new name of the user.
        """
        self.users.update_one({'email': email}, {'$set': {'name': new_name}})

        # Return the new name and a boolean value indicating success to update the session state
        return new_name

    def update_email(self, email, new_email):
        """
        Updates the email of a user.

        Args:
            email (str): The current email of the user.
            new_email (str): The new email to be set.

        Raises:
            ValueError: If the new email is invalid or already exists.

        Returns:
            str: The new email of the user.
        """
        # Check if new_email is valid
        if not self.email_regex.match(new_email):
            raise ValueError("Invalid email address.")

        # Check if new_email already exists
        if self.users.find_one({'email': new_email}):
            raise ValueError(f"User {new_email} already exists")

        # If new_email is valid and doesn't exist, proceed with the update
        self.users.update_one({'email': email}, {'$set': {'email': new_email}})
        return new_email

    def get_info(self, email):
        """
        Retrieves information about a user.

        Args:
            email (str): The email of the user whose information is to be retrieved.

        Returns:
            dict: A dictionary containing the user's information, excluding the password and MongoDB ID.
        """
        user = self.users.find_one({'email': email})
        del user['_id']
        del user['password']
        user['created_at'] = user['created_at'].strftime("%Y-%m-%d %H:%M:%S")
        return user

    def update_password(self, email, old_password, new_password):
        """
        Updates the password of a user.

        Args:
            email (str): The email of the user whose password is to be updated.
            old_password (str): The current password of the user.
            new_password (str): The new password to be set.

        Raises:
            ValueError: If the old password does not match the current password.

        Returns:
            bool: True if the password was successfully updated, False otherwise.
        """
        user = self.users.find_one({'email': email})
        if bcrypt.checkpw(old_password.encode(), user['password'].encode()):
            self.users.update_one({'email': email}, {'$set': {'password': Auth.hash_password(new_password)}})
            return True
        else:
            raise ValueError("Old password does not match the current password")
