import pandas as pd

#this script was used to parse the player names and nbaid's from a csv file

df = pd.read_csv('NBA_Player_IDs.csv')
column1_data = df['BBRefName']
column2_data = df['NBAID']

with open('ids.txt', 'w') as file:
    for item1, item2 in zip(column1_data, column2_data):
        item2_int = int(item2) if pd.notna(item2) else item2
        file.write(f'{item1}, {item2}\n')