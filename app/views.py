from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.db.models import Count


import random

from .models import ( Event,
    Feedback,
    Volunteer,
    OTP,
    EventRegistration
)

# =========================
# HOME
# =========================
def home(request):
    events = Event.objects.all()[:6]
    return render(request, 'home.html', {'events': events})


# =========================
# AUTH
# =========================
def signup(request):
    if request.method == "POST":
        User.objects.create_user(
            username=request.POST['username'],
            email=request.POST['email'],
            password=request.POST['password']
        )
        return redirect('login')
    return render(request, 'signup.html')


def user_login(request):
    if request.method == "POST":
        user = authenticate(
            username=request.POST['username'],
            password=request.POST['password']
        )
        if user:
            login(request, user)
            return redirect('dashboard')
        return render(request, 'login.html', {'error': 'Invalid credentials'})
    return render(request, 'login.html')


def user_logout(request):
    logout(request)
    return redirect('login')


# =========================
# USER DASHBOARD
# =========================
@login_required
def user_dashboard(request):
    registrations = EventRegistration.objects.filter(user=request.user)
    feedbacks = Feedback.objects.filter(email=request.user.email)

    return render(request, 'user_dashboard.html', {
        'registrations': registrations,
        'feedbacks': feedbacks
    })


# =========================
# EVENTS
# =========================
def events_list(request):
    search = request.GET.get('q') or ''
    category = request.GET.get('category') or ''

    events = Event.objects.all()

    if search:
        events = events.filter(title__icontains=search)

    if category:
        events = events.filter(category=category)

    category_counts = Event.objects.values('category').annotate(total=Count('id'))

    return render(request, 'events_list.html', {
        'events': events,
        'search': search,
        'selected_category': category,
        'category_counts': category_counts,
    })
# def event_detail(request, id):
#     event = get_object_or_404(Event, id=id)

#     gallery_images = []
#     if event.image:
#         gallery_images = [event.image.url] * 3

#     return render(request, 'event_detail.html', {
#         'event': event,
#         'gallery_images': gallery_images
#     })
def event_detail(request, id):
    event = Event.objects.get(id=id)
    gallery_images = [
        event.image,
        event.image,
        event.image
    ]
    return render(request, 'event_detail.html', {
        'event': event,
        'gallery_images': gallery_images
    })



# =========================
# EVENT REGISTRATION
# =========================
@login_required
def event_register(request, event_id):
    event = get_object_or_404(Event, id=event_id)

    if request.method == 'POST':
        EventRegistration.objects.create(
            event=event,
            user=request.user,

            full_name=request.POST['full_name'],
            email=request.POST['email'],
            phone=request.POST['phone'],
            gender=request.POST['gender'],
            dob=request.POST['dob'],

            enrollment=request.POST['enrollment'],
            college=request.POST['college'],
            branch=request.POST['branch'],
            year=request.POST['year'],

            hear_about=request.POST['hear_about'],
            experience=request.POST['experience'],
        )
        return redirect('my_events')

    return render(request, 'event_registration.html', {'event': event})


@login_required
def my_events(request):
    registrations = EventRegistration.objects.filter(user=request.user)
    return render(request, 'my_events.html', {'registrations': registrations})


# =========================
# FEEDBACK
# =========================
def feedback(request):
    if request.method == "POST":
        Feedback.objects.create(
            name=request.POST['name'],
            email=request.POST['email'],
            rating=request.POST['rating'],
            comments=request.POST['comments'],
            suggestions=request.POST['suggestions']
        )
        return render(request, 'feedback.html', {
            'message': 'Thanks for your feedback!'
        })

    return render(request, 'feedback.html')


# =========================
# VOLUNTEER
# =========================
def volunteer_register(request):
    if request.method == 'POST':
        Volunteer.objects.create(
            name=request.POST['name'],
            email=request.POST['email'],
            phone=request.POST['phone']
        )
        return redirect('home')
    return render(request, 'volunteer.html')


# =========================
# FORGOT PASSWORD (OTP)
# =========================
def forgot_password(request):
    if request.method == 'POST':
        otp = random.randint(100000, 999999)
        email = request.POST['email']

        OTP.objects.create(email=email, otp=otp)
        request.session['reset_email'] = email

        print("OTP:", otp)  # for testing

        return redirect('verify_otp')

    return render(request, 'forgot_password.html')


def verify_otp(request):
    if request.method == 'POST':
        email = request.session.get('reset_email')
        otp = request.POST['otp']

        if OTP.objects.filter(email=email, otp=otp).exists():
            return redirect('reset_password')

    return render(request, 'verify_otp.html')


def reset_password(request):
    if request.method == 'POST':
        email = request.session.get('reset_email')
        user = get_object_or_404(User, email=email)

        user.set_password(request.POST['password'])
        user.save()

        return redirect('login')

    return render(request, 'reset_password.html')


# =========================
# ADMIN
# =========================
@login_required
def admin_dashboard(request):
    if not request.user.is_staff:
        return redirect('login')

    context = {
        'total_users': User.objects.count(),
        'total_events': Event.objects.count(),
        'total_registrations': EventRegistration.objects.count(),
        'total_feedbacks': Feedback.objects.count(),
    }
    return render(request, 'admin/dashboard.html', context)


@login_required
def add_event(request):
    if not request.user.is_staff:
        return redirect('login')

    if request.method == 'POST':
        Event.objects.create(
            title=request.POST['title'],
            description=request.POST['description'],
            date=request.POST['date'],
            time=request.POST['time'],
            location=request.POST['location'],
            image=request.FILES.get('image')
        )
        return redirect('admin_dashboard')

    return render(request, 'add_event.html')



@login_required
def admin_registrations(request):
    if not request.user.is_staff:
        return redirect('login')

    registrations = EventRegistration.objects.select_related('user', 'event')
    return render(request, 'admin/registrations.html', {
        'registrations': registrations
    })


@login_required
def admin_analytics(request):
    if not request.user.is_staff:
        return redirect('login')

    context = {
        'total_users': User.objects.count(),
        'total_events': Event.objects.count(),
        'total_registrations': EventRegistration.objects.count(),
        'total_volunteers': Volunteer.objects.count(),
        'total_feedbacks': Feedback.objects.count(),
    }

    return render(request, 'admin_analytics.html', context)

def public_events(request):
    events = Event.objects.all()
    return render(request, 'events.html', {'events': events})

# @login_required
# def admin_dashboard(request):
#     if not request.user.is_staff:
#         return redirect('login')

#     context = {
#         'total_users': User.objects.count(),
#         'total_events': Event.objects.count(),
#         'total_registrations': EventRegistration.objects.count(),
#         'total_feedbacks': Feedback.objects.count(),
#     }
#     return render(request, 'admin/dashboard.html', context)


@login_required
def admin_registrations(request):
    if not request.user.is_staff:
        return redirect('login')

    registrations = EventRegistration.objects.select_related('user', 'event')
    return render(request, 'admin/registrations.html', {
        'registrations': registrations
    })
