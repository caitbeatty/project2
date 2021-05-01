# flask code
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func


from flask import Flask, jsonify, render_template, redirect, url_for


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///API datasources/philly.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)


# Save reference to the table
household_income = Base.classes.household

query_url = Base.classes.query_url

#################################################
# Flask Setup
################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/household<br/>"
        f"/api/v1.0/query_url<br/>"
        
    )


@app.route("/api/v1.0/household")
def household():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all philly names"""
    # Query all passengers
    results = session.query(household_income.ID_Geography, household_income.Household_Income_by_Race, household_income.ID_Year).all()

    session.close()

    # Convert list of tuples into normal list
    all_names = list(np.ravel(results))

    return jsonify(all_names)

# create route for salary by gender
@app.route("/api/v1.0/query_url")
def salaries():
    # Create our session (link) from Python to the DB
    session = Session(engine)


# Query for the date and precipitation for the last year
    salary = session.query(query_url.Gender, query_url.ID_Geography, query_url.Full_or_Part_Time, query_url.Title, query_url.Year, query_url.Avg_Salary, query_url.Total_Population).all()
    
    session.close()
    # Convert list of tuples into normal list
    all_salaries = list(np.ravel(salary))

    return jsonify(all_salaries)


# def passengers():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     """Return a list of passenger data including the name, age, and sex of each passenger"""
#     # Query all passengers
#     results = session.query(Passenger.name, Passenger.age, Passenger.sex).all()

#     session.close()

#     # Create a dictionary from the row data and append to a list of all_passengers
#     all_passengers = []
#     for name, age, sex in results:
#         passenger_dict = {}
#         passenger_dict["name"] = name
#         passenger_dict["age"] = age
#         passenger_dict["sex"] = sex
#         all_passengers.append(passenger_dict)

#     return jsonify(all_passengers)


if __name__ == '__main__':
    app.run(debug=True)
