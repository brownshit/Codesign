# codesign_back/urls.py
from django.contrib import admin
from django.urls import path, include
from orders.views import index, submit_order

urlpatterns = [
    #path('admin/', admin.site.urls),
    #path('orders/', include('orders.urls')),
    #path("", ReactAppView.as_view(), name="react_app"),
    path("index/", index, name="index"),          # index 뷰 매핑
    path("submit_order/", submit_order, name="submit_order"),    # submit_order 뷰 매핑
]
