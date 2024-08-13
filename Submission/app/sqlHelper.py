import sqlalchemy
# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.orm import Session
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
    def get_sunburst(self):

        # # build the query
        # query = f"""
        # SELECT
        # Country,
        # State,
        # City,
        # SUM(Stalls) AS stalls,
        # MIN(kW) AS min_kw,
        # MAX(kW) AS max_kw
        # FROM supercharge_locations
        # where stalls >= 15
        # GROUP BY Country, State, City;

        # """

        # build the query
        query = f"""
        SELECT
        Country,
        State,
        City,
        Supercharger,
        Street_Address,
        kW,
        Stalls,
        Latitude,
        Longitude
        FROM supercharge_locations;

        """
        df = pd.read_sql(text(query), con = self.engine)
        df['City'] = df['City'] + "_" + df['State']
        df['State'] = df['State'] + "_"+ df['Country']
        


        data = df.to_dict(orient="records")
        return(data)
    
    def get_bubble(self, min_stalls, country, state):

        # switch on user_region
        if country == 'All':
            where_clause = "and 1=1"
            group_clause = "Country"  
        elif state == 'All':
            where_clause = f"and country = '{country}'"  
            group_clause = "Country, State"  
        else:
            where_clause = f"and country = '{country}' and state = '{state}'" 
            group_clause = "Country, State, City"  

        # build the query
        query = f"""
            SELECT
                Country,
                State,
                City,
                AVG(Stalls) AS AvgStalls,
                SUM(Stalls) AS TotalStalls,
                MIN(kW) AS min_kw,
                MAX(kW) AS max_kw
            FROM
                supercharge_locations
            WHERE
                Stalls >= {min_stalls}
                {where_clause}
            GROUP BY
                {group_clause}
            ORDER BY
                TotalStalls DESC;   

        """
        df = pd.read_sql(text(query), con = self.engine)
        data = df.to_dict(orient="records")
        return(data)
    
    # def get_filter_Data(self):

    #     # build the query
    #     query = f"""
    #         select
    #             Country, State 
    #         from
    #             supercharge_locations
    #         group by
    #             Country, State
    #         order by
    #             Country, State

    #     """
    #     df = pd.read_sql(text(query), con = self.engine)
    #     data = df.to_dict(orient="records")
    #     return(data)

    def get_Country_filter_Data(self):

        # build the query
        query = f"""
            select
                DISTINCT Country 
            from
                supercharge_locations
            group by
                Country
            order by
                Country

        """
        df = pd.read_sql(text(query), con = self.engine)
        data = df.to_dict(orient="records")
        return(data)

    def get_State_filter_Data(self, country):

        # build the query
        query = f"""
            select
                DISTINCT State 
            from
                supercharge_locations
            Where
                Country = '{country}' 
            group by
                State
            order by
                State

        """
        df = pd.read_sql(text(query), con = self.engine)
        data = df.to_dict(orient="records")
        return(data)
    
    
    def get_map_Data(self):

        # build the query
        query = f"""
        SELECT
            Country,
            State,
            City,
            Supercharger,
            Street_Address,
            kW,
            Stalls,
            Latitude,
            Longitude
        FROM
            supercharge_locations

        """
        df = pd.read_sql(text(query), con = self.engine)
        data = df.to_dict(orient="records")
        return(data)