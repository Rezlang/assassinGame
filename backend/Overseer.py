import random
import threading
import uuid
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


class Overseer:
    def __init__(self, db, owner_name, owner_id, game_id):
        print("Initializing GameOverseer")
        self.db = db
        self.game_id = game_id
        self.owner_id = owner_id
        self.data = self.firebase_new_game(self.game_id, owner_id)
        # Players are now lists: [name, id]
        self.alive_players = []
        self.round_time_minutes = self.data["game_settings"]["round_time_minutes"]
        self.shuffle_targets = self.data["game_settings"]["shuffle_targets"]
        self.targets = None
        self.current_round = 0
        self.join_game(owner_name, owner_id)

    def firebase_new_game(self, game_id, owner_id, round_time_minutes=0.5, shuffle_targets=False, kill_radius_feet=50, game_status="waiting_for_players"):
        print("Creating a new game in Firestore")
        doc_ref = self.db.collection('games').document(game_id)
        data = {
            "game_settings": {
                "id": game_id,
                "owner_id": owner_id,
                "round_time_minutes": round_time_minutes,
                "shuffle_targets": shuffle_targets,
                "kill_radius_feet": kill_radius_feet,
                "game_status": game_status
            },
            "all_players": [],
            "alive_players": [],
            "rounds": {}
        }
        doc_ref.set(data)
        return data

    def join_game(self, player_name, player_id):
        print(f"{player_name} is joining the game")
        new_player = {"name": player_name, "id": player_id}
        self.alive_players.append(new_player)
        # Update Firestore
        doc_ref = self.db.collection('games').document(self.game_id)
        doc_ref.update({
            "all_players": firestore.ArrayUnion([new_player]),
            "alive_players": firestore.ArrayUnion([new_player])
        })
        print(f"{player_name} joined the game")

    def load_game_data(self):
        print("Loading game data from Firestore")
        doc_ref = self.db.collection('games').document(self.game_id)
        doc = doc_ref.get()
        if doc.exists:
            self.data = doc.to_dict()
            self.alive_players = [tuple(x) for x in self.data["alive_players"]]
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
        # Update game status in Firestore
        doc_ref = self.db.collection('games').document(self.game_id)
        doc_ref.update({
            "game_settings.game_status": "in_progress"
        })
        self.setup_round()

    def setup_round(self):
        print("Setting up a new round")
        if len(self.alive_players) == 1:
            # Print only the name
            print(f"{self.alive_players[0][0]} wins!")
            exit()
        self.current_round += 1
        self.assign_targets()
        self.update_round_in_firestore(self.current_round)
        self.start_round_timer(self.round_time_minutes)
        print(f"Round {self.current_round} starting for {
              self.round_time_minutes} minutes")

    def assign_targets(self):
        print("Assigning targets to players")
        # Fetch the latest data from Firestore
        doc_ref = self.db.collection('games').document(self.game_id)
        doc = doc_ref.get()
        if doc.exists:
            self.alive_players = doc.to_dict().get('alive_players', [])
            print(f"Loaded {len(self.alive_players)
                            } alive players from Firestore.")
        else:
            print("Game data not found in Firestore.")
            return

        if self.shuffle_targets:
            random.shuffle(self.alive_players)

        # Assign targets as a dictionary where each player's id is assigned to another player's id
        targets = {
            player['id']: self.alive_players[(
                i + 1) % len(self.alive_players)]['id']
            for i, player in enumerate(self.alive_players)
        }

        self.targets = targets
        print(f"Targets assigned: {targets}")

    def update_round_in_firestore(self, round_number):
        print(f"Updating round {round_number} in Firestore")
        doc_ref = self.db.collection('games').document(self.game_id)
        doc_ref.update({
            f"rounds.{round_number}": self.targets
        })

    def start_round_timer(self, minutes):
        print("Starting round timer")
        timer = threading.Timer(minutes * 60, self.end_round)
        timer.start()
        return timer

    def kill(self, killer_name):
        if not self.targets:
            print("No targets assigned yet")
            return
        print(f"Processing kill by {killer_name}")
        killer = next((player for player in self.alive_players if player[0].lower(
        ) == killer_name.lower()), None)
        if killer:
            print(f"Killer found: {killer}")
            # Get target by using tuple (name, id)
            killed = self.targets.get(tuple(killer))
            print(f"Target to be killed: {killed}")
            if killed and killed in self.alive_players:
                print("Both killer and target are alive")
                self.alive_players.remove(killed)
                # Update Firestore
                doc_ref = self.db.collection('games').document(self.game_id)
                doc_ref.update({
                    "alive_players": firestore.ArrayRemove([list(killed)])
                })
                # Print names for readability
                print(f"{killed[0]} was killed by {killer[0]}")
            else:
                print("Target is already dead or does not exist")
        else:
            print("Killer not found among alive players")

    def end_round(self):
        print("Ending the current round")
        to_remove = []
        for killer, target in self.targets.items():
            # Check if both killer and target are still alive
            if target in self.alive_players and killer in self.alive_players:
                to_remove.append(killer)

        if len(to_remove) == len(self.alive_players):
            # All remaining players win
            winners = [player[0] for player in self.alive_players]
            print(f"{winners} win!")
        else:
            for player in to_remove:
                self.alive_players.remove(player)
                # Update Firestore
                doc_ref = self.db.collection('games').document(self.game_id)
                doc_ref.update({
                    "alive_players": firestore.ArrayRemove([list(player)])
                })
        self.setup_round()


cred = credentials.Certificate(
    "./assasingame-a6626-firebase-adminsdk-qhtmq-40eeea4de0.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


owner_id = "123f4rgnjtibo3rjel"
owner_name = "josh"
overseer = Overseer(db, owner_name, owner_id)
overseer.join_game("tim", "1234")
overseer.join_game("rahul", "12345")
overseer.game_start(owner_id)

kill1 = input("first kill\n").lower()
if kill1 != "":
    overseer.kill(kill1)
else:
    print("no kill")
kill2 = input("second kill\n").lower()
if kill2 != "":
    overseer.kill(kill2)
else:
    print("no kill")


# input("new game\n")
# game_id = "0"
# new_game(game_id, "1")
# input("add_player_to_game 2\n")
# add_player_to_game(game_id, "2")
# input("add_player_to_game 3\n")
# add_player_to_game(game_id, "3")
# input("add_round 0\n")
# add_round(game_id, "0", {"1": "2", "2": "3", "3": "1"})
# input("add_round 1\n")
# add_round(game_id, "1", {"1": "2", "2": "1"})
