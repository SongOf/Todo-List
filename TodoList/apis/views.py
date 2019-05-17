from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import pagination
from rest_framework import viewsets
from .models import TodoItem
from .serializer import TodoItemSerializer
from .UserPagination import UserPagination
from rest_framework.decorators import list_route
from rest_framework.response import Response
from collections import OrderedDict, namedtuple
# Create your views here.

class TodoItemViewSet(viewsets.ModelViewSet):#get post put delete
    serializer_class = TodoItemSerializer
    pagination_class = UserPagination
    queryset = TodoItem.objects.all().filter(IsDone=False)

    @list_route(methods=['get'])
    def getlistbyexdate(self, request):
        UndoList = TodoItem.objects.all().filter(IsDone=False).order_by('TodoExpireDate')
        status = request.query_params.get("status")
        if status=='1':
            self.paginator.page_size = UndoList.count()
        page= self.paginate_queryset(UndoList)
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    @list_route(methods=['get'])
    def getlistbypri(self, request):
        UndoList = TodoItem.objects.all().filter(IsDone=False).order_by('TodoPriority')
        status = request.query_params.get("status")
        if status == '1':
            self.paginator.page_size = UndoList.count()
        page = self.paginate_queryset(UndoList)
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)
