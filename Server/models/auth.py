"""Auth here."""
import bcrypt
from datetime import datetime
import regex as re

class Auth:
    """Auth class."""

    def __init__(self, db):
        """Iniit."""
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
        '''Registers a user'''
        # Check if email and username are valid
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
        '''De-registers a the user with the given email'''
        result = self.users.delete_one({'email': email})
        if result.deleted_count == 1:
            return f"User {email} has been deregistered successfully."
        else:
            raise ValueError(f"Failed to deregister user {email}.")


    def valid_login(self, email: str, password: str) -> bool:
        """Is valid."""
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
        """Hash given pass."""
        return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
