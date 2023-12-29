from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions as EC

import time

service = Service(executable_path="./chromedriver")
driver = webdriver.Chrome(service=service)

def pullEspnLeague(website, email, password, teamName):


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

    WebDriverWait(driver, 10).until( 
	    EC.presence_of_element_located((By.CSS_SELECTOR, 'input[placeholder="Password"]')) 
    )
    driver.find_element(By.CSS_SELECTOR, 'input[placeholder="Password"]').click()
    ActionChains(driver).send_keys(password).perform()

    WebDriverWait(driver, 10).until( 
	    EC.presence_of_element_located((By.ID, 'BtnSubmit')) 
    )
    submit = driver.find_element(By.ID, 'BtnSubmit').click()


    #scraping players on team

    WebDriverWait(driver, 5).until( #we're waiting until everything loads
	    EC.presence_of_element_located((By.LINK_TEXT, 'Fantasy')) 
    )
    link = driver.find_element(By.LINK_TEXT, 'Fantasy').click()

    WebDriverWait(driver, 5).until( #we're waiting until everything loads
	    EC.presence_of_element_located((By.LINK_TEXT, teamName)) 
    )
    link = driver.find_element(By.LINK_TEXT, teamName).click()

    WebDriverWait(driver, 5).until( #we're waiting until everything loads
	    EC.presence_of_element_located((By.CLASS_NAME, "player-column__athlete"))
    )
    players = driver.find_elements(By.CLASS_NAME, "player-column__athlete")

    for player in players: 
        print(player.get_attribute('title'))


    time.sleep(10)
    driver.quit()

    return

pullEspnLeague('https://www.espn.com/fantasy/', 'stevenwatchesyou88@gmail.com', 'blackhawks158819', 'Yang')