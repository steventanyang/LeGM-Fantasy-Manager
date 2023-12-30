from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import requests
from datetime import datetime

#this script updates matchups for home dashboard

engine = create_engine('mysql+pymysql://root:Ca123456%40@localhost/leGM', echo = False)
Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()

class Teams(Base):
    __tablename__ = 'teams'
    team_id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100))
    currentmatchup = Column(String(100))
    nextmatchup = Column(String(100))
    espnid = Column(Integer)

    def __repr__(self):
        return f"<Team(name={self.name}, team_id={self.team_id}, currentmatchup={self.currentmatchup}, nextmatchup={self.nextmatchup}, espnid={self.espnid})>"

start_date = datetime(2023, 10, 24)
current_date = datetime.now()
days_difference = (current_date - start_date).days
current_week = (days_difference // 7) + 1

response = requests.get('http://127.0.0.1:8000/schedule')
data = response.json()

#get current matchup
for game in data: 
    if game['matchupPeriodId'] != current_week:
        continue
    if game['away']['teamId'] != 12 and game['home']['teamId'] != 12:
        continue
    else: 
        if game['away']['teamId'] != 12:
            current = game['away']['teamId']
            team = session.query(Teams).filter_by(espnid=12).first()
            teamname = session.query(Teams).filter_by(espnid=current).first()
            team.currentmatchup = teamname.name
            session.commit()
        else:
            current = game['home']['teamId']
            team = session.query(Teams).filter_by(espnid=12).first()
            teamname = session.query(Teams).filter_by(espnid=current).first()
            team.currentmatchup = teamname.name
            session.commit()

#for next matchup
current_week = current_week + 1
for game in data: 
    if game['matchupPeriodId'] != current_week:
        continue
    if game['away']['teamId'] != 12 and game['home']['teamId'] != 12:
        continue
    else: 
        if game['away']['teamId'] != 12:
            current = game['away']['teamId']
            team = session.query(Teams).filter_by(espnid=12).first()
            teamname = session.query(Teams).filter_by(espnid=current).first()
            team.nextmatchup = teamname.name
            session.commit()
        else:
            current = game['home']['teamId']
            team = session.query(Teams).filter_by(espnid=12).first()
            teamname = session.query(Teams).filter_by(espnid=current).first()
            team.nextmatchup = teamname.name
            session.commit()








session.close()

