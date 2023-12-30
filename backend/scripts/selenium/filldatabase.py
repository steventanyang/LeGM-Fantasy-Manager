from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions as EC

import time

from sqlalchemy import create_engine, Column, Integer, String, Boolean
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
    player_id = Column(Integer, primary_key=True)
    name = Column(String(50))
    rostered = Column(Boolean)

    def __repr__(self):
        return f"<Player(name={self.name}, rostered={self.rostered})>"

service = Service(executable_path="./chromedriver")
driver = webdriver.Chrome(service=service)

def pullEspnLeague(website, email, password, teamName, team):

    #test
    
    driver.get(website)
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

    time.sleep(30)

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



    for player in players: 
        player_name = player.get_attribute('title')
        print(player_name)

        db_player = session.query(Player).filter_by(name=player_name).first()

        if db_player:
            db_player.rostered = True
            session.commit()
        else:
            print(f"Player {player_name} not found in database.")

    time.sleep(10)
    driver.quit()

    return

pullEspnLeague('https://www.espn.com/fantasy/', 'stevenwatchesyou88@gmail.com', 'blackhawks158819', 'Yang', 'milwaukee brICKS')


# idea we can expor this function. Once we have all the team names in the database we can iterate through them and run this once,
# getting all the players from all the teams and just updating "rostered" again. Wiping it clean first. 