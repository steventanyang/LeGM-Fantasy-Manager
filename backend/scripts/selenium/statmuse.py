from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions as EC

import time


def statmuseSearch(driver, website, search):

    # service = Service(executable_path="./chromedriver")
    # driver = webdriver.Chrome(service=service)
    driver.get(website) #this gets the website

    WebDriverWait(driver, 5).until( #we're waiting until everything loads
	    EC.presence_of_element_located((By.NAME, "question[query]")) 
    )

    input_element = driver.find_element(By.NAME, "question[query]") #finds the search bar
    input_element.send_keys(search + Keys.ENTER) #enters the search


    WebDriverWait(driver, 5).until( #we're waiting until everything loads
	    EC.presence_of_element_located((By.XPATH, "//p[contains(@class, 'my-[1em]') and contains(@class, 'underline') and contains(@class, 'text-team-secondary')]")) 
    )

    element = driver.find_element(By.XPATH, "//p[contains(@class, 'my-[1em]') and contains(@class, 'underline') and contains(@class, 'text-team-secondary')]")

    return element.text

# result = statmuseSearch("https://www.statmuse.com/nba", "most assists this season")
# print(result)
