# Serializers used to convert complex data to native Python data type that are then rendered into Json which is used
# in React on the client-side (frontend)

from rest_framework import serializers
from .models import Game, Board

class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = '__all__'

class GameSerializer(serializers.ModelSerializer):
    board = BoardSerializer()

    class Meta:
        model = Game
        fields = '__all__'