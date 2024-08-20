from django.db import models

class Board(models.Model):
    grid_1 = models.CharField(max_length=1, default=' ')
    grid_2 = models.CharField(max_length=1, default=' ')
    grid_3 = models.CharField(max_length=1, default=' ')
    grid_4 = models.CharField(max_length=1, default=' ')
    grid_5 = models.CharField(max_length=1, default=' ')
    grid_6 = models.CharField(max_length=1, default=' ')
    grid_7 = models.CharField(max_length=1, default=' ')
    grid_8 = models.CharField(max_length=1, default=' ')
    grid_9 = models.CharField(max_length=1, default=' ')

    def print_board(self):
        print(self.grid_7 + '|' + self.grid_8 + '|' + self.grid_9)
        print('-+-+-')
        print(self.grid_4 + '|' + self.grid_5 + '|' + self.grid_6)
        print('-+-+-')
        print(self.grid_1 + '|' + self.grid_2 + '|' + self.grid_3)

    def reset_board(self):
        self.grid_7 = ' '
        self.grid_8 = ' '
        self.grid_9 = ' '
        self.grid_4 = ' '
        self.grid_5 = ' '
        self.grid_6 = ' '
        self.grid_1 = ' '
        self.grid_2 = ' '
        self.grid_3 = ' '
        self.save()

class Game(models.Model):
    player_one = models.CharField(max_length=1, default='X')
    player_two = models.CharField(max_length=1, default='O')
    board = models.OneToOneField(Board, on_delete=models.CASCADE)
    winner = models.CharField(max_length=1, blank=True, null=True)

    def get_board(self):
        return [
            self.board.grid_1, self.board.grid_2, self.board.grid_3,
            self.board.grid_4, self.board.grid_5, self.board.grid_6,
            self.board.grid_7, self.board.grid_8, self.board.grid_9
        ]

    def check_winner(self, player):
        win_combinations = [
            [1, 2, 3], [4, 5, 6], [7, 8, 9],  # rows
            [1, 4, 7], [2, 5, 8], [3, 6, 9],  # columns
            [1, 5, 9], [3, 5, 7]              # diagonals
        ]
        for combo in win_combinations:
            if all(getattr(self.board, f'grid_{pos}') == player for pos in combo):
                return True
        return False

    def check_tie(self):
        return ' ' not in [getattr(self.board, f'grid_{i}') for i in range(1, 10)]
