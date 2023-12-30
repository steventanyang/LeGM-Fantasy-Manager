from sqlalchemy import create_engine, Column, Integer, String, Numeric
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

response = requests.get('http://127.0.0.1:8000/espn')
data = response.json()

#for team stats
for team in data:
    id = team['id']
    rank = team['currentSimulationResults']['rank']
    wins = team['record']['overall']['wins']
    losses = team['record']['overall']['losses']
    draftrank = team['draftDayProjectedRank']
    gamesback = team['record']['overall']['gamesBack']
    playoffseed = team['playoffSeed']
    playoffper = team['currentSimulationResults']['playoffPct']
    legmscore = team['roster']['appliedStatTotal']
    if team['record']['overall']['streakType'] == "WIN":
        winstreak = team['record']['overall']['streakLength']
    else:
        winstreak = 0

    team = session.query(Teams).filter_by(espnid=id).first()
    team.wins = wins
    team.losses = losses
    team.projectedrank = rank
    team.draftrank = draftrank
    team.legmscore = legmscore
    team.playoffpercentage = playoffper
    team.playoffseed = playoffseed
    team.gamesback = gamesback
    team.winstreak = winstreak
    session.commit()



session.close()

