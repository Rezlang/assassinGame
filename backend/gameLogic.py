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
