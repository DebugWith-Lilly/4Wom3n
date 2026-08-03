#Imports
from flask import Flask, render_template, request, redirect, url_for, flash, session
from database import *

#Create Flask app
app = Flask(__name__)
app.secret_key = "some_secret_key"
#Configurations

#Register Database Functions

#Define routes
#Home Page
@app.route("/", methods =["GET", "POST"])
def home_action():
    return render_template("Main Page.html")

#Add a doctor to doctors table
@app.route("/get-started/doctor", methods=["GET", "POST"])
def doctor():
    if request.method == "POST":
        name = request.form["name"]
        surname = request.form["surname"]
        specialty = request.form["specialty"]
        license_no = request.form["license_no"]
        password = request.form["password"]

        db = get_db_connection() #Adding doctor to database
        db.execute("""
            INSERT INTO doctors
            (name, surname, specialty, license, password)
            VALUES (?,?,?,?,?)
        """,
        (name, surname, specialty, license_no, password))
        db.commit()
        return render_template("login.html")
    #return render_template("get-started.html")

#Register a new user
@app.route("/get-started", methods=["GET", "POST"])
def get_started():    
    if request.method == "POST":
        first_name = request.form["first_name"]
        last_name = request.form["last_name"]
        age = request.form["age"]
        email = request.form["email"]
        password = request.form["password"]

        #Adding new user to database
        db = get_db_connection()
        db.execute("""
            INSERT INTO users
            (first_name, last_name, age, email, password)
            VALUES (?,?,?,?,?)
        """, 
        (first_name, last_name, age, email, password))
        db.commit()
        return render_template("login.html")
    return render_template("get-started.html")

#Sign In
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        session["email"] = request.form["email"]
        session["password"] = request.form["password"]
        return redirect("/login/patient-dashboard")

    return render_template("login.html")

#Assign a patient a doctor

#Patient Verification Check and redirect to Patient Dashboard
@app.route("/login/patient-dashboard", methods=["GET"])
def login_dashboard():
    password = session.get("password")
    email = session.get("email")
    
    db = get_db_connection()
    user = db.execute("""
        SELECT * FROM users
        WHERE email = ?
        """, (email,)).fetchone()
    
    if user is None:
        print("No user found")       
    elif user and user["password"] == password:
        return render_template("patient-dashboard.html")
        print("Passwords match")
    else:
        return redirect("/login")

#Doctor Verification Check and redirect to Doctor Dashboard
@app.route("/login/doctor-dashboard", methods=["GET"])
def login_docdashboard():
    password = session.get("password")
    email = session.get("email")
    
    db = get_db_connection()
    doctor = db.execute("""
        SELECT * FROM doctors
        WHERE email = ?
        """, (email,)).fetchone()
    
    if doctor is None:
        print("No user found")       
    elif doctor and doctor["password"] == password:
        return render_template("doctor-dashboard.html")
        print
        ("Passwords match")
    else:
        return redirect("/login")
   
#Doctor Dashboard: Upcoming Appointments

#Symptom Page

#Priority Ranking

#Consultations Page

#Log out
@app.route("/logout", methods = ["GET", "POST"])
def logout():
    return render_template("Main Page.html")


#Run the server
if __name__ == "__main__":
    app.run(debug=True)

app.teardown_appcontext(close_db_connection)