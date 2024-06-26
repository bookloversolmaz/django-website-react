
# This class creates the grid for the game, consists of three rows of three, use a disctionary to 
# assign a number to each square. Dictionary is a key value pair, like hash in Ruby.
class Board():
    # Create a dictionary, where each position on the board is blank
    def __init__(self):
        # Included self to show that it is an instance method
        self.grid = {'7': ' ' , '8': ' ' , '9': ' ' ,
                     '4': ' ' , '5': ' ' , '6': ' ' ,
                     '1': ' ' , '2': ' ' , '3': ' ' }
    # Create a tuple (immutable) where each position on the grid is assigned a number
    def printBoard(self):
        print(self.grid['7'] + '|' + self.grid['8'] + '|' + self.grid['9'])
        print('-+-+-')
        print(self.grid['4'] + '|' + self.grid['5'] + '|' + self.grid['6'])
        print('-+-+-')
        print(self.grid['1'] + '|' + self.grid['2'] + '|' + self.grid['3'])
