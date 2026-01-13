from django.db import models
from django.contrib.auth.models import User

class Event(models.Model):
    CATEGORY_CHOICES = [
        ('technology', 'Technology'),
        ('cultural', 'Cultural'),
        ('sports', 'Sports'),
        ('business', 'Business'),
        ('academic', 'Academic'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateField()
    time = models.TimeField()
    location = models.CharField(max_length=200)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    image = models.ImageField(upload_to='events/', blank=True, null=True)

    def __str__(self):
        return self.title



class Feedback(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    rating = models.IntegerField()
    comments = models.TextField()
    suggestions = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


class Volunteer(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=10)


class OTP(models.Model):
    email = models.EmailField()
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

class EventRegistration(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    gender = models.CharField(max_length=10)
    dob = models.DateField()

    enrollment = models.CharField(max_length=50)
    college = models.CharField(max_length=150)
    branch = models.CharField(max_length=100)
    year = models.CharField(max_length=20)

    hear_about = models.CharField(max_length=200)
    experience = models.TextField(blank=True)

    registered_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} - {self.event.title}"

class Certificate(models.Model):
    registration = models.OneToOneField(EventRegistration, on_delete=models.CASCADE)
    certificate_id = models.CharField(max_length=50, unique=True)
    issued_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Certificate - {self.registration.full_name}"
