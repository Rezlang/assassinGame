import Overseer
import util


class GameDirectory:
    def __init__(self):
        self.games = {}
        self.db = util.init_firebase()

    def create_game(self, owner_name, owner_id):
        game_id = util.new_id()
        new_game = Overseer(self.db, owner_name, owner_id, game_id)
        self.games[game_id] = new_game

    def join_game(self, game_id, user_name, user_id):
        game = self.games[game_id]
        game.join_game(user_name, user_id)

    def kill(self, game_id, killer_name, killer_id):
        game = self.games[game_id]
        game.kill((killer_name, killer_id))

    def start_game(self, game_id, user_id):
        game = self.games[game_id]
        game.game_start(user_id)
