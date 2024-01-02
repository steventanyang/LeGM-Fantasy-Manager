from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import requests

#this script updates the database values for players who have back to back games

engine = create_engine('mysql+pymysql://root:Ca123456%40@localhost/leGM', echo = False)
Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()

class Player(Base):

    __tablename__ = 'players'
    player_id = Column(Integer, primary_key=True)
    name = Column(String(50))
    team = Column(String(50))
    value = Column(Integer)

    def __repr__(self):
        return f"<Player(name={self.name}, team={self.team}, value={self.value})>"

def teams_today():
    url = 'http://127.0.0.1:8000/gamestdy'
    response = requests.get(url)

    if response.status_code == 200:
        games_data = response.json()

        # Lists to store home and away teams
        teams_today = []

        # Iterate through each game object
        for game in games_data:
            home_team = game.get("HomeTeam")
            away_team = game.get("AwayTeam")

            if home_team is not None:
                teams_today.append(home_team)

            if away_team is not None:
                teams_today.append(away_team)

        return teams_today
    
    else:
        print(f"Failed to fetch data: Status Code {response.status_code}")
        return None

def teams_tmrw():
    url = 'http://127.0.0.1:8000/gamestmrw'
    response = requests.get(url)

    if response.status_code == 200:
        games_data = response.json()

        # Lists to store home and away teams
        teams_tmrw = []

        # Iterate through each game object
        for game in games_data:
            home_team = game.get("HomeTeam")
            away_team = game.get("AwayTeam")

            if home_team is not None:
                teams_tmrw.append(home_team)

            if away_team is not None:
                teams_tmrw.append(away_team)

        return teams_tmrw
    
    else:
        print(f"Failed to fetch data: Status Code {response.status_code}")
        return None

def fetch_player_fantasy_points(api_url):
    response = requests.get(api_url)
    if response.status_code == 200:
        return {player["Name"]: player["FantasyPointsFantasyDraft"] for player in response.json()}
    else:
        print(f"Failed to fetch data: Status Code {response.status_code}")
        return {}
    
def update_player_values(common_teams, today_points, tomorrow_points):
    for team in common_teams:
        players_in_team = session.query(Player).filter(Player.team == team).all()
        for player in players_in_team:
            today_score = today_points.get(player.name, 0)
            tomorrow_score = tomorrow_points.get(player.name, 0)
            player.value = today_score + tomorrow_score

    session.commit()

def reset_player_values():
    session.query(Player).update({Player.value: None})
    session.commit()

#this function is used by the /toppicks to get players with the highest values
def get_top_players(limit=8):
    top_players = session.query(Player).order_by(Player.value.desc()).limit(limit).all()
    return top_players

def main():
    reset_player_values() 

    today = teams_today()
    tomorrow = teams_tmrw()
    common_teams = set(today) & set(tomorrow)
    for team in common_teams:
        print(team)

    uncommon_teams = set(today) | set(tomorrow)
    for team in uncommon_teams:
        print(team)

    today_api = 'http://127.0.0.1:8000/today'
    tomorrow_api = 'http://127.0.0.1:8000/tomorrow'
    
    today_points = fetch_player_fantasy_points(today_api)
    tomorrow_points = fetch_player_fantasy_points(tomorrow_api)

    # update_player_values(uncommon_teams, today_points, tomorrow_points)
    update_player_values(common_teams, today_points, tomorrow_points)

if __name__ == "__main__":
    main()