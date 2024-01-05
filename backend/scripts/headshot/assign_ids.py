
#this script was used to add the ids into my players.txt

def create_id_mapping(id_file):
    id_mapping = {}
    with open(id_file, 'r') as file:
        for line in file:
            parts = line.strip().split(', ')
            if len(parts) == 2:
                name, player_id = parts
                id_mapping[name] = player_id
    return id_mapping

def assign_ids_to_players(players_file, id_file, output_file):
    id_mapping = create_id_mapping(id_file)

    with open(players_file, 'r') as file:
        players = file.readlines()

    with open(output_file, 'w') as file:
        for player in players:
            player = player.strip()
            player_id = id_mapping.get(player)
            if player_id:
                file.write(f'{player}, {player_id}\n')
            else:
                file.write(f'{player}, ID Not Found\n')

players_file = 'players.txt'
id_file = 'id.txt'
output_file = 'playersdone.txt'

assign_ids_to_players(players_file, id_file, output_file)
