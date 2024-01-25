import sqlite3
from pprint import pprint


def init_databases() -> sqlite3.Connection:
    global conn
    conn = sqlite3.connect("backend/db/accounts.sqlite", check_same_thread=False)
    cursor = conn.cursor()
    cursor.execute(
        """CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY,
            firstName TEXT,
            lastName TEXT,
            email TEXT,
            dob TEXT,
            password TEXT,
            token TEXT)"""
    )
    conn.commit()
    cursor.execute(
        """CREATE TABLE IF NOT EXISTS admin (
        id INTEGER PRIMARY KEY,
        firstName TEXT,
        lastName TEXT,
        email TEXT,
        password TEXT,
        token TEXT)"""
    )
    conn.commit()
    print("Initialized databases")
    return conn


def get_info_about_self(user_id, token):
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM user WHERE id=?", (user_id,))
    base_user = cursor.fetchone()
    # check if that user exists
    if not base_user:
        print("User not found")
        return 404, "User not found"

    if base_user[6] == token:
        return 200, {
            "id": base_user[0],
            "firstName": base_user[1],
            "lastName": base_user[2],
            "email": base_user[3],
            "dob": base_user[4],
            # "password": base_user[5], we don't want to return the password
            "token": base_user[6],
        }
    else:
        print(f"Invalid token for user with email {base_user[3]}")
        return 403, "Invalid token"


def get_info_about_user(requester_id, requester_token, user_id):
    cursor = conn.cursor()
    print(f'SELECT * FROM admin WHERE id={requester_id}')
    cursor.execute("SELECT * FROM admin WHERE id=?", (requester_id,))
    admin_user = cursor.fetchone()
    print(admin_user)
    if admin_user[5] == requester_token:
        cursor.execute("SELECT * FROM user WHERE id=?", (user_id,))
        base_user = cursor.fetchone()
        if base_user:
            print(f"Found user with email {base_user[3]}")
            return 200, {
                "id": base_user[0],
                "firstName": base_user[1],
                "lastName": base_user[2],
                "email": base_user[3],
                "dob": base_user[4],
                # "password": base_user[5], we don't want to return the password
                "token": base_user[6],
            }
        else:
            print("User not found")
            return 404, "User not found"
    else:
        print(f"Invalid token for admin with email {admin_user[3]}")
        return 403, "Invalid token"


def get_info_about_all_users(requester_id, requester_token):
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM admin WHERE id=?", (requester_id,))
    admin_user = cursor.fetchone()
    if admin_user[5] == requester_token:
        cursor.execute("SELECT * FROM user")
        base_users = cursor.fetchall()
        if base_users:
            print("Found users")
            return 200, [
                {
                    "id": base_user[0],
                    "firstName": base_user[1],
                    "lastName": base_user[2],
                    "email": base_user[3],
                    "dob": base_user[4],
                    "token": base_user[5],
                }
                for base_user in base_users
            ]
        else:
            print("No users found")
            return 404, "No users found"
    else:
        print(f"Invalid token for admin with email {admin_user[3]}")
        return 403, "Invalid token"


def delete_user(user_id, requester_user_id, token):
    cursor = conn.cursor()
    # check if requester is admin, or if requester is user and user is self
    cursor.execute("SELECT * FROM admin WHERE id=?", (requester_user_id,))
    admin_user = cursor.fetchone()
    if admin_user[5] == token:
        print(f"Admin with email {admin_user[3]} deleted user with id {user_id}")
        cursor.execute("DELETE FROM user WHERE id=?", (user_id,))
        conn.commit()
        return 200, True
    else:
        print(f"User with id {requester_user_id} is not an admin")
        cursor.execute("SELECT * FROM user WHERE id=?", (requester_user_id,))
        base_user = cursor.fetchone()
        if base_user[4] == token:
            cursor.execute("DELETE FROM user WHERE id=?", (user_id,))
            conn.commit()
            return 200, True
        else:
            return 403, "Invalid token"
