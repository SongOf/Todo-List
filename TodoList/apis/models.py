from django.db import models

# Create your models here.
class TodoItem(models.Model):
    TodoContent=models.CharField(max_length=255)
    TodoExpireDate=models.DateField()
    TodoPriority=models.IntegerField()
    IsDone=models.BooleanField()

    def __str__(self):
        return self.TodoContent