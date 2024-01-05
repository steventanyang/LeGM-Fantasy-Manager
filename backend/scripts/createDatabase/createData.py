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

    def __repr__(self):
        return f"<Player(id={self.id}, first_name={self.first_name}, last_name={self.last_name})>"


def read_names_from_file(file_path):
    with open(file_path, 'r') as file:
        return [line.strip() for line in file]

names = read_names_from_file('players.txt')

for name in names:
    first, last = name.split(' ') 
    player = Player(first_name=first, last_name=last)
    session.add(player)

session.commit()