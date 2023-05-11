"""Handles safely storing and checking user passwords, and the User class"""
import random
import string
from typing import Union

import bcrypt

users = []  # for testing purposes only, will be replaced with a database


def get_hashed_password(plain_text_password: str):
    """Hash a password for the first time
    (Using bcrypt, the salt is saved into the hash itself)"""
    return bcrypt.hashpw(plain_text_password.encode("utf-8"), bcrypt.gensalt())


def get_user_info(token: str) -> Union[dict, bool]:
    for user in users:
        for u in user.session_tokens:
            print(u)
        if token in user.session_tokens:
            return {
                "username": user.username,
                "user_id": user.user_id,
                "logged_in": user.logged_in,
            }
    return False


def login(username: str, password: str) -> Union[str, bool]:
    """logs in a user with the given username and password"""
    for user in users:
        if user == username:
            if user.check_password(password):
                user.logged_in = True
                # generate a session token
                token = "".join(
                    random.choices(string.ascii_letters + string.digits, k=16)
                )
                user.session_tokens.append(token)
                print(user.session_tokens)
                return token
            return False
    return False


class User:
    """Class which represents a basic user.
    password is NEVER stored in plaintext, only as a hash"""

    def __init__(self, username: str, password: str):
        self.user_id = self.generate_random_id()
        self.username = username
        self.password_hash = get_hashed_password(password)
        self.logged_in = False
        self.session_tokens = []
        users.append(self)

    def __eq__(self, other: Union[str, "User"]) -> bool:
        if isinstance(other, str):
            return self.username == other
        if isinstance(other, User):
            return self.username == other.username
        raise NotImplementedError

    def __repr__(self):
        return (
            f"User(username: {self.username}, password (hashed): {self.password_hash})"
        )

    def check_password(self, password: str) -> bool:
        """Checks if the given password matches the stored password hash

        Args:
            password (str): The password to check

        Returns:
            bool: True if the password matches, False otherwise
        """
        return bcrypt.checkpw(password.encode("utf-8"), self.password_hash)

    @staticmethod
    def generate_random_id() -> int:
        """generate a random  digit user id number, can be any number,
        generate 8 random numbers and stitch them together.
        when implemented, check against user db

        Returns:
            int: random 8 digit number which is unique to the user
        """
        id_str = ""
        for _ in range(8):
            id_str += str(random.randint(0, 9))
        return int(id_str)
