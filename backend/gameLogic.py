import json
import random
import threading
import uuid
import shutil


class GameOverseer:

    def __init__(self):
        print("initializer")
        self.game_key = None
        self.data = self.load_json(True)
        # Players are now lists: [name, id]
        self.alive_players = [tuple(x) for x in self.data["all_players"]]
        self.round_time_minutes = self.data["game_settings"]["round_time_minutes"]
        self.shuffle_targets = self.data["game_settings"]["shuffle_targets"]
        self.targets = None
        self.current_round = 0

    def setup_round(self):
        print("setup_round")
        if len(self.alive_players) == 1:
            # Print only the name
            print("{} wins!".format(self.alive_players[0][0]))
            return self.alive_players[0]
        self.current_round += 1
        self.assign_targets()
        self.json_round_update(self.current_round)
        self.start_round_timer(self.round_time_minutes)
        print("Round {} starting for {} minutes".format(
            self.current_round, self.round_time_minutes))

    def end_round(self):
        print("end_round")
        to_remove = []
        for pair in self.targets.items():
            killer, target = pair
            # Check if both killer and target are still alive
            if target in self.alive_players and killer in self.alive_players:
                to_remove.append(killer)

        if len(to_remove) == len(self.alive_players):
            # Print only names
            print("{} win!".format([player[0]
                  for player in self.alive_players]))
        else:
            for player in to_remove:
                self.alive_players.remove(player)
        self.setup_round()

    def assign_targets(self):
        print("assign_targets")
        if self.shuffle_targets:
            random.shuffle(self.alive_players)
        # Assign targets as a dictionary where each player (tuple) is assigned a target
        targets = {tuple(self.alive_players[i]): tuple(self.alive_players[(i + 1) % len(self.alive_players)])
                   for i in range(len(self.alive_players))}
        self.targets = targets
        # Print names for readability
        print("assign_targets: {}".format(
            targets))

    def kill(self, killer_name):
        if not self.targets:
            return
        print("kill")
        killer = next((player for player in self.alive_players if player[0].lower(
        ) == killer_name.lower()), None)
        if killer:
            print("killer alive: {}".format(killer))
            # Get target by using tuple (name, id)
            killed = self.targets.get(tuple(killer))
            print("killed: {}".format(killed))
            if killed and killed in self.alive_players:
                print("both alive")
                self.alive_players.remove(killed)
                # Print names for readability
                print("{} killed by {}".format(killed[0], killer[0]))

    def load_json(self, new_game=False):
        print("load_json")
        if new_game:
            self.game_key = str(uuid.uuid4())
            new_file_path = f"{self.game_key}.json"
            shutil.copy("template.json", new_file_path)

        with open(f"{self.game_key}.json", 'r') as json_file:
            data = json.load(json_file)
        return data

    def json_round_update(self, round):
        print("json_round_update")
        self.data = self.load_json()
        if "rounds" not in self.data:
            self.data["rounds"] = {}
        self.data["rounds"][round] = {str(k): str(
            v) for k, v in self.targets.items()}  # Store targets as strings
        with open(f"{self.game_key}.json", 'w') as file:
            json.dump(self.data, file, indent=4)

    def start_round_timer(self, minutes):
        print("start_round_timer")
        timer = threading.Timer(minutes * 60, self.end_round)
        timer.start()
        return timer

    def game_init(self, owner):
        print("game_init")
        self.data = self.load_json()
        self.data["game_settings"]["game_owner"] = owner
        self.data["game_settings"]["game_status"] = "waiting_for_players"
        with open(f"{self.game_key}.json", 'w') as file:
            json.dump(self.data, file, indent=4)

    def game_start(self, sender):
        print("game_start")
        self.data = self.load_json()
        if self.data["game_settings"]["game_owner"] != sender:
            print("not owner, cannot start game")
            return
        self.data["game_settings"]["game_status"] = "in_progress"
        self.setup_round()

    def join_game(self, player_name, player_id):
        print("join_game")
        new_player = [player_name, player_id]
        self.alive_players.append(new_player)
        print(f"{player_name} joined the game")


def init(owner):
    print("init")
    Overseer = GameOverseer()
    Overseer.game_init(owner)
    return Overseer


if __name__ == "__main__":
    owner = "123f4rgnjtibo3rjel"
    Overseer = init(owner)
    Overseer.game_start(owner)

    kill1 = input("first kill\n").lower()
    if kill1 != "":
        Overseer.kill(kill1)
    else:
        print("no kill")
    kill2 = input("second kill\n").lower()
    if kill2 != "":
        Overseer.kill(kill2)
    else:
        print("no kill")
