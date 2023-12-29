from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import requests

engine = create_engine('mysql+pymysql://root:Ca123456%40@localhost/leGM', echo = False)
Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()



# we're going to update values for players that have back to back games

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

def main():

    today = teams_today()
    tomorrow = teams_tmrw()
    common_teams = set(today) & set(tomorrow)
    for item in common_teams:
        print(item)

if __name__ == "__main__":
    main()