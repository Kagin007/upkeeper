from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.base_user import BaseUserManager

from django.core.validators import MinValueValidator, MaxValueValidator


class Location(models.Model):
    # should just be in Cleaner model???
    address = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    province = models.CharField(max_length=200)
    longitude = models.DecimalField(max_digits=8, decimal_places=4)
    latitude = models.DecimalField(max_digits=8, decimal_places=4)


# Create your models here.
class Member(models.Model):
    role = models.CharField(max_length=20)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    location = models.OneToOneField(Location, on_delete=models.CASCADE)
    pay_rate = models.DecimalField(max_digits=10, decimal_places=2)
    imgurl = models.CharField(max_length=2000)


# properties to rent. An owner can have multiple properties
class Properties(models.Model):
    member_id = models.ForeignKey(Member, on_delete=models.CASCADE)
    address = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    country = models.CharField(max_length=200)
    imgurl = models.CharField(max_length=2000)
    longitude = models.DecimalField(max_digits=8, decimal_places=4)
    latitude = models.DecimalField(max_digits=8, decimal_places=4)


class Reservations(models.Model):
    member_id = models.ForeignKey(Member, on_delete=models.CASCADE)
    property_id = models.ForeignKey(Properties, on_delete=models.CASCADE)
    booking_date = models.DateField()
    is_complete = models.BooleanField(default=False)


class Ratings(models.Model):
    reservation_id = models.OneToOneField(Reservations, on_delete=models.CASCADE)
    member_id = models.ForeignKey(Member, on_delete=models.CASCADE)
    message = models.CharField(max_length=2000)
    rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)])


# TO DO
# need to filter cleaners by date and location!!

