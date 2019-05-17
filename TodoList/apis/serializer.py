from rest_framework import serializers
from .models import TodoItem

class TodoItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoItem
        fields = ('TodoContent', 'IsDone', 'TodoPriority', 'TodoExpireDate','id')