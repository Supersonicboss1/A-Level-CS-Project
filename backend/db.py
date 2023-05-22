import sqlite3


class UserDatabase:
    def __init__(self):
        self.conn = sqlite3.connect("users.db")
        self.c = self.conn.cursor()
        # drop table for testing if it exists
        self.c.execute("DROP TABLE IF EXISTS users")
        self.c.execute(
            """CREATE TABLE IF NOT EXISTS users (
                user_id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL,
                password TEXT NOT NULL,
                email TEXT NOT NULL,
                name TEXT NOT NULL,
                surname TEXT NOT NULL)
                """
        )
        self.conn.commit()

    def add_user(self, username, password, email, name, surname):
        self.c.execute(
            "INSERT INTO users VALUES (,?,?,?,?,?)",
            (username, password, email, name, surname),
        )
        self.conn.commit()

    def get_user(self, username):
        self.c.execute("SELECT * FROM users WHERE username=?", (username,))
        return self.c.fetchone()

    def get_all_users(self):
        self.c.execute("SELECT * FROM users")
        return self.c.fetchall()

    def delete_user(self, username):
        self.c.execute("DELETE FROM users WHERE username=?", (username,))
        self.conn.commit()

    def update_user(self, username, password, email, name, surname):
        self.c.execute(
            "UPDATE users SET password=?, email=?, name=?, surname=? WHERE username=?",
            (password, email, name, surname, username),
        )
        self.conn.commit()

    def close(self):
        self.conn.close()

db1 = UserDatabase()
# drop table

db1.add_user("admin", "admin", "johnsmith@gmail.com", "John", "Smith")
db1.add_user("dadmin", "addmin", "johnsmith@gmadil.com", "Jodhn", "Smidth")
print(db1.get_user("admin"))
print(db1.get_user("nonexistent"))
