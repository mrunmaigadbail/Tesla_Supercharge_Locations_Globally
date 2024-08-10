# Import the dependencies.
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
app = Flask(__name__)
sqlHelper = SQLHelper() # initialize the database helper

@app.route("/")
def home_page():
    return render_template("home.html")



 

#################################################
# Execute the App
#################################################
if __name__ == "__main__":
    app.run(debug=True)