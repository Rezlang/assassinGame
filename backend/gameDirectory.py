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