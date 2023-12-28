from flask import Flask
from flask import jsonify
import requests
# from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base


engine = create_engine('mysql+pymysql://root:Ca123456%40@localhost/leGM', echo = False)
Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    espn_user = Column(String(50))
    espn_pass = Column(String(50))
    league = Column(String(100))
    team = Column(String(100))
    record = Column(String(10))

    # Add a representation method for debugging purposes
    def __repr__(self):
        return f"<User(id={self.id}, espn_user={self.espn_user})>"

#inser data into database: 
# new_user = User(espn_user='example_user', espn_pass='example_pass', league='example_league', team='example_team', record='0-0')
# session.add(new_user)
# session.commit()

app = Flask(__name__)

#route for users table
@app.route("/users")
def users():

    all_users = session.query(User).all()
    users_data = [{"id": user.id, "espn_user": user.espn_user, "espn_pass": user.espn_pass, "league": user.league, "team": user.team, "record": user.record} for user in all_users]
    return jsonify(users_data)

#route for team table
@app.route("/team")
def team():
    return {"test": ["100", "200", "300"]}

#route for player stats table
@app.route("/players")
def players():
    return {"test": ["100", "200", "300"]}

@app.route('/stats')
def stats():

    api_url = 'https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStats/2023?key=a05b89392fc741e49290bbb8eb0f23d8'

    response = requests.get(api_url)

    if response.status_code == 200:
        data = response.json()
        return jsonify(data)
    else:
        return jsonify({"error": "Failed to fetch data from external API"}), response.status_code

@app.route('/news')
def news():

    api_url = 'https://api.sportsdata.io/v3/nba/scores/json/News?key=a05b89392fc741e49290bbb8eb0f23d8'

    response = requests.get(api_url)

    if response.status_code == 200:
        data = response.json()
        return jsonify(data)
    else:
        return jsonify({"error": "Failed to fetch data from external API"}), response.status_code



if __name__=="__main__":
    app.run(port=8000, debug=True)
