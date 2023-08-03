# orders/views.py
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Order
from .serializers import OrderSerializer
from django.conf import settings
from django.http import HttpResponse
from django.views.generic import View
import os

class ReactAppView(View):
    def get(self, request):
        try:
            with open(os.path.join(settings.BASE_DIR, 'orders/co-design/build', 'index.html')) as file:
                return HttpResponse(file.read())
        except FileNotFoundError:
            return HttpResponse(
                """
                index.html not found ! ensure your React project has been built and index.html is available
                """,
                status=501,
            )
            
class ManifestView(View):
    def get(self, request):
        try:
            with open(os.path.join(settings.BASE_DIR, 'orders/co-design/build', 'manifest.json')) as file:
                return HttpResponse(file.read(), content_type='application/json')
        except FileNotFoundError:
            return HttpResponse(
                """
                manifest.json not found! Ensure your React project has been built and manifest.json is available.
                """,
                status=501,
            )          

@api_view(['GET'])
def index(request):
    return render(request, 'orders/co-design/build/index.html')


@api_view(['POST'])
def submit_order(request):
    phone_number = request.data.get('phoneNumber')
    menu = request.data.get('menu')
    total = request.data.get('total')

    # 데이터베이스에 저장하는 코드
    order = Order.objects.create(phone_number=phone_number, menu=menu, total=total)
    serializer = OrderSerializer(order)
    return Response(serializer.data)

@api_view(['POST'])  # 추가된 부분: create_order 뷰 정의
def create_order(request):
    # POST 요청인지 확인합니다.
    if request.method == 'POST':
        # 요청으로부터 데이터를 가져옵니다.
        phone_number = request.data.get('phoneNumber')
        menu = request.data.get('menu')
        total = request.data.get('total')

        # 데이터베이스에 새로운 주문을 생성하고 저장합니다.
        order = Order.objects.create(phone_number=phone_number, menu=menu, total=total)

        # 생성된 주문을 직렬화하여 클라이언트로 응답합니다.
        serializer = OrderSerializer(order)
        return Response(serializer.data)
    else:
        return Response({'message': 'Invalid request method'}, status=400)
