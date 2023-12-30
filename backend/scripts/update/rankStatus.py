from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import requests
from decimal import Decimal

#this script updates player status using our espn api

engine = create_engine('mysql+pymysql://root:Ca123456%40@localhost/leGM', echo = False)
Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()

class Player(Base):

    __tablename__ = 'players'
    player_id = Column(Integer, primary_key=True)
    name = Column(String(50))
    posrank = Column(Integer)
    ovrrank = Column(Integer)
    status = Column(Integer)

    def __repr__(self):
        return f"<Player(name={self.name}, posrank={self.posrank}, ovrrank={self.ovrrank})>"
    
response = requests.get('http://127.0.0.1:8000/espn')
data = response.json()

for user in data:

    user_name = user['name']
    proj_rank = user['currentProjectedRank']
    logo = user['logo']

    if "roster" in user and "entries" in user["roster"]:
        for entry in user["roster"]["entries"]:
            if "playerPoolEntry" in entry and "player" in entry["playerPoolEntry"]:
                player = entry["playerPoolEntry"]["player"]

                fullname = player["fullName"]
                newstatus = player["injuryStatus"]
                ratings = entry["playerPoolEntry"]["ratings"]
                posrank = ratings["0"]["positionalRanking"]
                totalRanking = ratings["0"]["totalRanking"]

                db_player = session.query(Player).filter_by(name=fullname).first()
                if db_player:
                    db_player.status = newstatus

                    session.commit()
                else:
                    print(f"Player {db_player} not found in the database.")

session.close()
    


