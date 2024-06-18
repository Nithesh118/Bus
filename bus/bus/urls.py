from django.urls import path
from bookings import views
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('signupp', views.signup, name='signup_api'),
    path('loginn', views.login, name='login_api'),
    path('api/logoutt/', views.logout, name='api-logout'),
    path('listt', views.list, name='list_api'),
    path('admin/loginn/', views.admin),
    path('adminn/', admin.site.urls),
    path('Bus/<int:pk>/disable/', views.disable, name='disable'),
    path('vieww/<int:pk>/', views.view, name='Bus_detail'),
    path('bus_time/<str:date>/', views.bus_time, name='shows_on_date'),
    path('productt/pdf/<int:pk>/', views.generate_pdf, name='product_pdf'),
    path('start-paymentt/<int:pk>/', views.start_payment, name='start_payment'),
    path('handle-payment-successs/', views.handle_payment_success, name='handle_payment_success'),
    path('my-bookingss/', views.my_bookings_api, name='my_bookings_api'),

    path('total_collection_by_date/', views.total_collection_by_date, name='total_collection'),
    path('revenue_by_bus/', views.revenue_by_bus, name='bus_revenue'),

    path('create', views.create, name='create'),
    path('update/<int:pk>/', views.change, name='update'),
    path('deletee/<int:pk>/', views.delete, name='delete'),
    path('viewww/', views.vieww, name='admin_list'),

    



]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
