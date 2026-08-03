#CRUD OPERATIONS
import sqlite3
from flask import g

DATABASE = "instance/endo-system.db"

def get_db_connection():
    if "db" not in g:
        g.db = sqlite3.connect(DATABASE)
        g.db.row_factory = sqlite3.Row
    return g.db

def close_db_connection():
    db = g.pop("db", None)
    if db is not None:
        db.close()
    

def get_user(email_addr):
    db = get_db_connection()
    return db.execute(
        "SELECT * FROM users where email = ?",
        (email_addr,)
    ).fetchone()

#def users():
    db = get_db_connection()
    users = db.execute(
        "SELECT * FROM users"
    ).fetchall()
    return users

#def add_user(name, surname, age, email_addr, password):
    db = get_db_connection()
    db.execute("""
        INSERT INTO users
        ("first_name, last_name, age, email, password)
        VALUES (?,?,?,?,?)
        """,
        (name, surname, age, email_addr, password))

    db.commit()

#def remove_user(email_addr):
    db = get_db_connection()
    db.execute("""
        DELETE FROM users
        WHERE email = ?
    """, (email_addr,))
    db.commit()

#def create_patient():
#def remove_patient():
#def create_doctor():
#def remove_doctor():