from flask import Flask, jsonify
import pandas as pd
import numpy as np
from sqlHelper import SQLHelper

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
sql = SQLHelper()

#################################################
# Flask Routes
#################################################

<<<<<<< HEAD
=======
@app.route("/")
def home_page():
    return render_template("home.html")

@app.route("/work_sited")
def about_us():
    return render_template("work_sited.html")

@app.route("/about_us")
def about_us():
    return render_template("about_us.html")

@app.route("/map")
def about_us():
    return render_template("map.html")

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")
def welcome():
    """List all available api routes."""
    return (
        #this will be where we put all of our query routes from the sqlHelper
        #where the stars are is where the queries go
        f"Available Routes:<br/>"
        f"/api/v1.0/***<br/>"
        f"/api/v1.0/<br/>"
        f"/api/v1.0/<br/>"
        f"/api/v1.0/"
    )

# SQL Queries
#below is an example of what the code should look like 
# @app.route("/api/v1.0/precipitation_orm")
# def passengers_orm():
#     data = sql.query_precipitation_orm()
#     return(jsonify(data))
>>>>>>> 93806e10364404e4ca812024bd11032724a52bd3


if __name__ == '__main__':
    app.run(debug=True)