from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

#this script was used to add the player names into my database

engine = create_engine('mysql+pymysql://root:Ca123456%40@localhost/leGM', echo = False)
Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()

class Player(Base):

    __tablename__ = 'players'

    player_id = Column(Integer, primary_key=True)
    first_name = Column(String(50))
    last_name = Column(String(50))
    headshot_id = Column(Integer)

    def __repr__(self):
        return f"<Player(id={self.id}, first_name={self.first_name}, last_name={self.last_name})>"
    
# Function to update the player's headshot ID
    
def update_player_headshot(first_name, last_name, headshot_id):
    player = session.query(Player).filter_by(first_name=first_name, last_name=last_name).first()
    if player:
        player.headshot_id = headshot_id
        session.commit()
    else:
        print(f"Player not found: {first_name} {last_name}")

# Read and parse the text file
        
with open('playersdone.txt', 'r') as file:
    for line in file:
        name, headshot = line.strip().split(', ')
        first_name, last_name = name.split(' ')
        headshot_id = None if headshot == 'ID Not Found' else int(headshot)
        update_player_headshot(first_name, last_name, headshot_id)

session.close()
