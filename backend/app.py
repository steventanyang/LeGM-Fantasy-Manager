from flask import Flask
from flask import jsonify

import requests
import json
from datetime import datetime, timedelta
# from espnapi.basketball import League

from sqlalchemy import create_engine, Column, Integer, String, Boolean, ForeignKey
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

    def __repr__(self):
        return f"<User(id={self.id}, espn_user={self.espn_user})>"
    
class Player(Base):

    __tablename__ = 'players'

    player_id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String(50))
    last_name = Column(String(50))
    name = Column(String(50))
    headshot_id = Column(Integer)
    team = Column(String(50))
    value = Column(Integer)
    rostered = Column(Boolean)
    score = Column(Integer)
    fantasyteam = Column(Integer, ForeignKey('teams.team_id'))

    def __repr__(self):
        return f"<Player(id={self.player_id}, first_name={self.first_name}, last_name={self.last_name}, headshot_id={self.headshot_id}, team={self.team}, value={self.value}, fantasyteam={self.fantasyteam})>"

class Teams(Base):
    __tablename__ = 'teams'
    team_id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100))
    currentmatchup = Column(String(100))
    nextmatchup = Column(String(100))

    def __repr__(self):
        return f"<Team(name={self.name}, team_id={self.team_id}, currentmatchup={self.currentmatchup}, nextmatchup={self.nextmatchup})>"

app = Flask(__name__)

#route for users, teams, and players table
@app.route("/users")
def users():
    all_users = session.query(User).all()
    users_data = [{"id": user.id, "espn_user": user.espn_user, "espn_pass": user.espn_pass, "league": user.league, "team": user.team, "record": user.record} for user in all_users]
    return jsonify(users_data)

@app.route("/teams")
def team():
    all_teams = session.query(Teams).all()
    teams_data = [{"team_id": team.team_id, "name": team.name} for team in all_teams ]
    return jsonify(teams_data)

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

@app.route('/preseason')
def preseason():

    api_url = 'https://api.sportsdata.io/v3/nba/projections/json/PlayerSeasonProjectionStats/2023?key=a05b89392fc741e49290bbb8eb0f23d8'
    response = requests.get(api_url)

    if response.status_code == 200:
        data = response.json()
        return jsonify(data)
    else:
        return jsonify({"error": "Failed to fetch data from external API"}), response.status_code


@app.route('/espn')
def espn():
    with open('static/espn.json', 'r') as file:
        data = json.load(file)
    return jsonify(data)

@app.route('/schedule')
def schedule():
    with open('static/schedule.json', 'r') as file:
        data = json.load(file)
    return jsonify(data)


# projections tdy/tmrw and games tdy/tmrw used to calculate player value

@app.route('/today')
def today():

    today = datetime.now().strftime("%Y-%b-%d").upper()

    api_url = f'https://api.sportsdata.io/v3/nba/projections/json/PlayerGameProjectionStatsByDate/{today}?key=a05b89392fc741e49290bbb8eb0f23d8'
    response = requests.get(api_url)

    if response.status_code == 200:
        data = response.json()
        return jsonify(data)
    else:
        return jsonify({"error": "Failed to fetch data from external API"}), response.status_code

@app.route('/tomorrow')
def tomorrow():

    tomorrow = (datetime.now() + timedelta(days=1)).strftime("%Y-%b-%d").upper()

    api_url = f'https://api.sportsdata.io/v3/nba/projections/json/PlayerGameProjectionStatsByDate/{tomorrow}?key=a05b89392fc741e49290bbb8eb0f23d8'
    response = requests.get(api_url)

    if response.status_code == 200:
        data = response.json()
        return jsonify(data)
    else:
        return jsonify({"error": "Failed to fetch data from external API"}), response.status_code

@app.route('/gamestdy')
def gamestdy():

    today = datetime.now().strftime("%Y-%b-%d").upper()

    api_url = f'https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/{today}?key=a05b89392fc741e49290bbb8eb0f23d8'
    response = requests.get(api_url)

    if response.status_code == 200:
        data = response.json()
        return jsonify(data)
    else:
        return jsonify({"error": "Failed to fetch data from external API"}), response.status_code

@app.route('/gamestmrw')
def gamestmrw():

    tomorrow = (datetime.now() + timedelta(days=1)).strftime("%Y-%b-%d").upper()

    api_url = f'https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/{tomorrow}?key=a05b89392fc741e49290bbb8eb0f23d8'
    response = requests.get(api_url)

    if response.status_code == 200:
        data = response.json()
        return jsonify(data)
    else:
        return jsonify({"error": "Failed to fetch data from external API"}), response.status_code

@app.route('/top-players')
def top_players():

    def get_top_players(limit=8):
        top_players = (
            session.query(Player)
            .filter(Player.rostered == False)
            .order_by(Player.value.desc())
            .limit(limit)
            .all()
        )
        return top_players
    
    top_players = get_top_players()
    top_players_data = [
        {"name": player.name, "team": player.team, "value": player.value}
        for player in top_players
    ]
    return jsonify(top_players_data)

@app.route('/drop-players')
def drop_players():

    def get_low_score(limit=5):
        score_players = (
            session.query(Player)
            .filter(Player.fantasyteam == 1)
            .order_by(Player.value.asc())
            .limit(limit)
            .all()
        )
        return score_players
    
    top_players = get_low_score()
    top_players_data = [
        {"name": player.name, "score": player.score}
        for player in top_players
    ]
    return jsonify(top_players_data)


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
