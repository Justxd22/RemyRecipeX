import regex as re
import bcrypt
from models.auth import Auth

class User:
    def __init__(self, db):
        '''Initialize a User instance'''
        self.db = db
        self.users = self.db['users']

        # Precompile regex patterns using the regex library
        self.email_regex = re.compile(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
        # self.username_regex = re.compile(r"^[a-zA-Z0-9_-]{3,20}$")

    def update_name(self, email, new_name):
        '''Updates name to new_name.'''
        self.users.update_one({'email': email}, {'$set': {'name': new_name}})

        # Return the new name and a boolean value indicating success to update the session state
        return new_name

    def update_email(self, email, new_email):
        '''Updates the email of the given user'''
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
        user = self.users.find_one({'email': email})
        del user['_id']
        del user['password']
        user['created_at'] = user['created_at'].strftime("%Y-%m-%d %H:%M:%S")
        return user

    def update_password(self, email, old_password, new_password):
        user = self.users.find_one({'email': email})
        if bcrypt.checkpw(old_password.encode(), user['password'].encode()):
            self.users.update_one({'email': email}, {'$set': {'password': Auth.hash_password(new_password)}})
            return True
        else:
            raise ValueError("Old password does not match the current password")
