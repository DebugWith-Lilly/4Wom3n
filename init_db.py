#Creating and interacting with the database

import sqlite3

connection = sqlite3.connect("instance/endo-system.db")
with open("database/schema.sql", "r") as f:
    connection.executescript(f.read())
connection.commit()
connection.close()
print("Database created successfully.")