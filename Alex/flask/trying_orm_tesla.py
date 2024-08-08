import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, text, func
import datetime

import pandas as pd
import numpy as np

# The Purpose of this Class is to separate out any Database logic
class SQLHelper():
    #################################################
    # Database Setup
    #################################################

    # define properties
    def __init__(self):
        self.engine = create_engine("sqlite:///Tesla.sqlite")
        self.Base = None

        # automap Base classes
        self.init_base()

    def init_base(self):
        # reflect an existing database into a new model
        self.Base = automap_base()
        # reflect the tables
        self.Base.prepare(autoload_with=self.engine)

    #################################################
    # Database Queries
    #################################################


def country_chargers(self, start):
        # Save reference to the table
        Measurement = self.Base.classes.measurement

        # Create our session (link) from Python to the DB
        session = Session(self.engine)

        start_date = datetime.datetime.strptime(start, '%Y-%m-%d')

        # Perform a query to retrieve the data and tobs scores
        results = session.query(func.min(Measurement.tobs), func.avg(Measurement.tobs), func.max(Measurement.tobs)).\
            filter(Measurement.date >= start_date).\
            all()

        # Save the query results as a Pandas DataFrame. Explicitly set the column names
        df2 = pd.DataFrame(results, columns=["min_tobs", "avg_tobs", "max_tobs"])

        # close session
        session.close()

        data = df2.to_dict(orient="records")
        return(data)


query = f"""
        SELECT City, State, Country, COUNT(*) AS Location_Count
        FROM supercharge_locations
        GROUP BY City, State, Country
        ORDER BY Country DESC;
        """
gen_loc = pd.read_sql(text(query), con=engine)
gen_loc.head(50)