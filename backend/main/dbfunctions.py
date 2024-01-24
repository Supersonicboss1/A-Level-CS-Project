import sqlite3


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
    return conn


def get_info_about_self(user_id, token):
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM user WHERE id=?", (user_id,))
    base_user = cursor.fetchone()
    # check if that user exists
    if not base_user:
        return 404, "User not found"
    print(base_user)
    
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
        print(f"Token: {token}")
        print(f"User token: {base_user[6]}")
        return 403, "Invalid token"


def get_info_about_user(requester_id, requester_token, user_id):
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM admin WHERE id=?", (requester_id,))
    admin_user = cursor.fetchone()
    if admin_user[3] == requester_token:
        cursor.execute("SELECT * FROM user WHERE id=?", (user_id,))
        base_user = cursor.fetchone()
        if base_user:
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
            return 404, "User not found"
    else:
        return 403, "Invalid token"


def get_info_about_all_users(requester_id, requester_token):
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM admin WHERE id=?", (requester_id,))
    admin_user = cursor.fetchone()
    if admin_user[3] == requester_token:
        cursor.execute("SELECT * FROM user")
        base_users = cursor.fetchall()
        if base_users:
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
            return 404, "No users found"
    else:
        return 403, "Invalid token"


def delete_user(user_id, requester_user_id, token):
    cursor = conn.cursor()
    # check if requester is admin, or if requester is user and user is self
    cursor.execute("SELECT * FROM admin WHERE id=?", (requester_user_id,))
    admin_user = cursor.fetchone()
    if admin_user[3] == token:
        cursor.execute("DELETE FROM user WHERE id=?", (user_id,))
        conn.commit()
        return 200, True
    else:
        cursor.execute("SELECT * FROM user WHERE id=?", (requester_user_id,))
        base_user = cursor.fetchone()
        if base_user[4] == token:
            cursor.execute("DELETE FROM user WHERE id=?", (user_id,))
            conn.commit()
            return 200, True
        else:
            return 403, "Invalid token"
