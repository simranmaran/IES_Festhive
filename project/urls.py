from django.contrib import admin
from django.urls import path
from app import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # HOME & AUTH
    path('', views.home, name='home'),
    path('login/', views.user_login, name='login'),
    path('signup/', views.signup, name='signup'),
    path('logout/', views.user_logout, name='logout'),
    
    # DASHBOARD - YE PERFECT HAI
    path('dashboard/', views.user_dashboard, name='dashboard'),  # ✅ YE ADD KIA
    path('admin-dashboard/', views.admin_dashboard, name='admin_dashboard'),
    
    # EVENTS - DUPLICATES HATAYE
    path('events_list/', views.events_list, name='events_list'),  # ✅ EK HI RAKHO
    path('event/<int:id>/', views.event_detail, name='event_detail'),
    
    # REGISTRATION
    path('event_register/<int:event_id>/', views.event_register, name='event_register'),
    path('my-events/', views.my_events, name='my_events'),
    
    # ADMIN
    path('admin/add-event/', views.add_event, name='add_event'),
    path('admin/registrations/', views.admin_registrations, name='admin_registrations'),
    path('admin/analytics/', views.admin_analytics, name='admin_analytics'),
    
    # OTHERS
    path('volunteer/', views.volunteer_register, name='volunteer'),
    path('feedback/', views.feedback, name='feedback'),
    path('forgot-password/', views.forgot_password, name='forgot_password'),
    path('verify-otp/', views.verify_otp, name='verify_otp'),
    path('reset-password/', views.reset_password, name='reset_password'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
