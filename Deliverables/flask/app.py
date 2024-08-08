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

@app.route("/")
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


# Run the App
if __name__ == '__main__':
    app.run(debug=True)

