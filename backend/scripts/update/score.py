from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import requests
from decimal import Decimal

#this script updates the database values for players who have back to back games

engine = create_engine('mysql+pymysql://root:Ca123456%40@localhost/leGM', echo = False)
Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()

class Player(Base):

    __tablename__ = 'players'
    player_id = Column(Integer, primary_key=True)
    name = Column(String(50))
    score = Column(Integer)

    def __repr__(self):
        return f"<Player(name={self.name}, score={self.score})>"
    
response = requests.get('http://127.0.0.1:8000/preseason')
data = response.json()

for player_data in data:
    player_name = player_data['Name']
    fantasy_points = player_data['FantasyPoints']
    games = player_data['Games']

    player = session.query(Player).filter_by(name=player_name).first()

    if player:
        player.score = fantasy_points / games
        session.commit()
    else:
        print(f"Player {player_name} not found in the database.")


response = requests.get('http://127.0.0.1:8000/stats')
newdata = response.json()

for player_data in newdata:
    try:
        player_name = player_data['Name']
        fantasy_points = Decimal(player_data['FantasyPoints'])
        games = Decimal(player_data['Games'])

        if games: 
            new_score = fantasy_points / games

            player = session.query(Player).filter_by(name=player_name).first()
            if player:
                score_difference = new_score - player.score
                player.score = score_difference
                session.commit()
            else:
                print(f"Player {player_name} not found in the database.")
        else:
            print(f"Skipping {player_name} due to zero games.")

    except Exception as e:
        print(f"Error processing player {player_name}: {e}")

session.close()