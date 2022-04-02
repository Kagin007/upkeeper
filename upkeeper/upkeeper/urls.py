"""upkeeper URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from lhl.views import GetUserData, LocationData, GetMember, PropertiesData, RegisterUser, AllUsers, ReservationsData, \
                        MemberCleanerReservationsData, RatingByCleaner, TopRatingByCleaner, LoginView, ExampleView, LogoutView, \
                        MemberOwnerReservationsData

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='refresh_token'),
    # path('api/login', obtain_auth_token),
    # ***
    path('api/login', LoginView.as_view()),
    path('api/logout', LogoutView.as_view()),
    path('api/example', ExampleView.as_view()),
    # ***
    path('api/userdata/<str:username>', GetUserData.as_view(), name='userdata'), # firstname, lastname,
    path('api/location/<int:userid>', LocationData.as_view(), name='getlocation'),
    path('api/location', LocationData.as_view(), name='postlocation'),
    path('api/member/<int:userid>', GetMember.as_view(), name='getmember'),

    #create member data
    path('api/member', GetMember.as_view(), name='postmember'),
    path('api/properties/<int:userid>', PropertiesData.as_view(), name='properties'),
    path('api/register', RegisterUser.as_view(), name='register'),
    # new
    path('api/users/<str:city>/<str:appointment>', AllUsers.as_view(), name='allUsers'),
    path('api/reservations', ReservationsData.as_view(), name='reservations'),
    #reservations by cleaner's member_id
    path('api/reservations/cleaner/<int:userid>', MemberCleanerReservationsData.as_view(), name='reservationsByMember'),
    #reservations by owner's member_id
    path('api/reservations/owner/<int:userid>', MemberOwnerReservationsData.as_view(), name='reservationsbyOwner'),
    # ratings
    path('api/member/<int:memberid>/ratings', RatingByCleaner.as_view(), name='ratingByCleaner'),
    path('api/member/<int:memberid>/top/ratings', TopRatingByCleaner.as_view(), name='topRating')
    #ratings for each reservation
]
