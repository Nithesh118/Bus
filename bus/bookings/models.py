from django.db import models
from django.contrib.auth.models import User
import uuid

class BusRoute(models.Model):
    bus_name = models.CharField(max_length=100)
    start_location = models.CharField(max_length=100)
    end_location = models.CharField(max_length=100)
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    available_seats = models.PositiveIntegerField()
    fare = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.start_location} - {self.end_location} ({self.start_datetime})"

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    bus_route = models.ForeignKey(BusRoute, on_delete=models.CASCADE)
    booking_id = models.CharField(max_length=255, default=uuid.uuid4, unique=True)
    number_of_seats = models.PositiveIntegerField()
    total_fare = models.DecimalField(max_digits=10, decimal_places=2)
    booked_datetime = models.DateTimeField(auto_now_add=True)
    razorpay_order_id = models.CharField(max_length=100, blank=True, null=True)
    qr_image = models.ImageField(blank=True, null=True, upload_to='QRCode')
    date = models.DateField(default='2024-01-01')

    def __str__(self):
        return f"Booking ID: {self.booking_id} - {self.user.username}"
