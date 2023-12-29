import requests
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

#adding corresponding team to each player

engine = create_engine('mysql+pymysql://root:Ca123456%40@localhost/leGM', echo = False)
Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()

class Player(Base):

    __tablename__ = 'players'
    player_id = Column(Integer, primary_key=True)
    name = Column(String(50))
    team = Column(String(50))

    def __repr__(self):
        return f"<Player(name={self.name}, team={self.team})>"
    
def update_player_teams():
    url = 'http://127.0.0.1:8000/stats'
    response = requests.get(url)
    if response.status_code == 200:
        players_data = response.json()
        for player_data in players_data:
            player_name = player_data.get("Name")
            team_name = player_data.get("Team")

            player = session.query(Player).filter(Player.name == player_name).first()
            
            if player:
                player.team = team_name
                session.commit()
    else:
        print(f"Failed to fetch data: Status Code {response.status_code}")

# Main function to run the update
def main():
    update_player_teams()

if __name__ == "__main__":
    main()