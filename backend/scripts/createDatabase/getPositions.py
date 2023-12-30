from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import json
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
    pos = Column(String(50))

    def __repr__(self):
        return f"<Player(name={self.name}, position={self.pos})>"
    
path = '../../static/players.json'

with open(path, 'r') as file:
    data = json.load(file)
    for player in data:
        fullname = player["fullName"]
        nposition = player["defaultPositionId"]

        if nposition is not None:
            if nposition == 1: nposition = "PG"
            elif nposition == 2: nposition = "SG"
            elif nposition == 3: nposition = "SF"
            elif nposition == 4: nposition = "PF"
            else: nposition = "C"

            db_player = session.query(Player).filter_by(name=fullname).first()
            if db_player:
                db_player.position = nposition  # Corrected from 'position' to 'nposition'
                session.commit()
            else:
                print(f"Player {fullname} not found in the database.")
        else:
            print(f"Position data not available for player {fullname}.")

session.close()