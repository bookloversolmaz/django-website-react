from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from .game import Game

game_instance = Game()

@csrf_exempt
class TicTacToeView(APIView):
    def new_game(request):
       global game_instance
       game_instance = Game()
       game_instance.intro()
       return JsonResponse({'status': 'New game started', 'board': game_instance.board.grid})

    @csrf_exempt
    def make_move(request, position):
        global game_instance
        if request.method == 'POST':
            player = game_instance.player_one if game_instance.board.grid[position] == ' ' else game_instance.player_two
            if game_instance.validate_move(position, player):
                game_instance.board.grid[position] = player
                if game_instance.check_winner(player):
                    return JsonResponse({'status': f'Player {player} wins!', 'board': game_instance.board.grid})
                if game_instance.check_tie():
                    return JsonResponse({'status': 'It\'s a tie!', 'board': game_instance.board.grid})
                return JsonResponse({'status': 'Move accepted', 'board': game_instance.board.grid})
            else:
                return JsonResponse({'status': 'Invalid move', 'board': game_instance.board.grid})

        return JsonResponse({'status': 'Only POST method is allowed'})