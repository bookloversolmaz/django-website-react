from django.shortcuts import render, redirect, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.http import require_http_methods
from .models import Game

class TicTacToeView(APIView):
    """
    API endpoint for Tic-Tac-Toe game.
    """
    def post(self, request):
        player_one = request.data.get('player_one', 'X')
        player_two = request.data.get('player_two', 'O')
        game = Game.objects.create(player_one=player_one, player_two=player_two)
        game.play_auto()  # Assuming play_auto() is defined in your Game model
        game.save()
        return Response({'id': game.pk})

    def get(self, request):
        games = Game.objects.all()
        data = [{'id': game.id, 'player_one': game.player_one, 'player_two': game.player_two} for game in games]
        return Response(data)

@require_http_methods(["GET", "POST"])
def index(request):
    if request.method == "POST":
        player_one = request.POST.get('player_one', 'X')
        player_two = request.POST.get('player_two', 'O')
        game = Game.objects.create(player_one=player_one, player_two=player_two)
        game.play_auto()  # Assuming play_auto() is defined in your Game model
        game.save()
        return redirect('game', pk=game.pk)

    return render(request, 'game/game_list.html')

@require_http_methods(["GET", "POST"])
def game(request, pk):
    game = get_object_or_404(Game, pk=pk)
    if request.method == "POST":
        index = int(request.POST.get('index'))
        game.play(index)  # Assuming play() method handles user moves
        game.play_auto()  # Assuming play_auto() method handles computer moves
        game.save()
        return redirect('game', pk=pk)

    return render(request, "game/game_detail.html", {'game': game})