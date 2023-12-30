from flask import Flask
from flask import jsonify

import requests
import json
from datetime import datetime, timedelta
# from espnapi.basketball import League

from sqlalchemy import create_engine, Column, Integer, String, Boolean, ForeignKey, Numeric
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
    
class Teams(Base):
    __tablename__ = 'teams'
    team_id = Column(Integer, primary_key=True)
    name = Column(String(100))
    currentmatchup = Column(Integer)
    nextmatchup = Column(Integer)
    espnid = Column(Integer)
    wins = Column(Integer)
    losses = Column(Integer)
    projectedrank = Column(Integer)
    draftrank = Column(Integer)
    legmscore = Column(Numeric(4, 1))
    playoffpercentage = Column(Numeric(4, 3))
    playoffseed = Column(Integer)
    gamesback = Column(Integer)
    winstreak = Column(Integer)

    def __repr__(self):
        return f"<Team(name={self.name}, team_id={self.team_id}, currentmatchup={self.currentmatchup}, \
        nextmatchup={self.nextmatchup}, espnid={self.espnid}, wins={self.wins}, losses={self.losses}, \
        projectedrank={self.projectedrank}, draftrank={self.draftrank}, legmscore={self.legmscore}, \
        playoffpercentage={self.playoffpercentage}, playoffseed={self.playoffseed}, gamesback={self.gamesback}, \
        winstreak={self.winstreak})>"

class Player(Base):
    __tablename__ = 'players'

    player_id = Column(Integer, primary_key=True)
    first_name = Column(String(50))
    last_name = Column(String(50))
    headshot_id = Column(Integer)
    name = Column(String(100))  # Assuming the full name can be up to 100 characters
    team = Column(String(50))
    value = Column(Numeric(10, 2))  # Assuming 'value' should be a decimal with precision 10 and scale 2
    rostered = Column(Integer)  # Assuming 'rostered' should be an integer (0 or 1)
    score = Column(Numeric(10, 1))  # Assuming 'score' is a decimal with precision 10 and scale 1
    fantasyteam = Column(Integer, ForeignKey('teams.team_id'))
    status = Column(String(50))  # Assuming 'status' is a string
    posrank = Column(Integer)
    ovrrank = Column(Integer)
    pos = Column(String(10))  # Assuming 'pos' is a string that holds position and won't be longer than 10 characters

    def __repr__(self):
        return f"<Player(player_id={self.player_id}, first_name={self.first_name}, last_name={self.last_name}, \
        headshot_id={self.headshot_id}, name={self.name}, team={self.team}, value={self.value}, \
        rostered={self.rostered}, score={self.score}, fantasyteam={self.fantasyteam}, status={self.status}, \
        posrank={self.posrank}, ovrrank={self.ovrrank}, pos={self.pos})>"
        class Teams(Base):
            __tablename__ = 'teams'
            team_id = Column(Integer, primary_key=True)
            name = Column(String(100))
            currentmatchup = Column(Integer)
            nextmatchup = Column(Integer)
            espnid = Column(Integer)
            wins = Column(Integer)
            losses = Column(Integer)
            projectedrank = Column(Integer)
            draftrank = Column(Integer)
            legmscore = Column(Numeric(4, 1))
            playoffpercentage = Column(Numeric(4, 3))
            playoffseed = Column(Integer)
            gamesback = Column(Integer)
            winstreak = Column(Integer)

            def __repr__(self):
                return f"<Team(name={self.name}, team_id={self.team_id}, currentmatchup={self.currentmatchup}, \
                nextmatchup={self.nextmatchup}, espnid={self.espnid}, wins={self.wins}, losses={self.losses}, \
                projectedrank={self.projectedrank}, draftrank={self.draftrank}, legmscore={self.legmscore}, \
                playoffpercentage={self.playoffpercentage}, playoffseed={self.playoffseed}, gamesback={self.gamesback}, \
                winstreak={self.winstreak})>"

app = Flask(__name__)

#route for users, teams, and players table
@app.route("/users")
def users():
    all_users = session.query(User).all()
    users_data = [{"id": user.id, "espn_user": user.espn_user, "espn_pass": user.espn_pass, "league": user.league, "team": user.team, "record": user.record} for user in all_users]
    return jsonify(users_data)

@app.route("/teams")
def teams():
    all_teams = session.query(Teams).all()
    teams_data = [
        {
            "team_id": team.team_id,
            "name": team.name,
            "currentmatchup": team.currentmatchup,
            "nextmatchup": team.nextmatchup,
            "espnid": team.espnid,
            "wins": team.wins,
            "losses": team.losses,
            "projectedrank": team.projectedrank,
            "draftrank": team.draftrank,
            "legmscore": float(team.legmscore) if team.legmscore is not None else None,
            "playoffpercentage": float(team.playoffpercentage) if team.playoffpercentage is not None else None,
            "playoffseed": team.playoffseed,
            "gamesback": team.gamesback,
            "winstreak": team.winstreak
        }
        for team in all_teams
    ]
    return jsonify(teams_data)

@app.route("/players")
def players():
    all_players = session.query(Player).all()
    player_data = [
        {
            "player_id": player.player_id,
            "first_name": player.first_name,
            "last_name": player.last_name,
            "name": player.name,
            "headshot_id": player.headshot_id,
            "team": player.team,
            "value": float(player.value) if player.value is not None else None,
            "rostered": bool(player.rostered),
            "score": float(player.score) if player.score is not None else None,
            "fantasyteam": player.fantasyteam,
            "status": player.status,
            "posrank": player.posrank,
            "ovrrank": player.ovrrank,
            "pos": player.pos
        }
        for player in all_players
    ]
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

@app.route('/low-posrank')
def low_posrank_players():

    def get_low_rank(limit=5):
        score_players = (
            session.query(Player)
            .filter(Player.fantasyteam == 1)
            .order_by(Player.posrank.desc())
            .limit(limit)
            .all()
        )
        return score_players
    
    top_players = get_low_rank()
    top_players_data = [
        {"name": player.name, "posrank": player.posrank}
        for player in top_players
    ]
    return jsonify(top_players_data)

@app.route('/low-rank')
def low_ovrrank_players():

    def get_low_rank(limit=5):
        score_players = (
            session.query(Player)
            .filter(Player.fantasyteam == 1)
            .order_by(Player.ovrrank.desc())
            .limit(limit)
            .all()
        )
        return score_players
    
    top_players = get_low_rank()
    top_players_data = [
        {"name": player.name, "ovrrank": player.ovrrank}
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
