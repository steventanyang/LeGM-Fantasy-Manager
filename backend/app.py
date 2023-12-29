from flask import Flask
from flask import jsonify
import requests

from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

#https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201939.png

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

    def __repr__(self):
        return f"<User(id={self.id}, espn_user={self.espn_user})>"
    
class Player(Base):

    __tablename__ = 'players'

    player_id = Column(Integer, primary_key=True)
    first_name = Column(String(50))
    last_name = Column(String(50))
    name = Column(String(50))
    headshot_id = Column(Integer)

    def __repr__(self):
        return f"<Player(id={self.player_id}, first_name={self.first_name}, last_name={self.last_name}, headshot_id={self.headshot_id})>"

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
    all_players = session.query(Player).all()
    player_data = [{"player_id": player.player_id, "name": player.name, "headshot_id": player.headshot_id} for player in all_players]
    return jsonify(player_data)

@app.route('/stats')
def stats():

    api_url = 'https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStats/2023?key=a05b89392fc741e49290bbb8eb0f23d8'
    response = requests.get(api_url)

    if response.status_code == 200:
        data = response.json()
        return jsonify(data)
    else:
        return jsonify({"error": "Failed to fetch data from external API"}), response.status_code

@app.route('/headshots')
def headshots():

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
