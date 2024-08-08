import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, text
import numpy as np
import pandas as pd
import datetime as dt

from flask import Flask, jsonify

engine = create_engine("sqlite:///Tesla.sqlite")
# reflect an existing database into a new model
Base = automap_base()

# reflect the tables

Base.prepare(autoload_with=engine)
SuperchargeLocation = Base.classes.supercharge_locations



conn = engine.connect()

session = Session(engine)
#################################################
# Flask Setup
#################################################


app = Flask(__name__)


#################################################
# Flask Routes
#################################################

def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/bubble<br/>"
      
      
    )

@app.route("/api/v1.0/bubble")
def bubbles():
    results = (
    session.query(
        SuperchargeLocation.Country,
        func.count().label('Location_Count'),
        func.avg(SuperchargeLocation.Stalls).label('Average_Stalls')
    )
    .group_by(SuperchargeLocation.Country)
    .order_by(func.count().desc())
    .all()
        )
    df = pd.DataFrame(results, columns=['Country', 'Location_count', 'Average_Stalls'])

    data = df.to_dict(orient="records")
    return(jsonify(data))

session.close()

if __name__ == '__main__':
    app.run(debug=True)