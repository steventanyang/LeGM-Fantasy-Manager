import pandas as pd

#this script was used to parse the player names from a csv file into a text file

df = pd.read_csv('NBA-historical-fantasy-stats.csv')
column_data = df['Unnamed: 1']
with open('players.txt', 'w') as file:
    for item in column_data:
        file.write(str(item) + '\n')