# Overseer.py

import random
import threading
import uuid
import firebase  # Import the firebase module


class Overseer:
    def __init__(self, owner_name, owner_id, game_id):
        print("Initializing GameOverseer")
        self.game_id = game_id
        self.owner_id = owner_id
        self.data = firebase.new_game(self.game_id, owner_id)
        self.alive_players = []
        self.round_time_minutes = self.data["game_settings"]["round_time_minutes"]
        self.shuffle_targets = self.data["game_settings"]["shuffle_targets"]
        self.targets = None
        self.current_round = 0
        self.join_game(owner_name, owner_id)

    def join_game(self, player_name, player_id):
        print(f"{player_name} is joining the game")
        new_player = {"name": player_name, "id": player_id}
        self.alive_players.append(new_player)
        firebase.add_player_to_game(self.game_id, new_player)
        # print(f"{player_name} joined the game")
        return f"{player_name} joined the game"

    def load_game_data(self):
        print("Loading game data from Firestore")
        self.data = firebase.get_game_data(self.game_id)
        if self.data:
            self.alive_players = self.data.get("alive_players", [])
            self.round_time_minutes = self.data["game_settings"]["round_time_minutes"]
            self.shuffle_targets = self.data["game_settings"]["shuffle_targets"]
        else:
            print("Game data not found in Firestore.")

    def game_start(self, sender_id):
        print("Starting the game")
        self.load_game_data()
        if self.data["game_settings"]["owner_id"] != sender_id:
            print("Not owner, cannot start game")
            return
        firebase.update_game_status(self.game_id, "in_progress")
        self.setup_round()
        return "game started"

    def setup_round(self):
        print("Setting up a new round")
        if len(self.alive_players) == 1:
            winner = self.alive_players[0]
            self.winner(winner["name"], winner["id"])
            exit()
        self.current_round += 1
        self.assign_targets()
        firebase.update_round(self.game_id, self.current_round, self.targets)
        self.start_round_timer(self.round_time_minutes)
        print(f"Round {self.current_round} starting for" +
              f"{self.round_time_minutes} minutes")

    def winner(self, winner_name, winner_id):
        winner_data = {
            "name": winner_name,
            "id": winner_id
        }
        firebase.update_winner(self.game_id, winner_data)
        print(f"Winner {winner_name} with ID " +
              f"{winner_id} has been saved to Firestore and game marked as completed.")

    def assign_targets(self):
        print("Assigning targets to players")
        self.alive_players = firebase.get_alive_players(self.game_id)
        print(f"Loaded {len(self.alive_players)} " +
              f"alive players from Firestore.")

        if self.shuffle_targets:
            random.shuffle(self.alive_players)

        targets = {
            player['id']: self.alive_players[(
                i + 1) % len(self.alive_players)]['id']
            for i, player in enumerate(self.alive_players)
        }

        self.targets = targets
        print(f"Targets assigned: {targets}")

    def start_round_timer(self, minutes):
        print("Starting round timer")
        timer = threading.Timer(minutes * 60, self.end_round)
        timer.start()
        return timer

    def kill(self, killer_name, killer_id):
        if not self.targets:
            # print("No targets assigned yet")
            return "No targets assigned yet"

        killer = next((player for player in self.alive_players if player["name"].lower(
        ) == killer_name.lower() and player["id"].lower() == killer_id.lower()), None)

        if killer:
            target_id = self.targets.get(killer_id)
            if not target_id:
                # print(f"No target assigned to {killer_name}")
                return f"No target assigned to {killer_name}"

            target = next(
                (player for player in self.alive_players if player["id"] == target_id), None)

            if target:

                self.alive_players.remove(target)
                firebase.remove_alive_player(self.game_id, target)

                print(f"{target['name']} was killed by {killer_name}")
                return f"{target['name']} was killed by {killer_name}"
            else:
                # print(
                #     f"Target {target_id} is already dead or not found among alive players.")
                return f"Target {target_id} is already dead or not found among alive players."
        else:
            # print(f"Killer {killer_name} not found among alive players")
            return f"Killer {killer_name} not found among alive players"

    def end_round(self):
        print("Ending the current round")
        to_remove = []
        for killer_id, target_id in self.targets.items():
            killer = next(
                (player for player in self.alive_players if player["id"] == killer_id), None)
            target = next(
                (player for player in self.alive_players if player["id"] == target_id), None)
            if target and killer:
                to_remove.append(killer)

        if len(to_remove) == len(self.alive_players):
            winners = [player['name'] for player in self.alive_players]
            print(f"{winners} win!")
        else:
            for player in to_remove:
                self.alive_players.remove(player)
                firebase.remove_alive_player(self.game_id, player)
        self.setup_round()


# # Initialize the game
# owner_id = "123f4rgnjtibo3rjel"
# owner_name = "josh"
# game_id = "game123"
# overseer = Overseer(owner_name, owner_id, game_id)
# overseer.join_game("tim", "1234")
# overseer.join_game("rahul", "12345")
# overseer.game_start(owner_id)

# kill1 = input("first kill\n").lower()
# if kill1 != "":
#     overseer.kill(kill1)
# else:
#     print("no kill")
# kill2 = input("second kill\n").lower()
# if kill2 != "":
#     overseer.kill(kill2)
# else:
#     print("no kill")
