from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Game, Board

class TicTacToeView(APIView):
    def post(self, request):
        player_one = request.data.get('player_one', 'X')
        player_two = request.data.get('player_two', 'O')
        
        # Create and save the Board instance
        board = Board.objects.create()  # No need to initialize fields, as they default to ' '
        
        # Create and save the Game instance
        game = Game.objects.create(player_one=player_one, player_two=player_two, board=board)
        
        return Response({
            'id': game.id,
            'board': game.get_board()
        }, status=status.HTTP_201_CREATED)

    def get(self, request, pk=None):
        try:
            game = Game.objects.get(pk=pk)
        except Game.DoesNotExist:
            return Response({"error": "Game not found"}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({
            'id': game.id,
            'board': game.get_board(),
            'winner': game.get_winner()  # Ensure this method exists and works as expected
        })