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
census_household = Base.classes.census_household

query_url = Base.classes.query_url

schools = Base.classes.schools

census = Base.classes.censustracts


#################################################
# Flask Setup
################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    print("in route route")
    return render_template("index.html")

@app.route("/salary")
def hi():
    return render_template("salaries.html")


@app.route("/schools")
def yellow():
    return render_template("schools.html")


@app.route("/api/v1.0/census_household")
def household():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all philly names"""
    # Query all passengers
    results = session.query(census_household.index, census_household.Household_Income, census_household.ID_Year, census_household.geoid, census_household.latitude, census_household.longitude).all()

    session.close()

    # Convert list of tuples into normal list
    # all_names = list(np.ravel(results))

    return jsonify(results)

# create route for salary by gender
@app.route("/api/v1.0/query_url")
def salaries():
    # Create our session (link) from Python to the DB
    session = Session(engine)


    # Query for the date and precipitation for the last year
    # salary = session.query(query_url.Gender, query_url.ID_Geography, query_url.Full_or_Part_Time, query_url.Title, query_url.Year, query_url.Avg_Salary, query_url.Total_Population).all()
    

    salary = session.query(query_url.Gender, query_url.Title, func.avg(query_url.Avg_Salary)).\
    group_by(query_url.Gender, query_url.Title).\
    all()    


    session.close()

    return jsonify(salary)

@app.route("/api/v1.0/phillyschools")
def school():
    # Create session (link) from SQLite to Flask 
    session = Session(engine)

    philly_schools = session.query(schools.id, schools.school_name, schools.abbrv_name, schools.school_level, schools.type, schools.grade_level, schools.geolocation, schools.address, schools.website, schools.spr_score).all()

    session.close()

    return jsonify(philly_schools)

@app.route("/api/v1.0/censustracts")
def censusdata():
    # Create session (link) from SQLite to Flask 
    session = Session(engine)

    census_tracts = session.query(census.index, census.recordnum, census.geoid, census.latitude, census.longitude, census.coordinate_0, census.coordinate_1).all()

    session.close()

    return jsonify(census_tracts)



if __name__ == '__main__':
    app.run(debug=True)
