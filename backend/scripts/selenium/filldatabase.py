from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions as EC

import time

from sqlalchemy import create_engine, Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import requests

#I used this to set the inital "rostered" boolean in my database

engine = create_engine('mysql+pymysql://root:Ca123456%40@localhost/leGM', echo = False)
Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()

class Player(Base):

    __tablename__ = 'players'
    player_id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50))
    rostered = Column(Boolean)
    fantasyteam = Column(Integer, ForeignKey('teams.team_id'))

    def __repr__(self):
        return f"<Player(name={self.name}, rostered={self.rostered})>"

class Team(Base):
    __tablename__ = 'teams'
    team_id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100))

    def __repr__(self):
        return f"<Team(name={self.name})>"


service = Service(executable_path="./chromedriver")
driver = webdriver.Chrome(service=service)

def pullEspnLeague(website, email, password, teamName, team):

    #test
    
    driver.get(website)
    time.sleep(3)

    WebDriverWait(driver, 5).until( #we're waiting until everything loads
	    EC.presence_of_element_located((By.LINK_TEXT, "Log In")) 
    )
    link = driver.find_element(By.LINK_TEXT, "Log In")
    link.click()

    WebDriverWait(driver, 5).until( #we're waiting until everything loads
	    EC.presence_of_element_located((By.LINK_TEXT, "SIGN UP")) 
    )
    link = driver.find_element(By.LINK_TEXT, "SIGN UP")
    link.click()

    driver.implicitly_wait(5)

    iframe = 'oneid-iframe'
    driver.switch_to.frame(iframe)


    #entering username

    WebDriverWait(driver, 10).until( 
	    EC.presence_of_element_located((By.CSS_SELECTOR, 'input[placeholder="Email"]')) 
    )
    driver.find_element(By.CSS_SELECTOR, 'input[placeholder="Email"]').click()
    ActionChains(driver).send_keys(email).perform()

    WebDriverWait(driver, 10).until( 
	    EC.presence_of_element_located((By.ID, 'BtnSubmit')) 
    )
    submit = driver.find_element(By.ID, 'BtnSubmit')
    submit.click()


    #entering password

    WebDriverWait(driver, 50).until( 
	    EC.presence_of_element_located((By.CSS_SELECTOR, 'input[placeholder="Password"]')) 
    )
    driver.find_element(By.CSS_SELECTOR, 'input[placeholder="Password"]').click()
    ActionChains(driver).send_keys(password).perform()


    WebDriverWait(driver, 50).until( 
	    EC.presence_of_element_located((By.ID, 'BtnSubmit')) 
    )
    submit = driver.find_element(By.ID, 'BtnSubmit').click()

    time.sleep(20)

    #scraping players on team

    WebDriverWait(driver, 5).until(
	    EC.presence_of_element_located((By.LINK_TEXT, 'Fantasy')) 
    )
    link = driver.find_element(By.LINK_TEXT, 'Fantasy').click()

    WebDriverWait(driver, 5).until( #click on Yang to enter league
	    EC.presence_of_element_located((By.LINK_TEXT, teamName)) 
    )
    link = driver.find_element(By.LINK_TEXT, teamName).click()


    WebDriverWait(driver, 5).until( #click on league name
	    EC.presence_of_element_located((By.LINK_TEXT, 'League')) 
    )
    link = driver.find_element(By.LINK_TEXT, 'League').click()

    WebDriverWait(driver, 5).until( #click on team name
	    EC.presence_of_element_located((By.LINK_TEXT, team)) 
    )
    link = driver.find_element(By.LINK_TEXT, team).click()


    WebDriverWait(driver, 5).until( #we're waiting until everything loads
	    EC.presence_of_element_located((By.CLASS_NAME, "player-column__athlete"))
    )
    players = driver.find_elements(By.CLASS_NAME, "player-column__athlete")

    db_team = session.query(Team).filter_by(name=team).first()
    if not db_team:
        db_team = Team(name=team)
        session.add(db_team)
        session.commit()

    for player in players: 
        player_name = player.get_attribute('title')

        if player_name.endswith(' Jr.') or player_name.endswith(' III'):
            player_name = player_name[:-4].strip()

        print(player_name)
        db_player = session.query(Player).filter_by(name=player_name).first()

        if db_player:
            db_player.fantasyteam = db_team.team_id
            db_player.rostered = True
            session.commit()
        else:
            print(f"Player {player_name} not found in database.")

    time.sleep(5)
    driver.quit()

    return

username = 'stevenwatchesyou88@gmail.com'
password = 'samplepassword'

pullEspnLeague('https://www.espn.com/fantasy/', username, password, 'Yang', 'josh giggity-giggity')


# idea we can expor this function. Once we have all the team names in the database we can iterate through them and run this once,
# getting all the players from all the teams and just updating "rostered" again. Wiping it clean first. 


# right now team record is in users table we need to fill that in our teams table

# team id's 
# Yang 1
# josh giggity-giggity 2
# Team agustin 3
# Luu Dynasty 4
# Team Reyes 5
# Team Hay 6
# JordanFool 7
# Team Efunbajo 8
# Team Darku 9
# milwaukee brICKS 10
