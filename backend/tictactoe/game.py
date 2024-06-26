
# Created board, now need to create players X and O, who can insert into board
# If players meet certain patterns, they win.
from board import Board

class Game():
    def __init__(self):
        self.player_one = "X"
        self.player_two = "O"
        self.board = Board() 

    def intro(self):
        # Create players 1 and 2
        print('Welcome to tic tac toe! Player 1 will play with X and player 2 will play with 0')

    def play(self):  
        # Instance variable of board, which is initialized in the __init__ method of the Game class
        # Entire play method switches between players one and two, and checks that the space is empty and for a win or a tie
        for i in range(9):
            self.board.printBoard()
            # If i, which represents each turn, returns a modulo 0f 0 i.e an even number of turns, it is player ones turn. Remember than sequences run from 0 to 8.
            if i % 2 == 0:
                player_current = self.player_one
            else:
                player_current = self.player_two

            print (f"Player {player_current}, it's your turn. Enter a position (1 to 9): ")
            move = input()
            # This block checks if the position that the player chooses is empty
            if self.validate_move(move, player_current):
                #  Sets the position specified by move on the game board to the current player's symbol (player_current).
                self.board.grid[move] = player_current
            else:
                print('Oops! This space is taken or the input is invalid. Try again.')
                continue

            # Checks for a winner
            if self.check_winner(player_current):
                self.board.printBoard()
                print(f"Player {player_current} is the winner!")
                return
            
            # Checks for a tie
            if self.check_tie():
                self.board.printBoard()
                print("It's a tie!")
                return
            
    def validate_move(self, move, player_current):
        if move in self.board.grid and self.board.grid[move] == ' ':
            return True
        else:
            return False

    def check_winner(self, player_current):
        win_combinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]]
        # This line initiates a loop that iterates through each combo in the win_combinations list. Each combo is a 
        # list of positions that represents a possible winning combination.
        for combo in win_combinations:
            # This line checks if all positions in the current combo have been filled with the symbol of the current player (player_current)
            # [str(pos)] denotes a list or dictionary access. Here, it's used to access a 
            # value in a dictionary using a string as the key. pos is a varialbe representing a position on the board. 
            # Need to convert position, which is an int, into a string
            if all(self.board.grid[str(position)] == player_current for position in combo):
                return True  # Indicates the game is won
        return False  # Indicates the game is not won yet

    def check_tie(self):
        # This checks that there are no longer any empty spaces on the board
        # .values() is a method used to retrieve all the values (contents of cells) from the self.board.grid dictionary.
        return ' ' not in self.board.grid.values()
    
# The main function here runs the program, starts gmae class and then all of the methods that run the program
def main():
    game = Game()
    game.intro()
    game.play()

    # This is where using the if __name__ == '__main__' code block comes in handy. Code within this block won’t run unless the module is 
    # executed in the top-level environment.
if __name__ == '__main__':
    main()
