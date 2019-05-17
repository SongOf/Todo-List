from rest_framework import pagination
from rest_framework.response import Response
from collections import OrderedDict, namedtuple
class UserPagination(pagination.PageNumberPagination):
    page_size = 5
    def get_paginated_response(self, data):
        return Response(OrderedDict([
                        ('count', self.page.paginator.count),
						('next', self.get_next_link()),
						('previous', self.get_previous_link()),
						('page_size', self.page_size),
						('results', data)]))