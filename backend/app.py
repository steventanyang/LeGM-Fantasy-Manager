from flask import Flask
from flask import jsonify
from json import JSONEncoder
import requests
from datetime import datetime, timedelta
from espnapi.basketball import League

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

    def __repr__(self):
        return f"<User(id={self.id}, espn_user={self.espn_user})>"
    
class Player(Base):

    __tablename__ = 'players'

    player_id = Column(Integer, primary_key=True)
    first_name = Column(String(50))
    last_name = Column(String(50))
    name = Column(String(50))
    headshot_id = Column(Integer)
    team = Column(String(50))
    value = Column(Integer)

    def __repr__(self):
        return f"<Player(id={self.player_id}, first_name={self.first_name}, last_name={self.last_name}, headshot_id={self.headshot_id}, team={self.team}, value={self.value})>"

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

@app.route('/preseason')
def preseason():

    api_url = 'https://api.sportsdata.io/v3/nba/projections/json/PlayerSeasonProjectionStats/2023?key=a05b89392fc741e49290bbb8eb0f23d8'
    response = requests.get(api_url)

    if response.status_code == 200:
        data = response.json()
        return jsonify(data)
    else:
        return jsonify({"error": "Failed to fetch data from external API"}), response.status_code


# @app.route('/espn-data')
# def espn_data():
#     league = League(league_id=2063835714, year=2024, espn_s2='AEAzt%2BFd8NB99LdFla9u20I%2FDL6stmvo%2BdznVl39R6I%2FTgFQKQlfLXv%2BzLQZYOttEd0nsE6XYPJ77zgbdfd74yiO%2BnzvwfwzaBtPmDBR%2FkA2q4E9qKpTdQXm2mr%2FMN3HJ1WXZaRhyJfwGRk2JeAYYL%2FIRuDMUk%2BJiTT8tfN5DrkEpRMpdyaUGZIe7mwAeSF6RmpTxXyDyKeOq4s5Msq9B74OQtEfzbAOfOAExfAGA3FUbS9KMCFJo9rQ%2BDbgtufrYUMDa6N3O%2F%2FbOBuMy2Ie%2FwAnl%2FXO5TEqGtvOHAtW2KpVLg%3D%3D', swid='{E6A7AF31-1BDA-47A5-B5E0-A8692CA83F56}', debug=True)

#     data = league.get_team_data(1)
#     return jsonify(data)

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
def top_players_route():

    def get_top_players(limit=8):
        top_players = session.query(Player).order_by(Player.value.desc()).limit(limit).all()
        return top_players
    
    top_players = get_top_players()
    top_players_data = [
        {"name": player.name, "team": player.team, "value": player.value}
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
