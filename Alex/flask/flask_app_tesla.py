from flask import Flask, jsonify, render_template
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

# HTML ROUTES
@app.route("/home")
def index():
    return render_template("home.html")

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

@app.route("/charger_map")
def about_us():
    return render_template("charger_map.html")

@app.route("/about_us")
def about_us():
    return render_template("about_us.html")

@app.route("/work_cited")
def about_us():
    return render_template("work_cited.html")

# SQL Queries
@app.route("/api/v1.0/get_dashboard/<min_attempts>/<region>")
def get_dashboard(min_attempts, region):
    min_attempts = int(min_attempts) # cast to int

    bar_data = sql.get_bar(min_attempts, region)
    sunburst_data = sql.get_sunburst(min_attempts, region)
    bubble_data = sql.get_bubble(min_attempts, region)
    line_data = sql.get_line(min_attempts, region)
    table_data = sql.get_table(min_attempts, region)

    data = {
        "bar_data": bar_data,
        "sunburst_data": sunburst_data,
        "bubble_data": bubble_data,
        "line_data": line_data,
        "table_data": table_data
    }
    return(jsonify(data))

@app.route("/api/v1.0/get_map/<min_attempts>/<region>")
def get_map(min_attempts, region):
    min_attempts = int(min_attempts) # cast to int
    map_data = sql.get_map(min_attempts, region)

    return(jsonify(map_data))



# Run the App
if __name__ == '__main__':
    app.run(debug=True)