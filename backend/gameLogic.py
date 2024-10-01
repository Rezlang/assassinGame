import json
import random
import threading


class GameOverseer:

    def __init__(self, jsonFile):
        self.jsonFile = jsonFile
        self.data = self.load_json(self.jsonFile)
        self.alive_players = self.data["all_players"]
        self.round_time_minutes = self.data["game_settings"]["round_time_minutes"]
        self.shuffle_targets = self.data["game_settings"]["shuffle_targets"]
        self.targets = None
        self.current_round = 0
        self.setup_round()

    def setup_round(self):
        if len(self.alive_players) == 1:
            print("{} wins!".format(self.alive_players[0]))
            return self.alive_players[0]
        self.current_round += 1
        self.assign_targets()
        self.json_round_update(self.current_round)
        self.start_round_timer(self.round_time_minutes)
        print("Round {} starting for {} minutes".format(
            self.current_round, self.round_time_minutes))

    def end_round(self):
        to_remove = []
        for pair in self.targets.items():
            if pair[1] in self.alive_players and pair[0] in self.alive_players:
                to_remove.append(pair[0])
        if len(to_remove) == len(self.alive_players):
            print("{} win!".format(self.alive_players))
        else:
            for player in to_remove:
                self.alive_players.remove(player)
        self.setup_round

    def start_round_timer(self, minutes):
        timer = threading.Timer(minutes * 60, self.end_round)
        timer.start()
        return timer

    def load_json(self, file_path):
        with open(file_path, 'r') as json_file:
            data = json.load(json_file)
        return data

    def json_round_update(self, round):
        self.data = self.load_json(self.jsonFile)
        if "rounds" not in self.data:
            self.data["rounds"] = {}
        self.data["rounds"][round] = self.targets
        with open(self.jsonFile, 'w') as file:
            json.dump(self.data, file, indent=4)

    def assign_targets(self):
        if self.shuffle_targets:
            random.shuffle(self.alive_players)
        targets = {self.alive_players[i]: self.alive_players[(
            i + 1) % len(self.alive_players)] for i in range(len(self.alive_players))}
        self.targets = targets
        print(targets)

    def kill(self, killer):
        killed = self.targets[killer]
        if killed in self.alive_players:
            self.alive_players.remove(killed)
            print("{} killed by {}".format(killed, killer))


if __name__ == "__main__":
    Overseer = GameOverseer("test.json")

    kill1 = input("first kill\n").lower()
    Overseer.kill(kill1)
    kill2 = input("second kill\n").lower()
    Overseer.kill(kill2)
