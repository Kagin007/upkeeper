from rest_framework.views import APIView
from django.conf import settings
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import login, logout
from django.contrib.auth.models import User
# from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from lhl.models import Member, Location, Properties, Reservations, Ratings
from lhl.serializers import GetUserDataSerializer, GetLocationDataSerializer, GetMemberDataSerializer, \
    GetPropertiesSerializer, RegisterSerializer, PostMemberDataSerializer, ReservationsSerializer, \
    GetReservationsByMemberSerializer, GetRatingsByMemberSerializer, LoginSerializer, UserSerializer, MemberSerializer

from django.db.models import Q
from django.views.decorators.csrf import csrf_exempt


class ExampleView(APIView):
    permission_classes = [IsAuthenticated]

    @csrf_exempt
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class LoginView(APIView):
    # This view should be accessible also for unauthenticated users.
    @csrf_exempt
    def post(self, request):
        serializer = LoginSerializer(data=self.request.data,
            context={ 'request': self.request })
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        u = UserSerializer(request.user)
        # memberdata = Member.objects.get(user=request.user)
        # m = GetMemberDataSerializer(memberdata)
        # m .data went in the response
        return Response(u.data, status=status.HTTP_202_ACCEPTED)


class LogoutView(APIView):
    # This view should be accessible also for unauthenticated users.
    @csrf_exempt
    def get(self, request):
        logout(request)
        return Response(None, status=status.HTTP_202_ACCEPTED)


def logout_view(request):
    logout(request)
    # Redirect to a success page.
# class CustomAuthToken(ObtainAuthToken):
#     def post(self, request, *args, **kwargs):
#         serializer = self.serializer_class(data=request.data,
#                                            context={'request': request})
#         serializer.is_valid(raise_exception=True)
#         user = serializer.validated_data['user']
#         token, created = Token.objects.get_or_create(user=user)
#         return Response({
#             'token': token.key,
#             'user_id': user.pk,
#             'email': user.email
#         })


class AllUsers(APIView):
    # ie: location: 'Toronto',  date: 'cleaners with no reservations on this date', role: 'cleaner'
    @csrf_exempt
    def get(self, request, city, appointment):
        data = Member.objects.filter(role='cleaner')
        data = data.filter(location__city=city)
        # the Q reverses the query to look for where there are NO reservations for a cleaner on this date
        data = data.filter(~Q(reservations__booking_date=appointment))

        serializer = GetMemberDataSerializer(data, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class GetUserData(APIView):
    # if settings.DEBUG is True:
    permission_classes = (IsAuthenticated,)

    @csrf_exempt
    def get(self, request, username):
        data = User.objects.filter(username=username)
        serializer = GetUserDataSerializer(data, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class LocationData(APIView):
    if settings.DEBUG is False:
        permission_classes = (IsAuthenticated,)

    @csrf_exempt
    def get(self, request, userid):
        try:
            memberdata = Member.objects.get(user_id=userid)
            try:
                locationdata = Location.objects.get(id=memberdata.location_id)
                serializer = GetLocationDataSerializer(locationdata)
                locations = serializer.data
            except Location.DoesNotExist:
                locations = []
                return Response(locations, status=status.HTTP_400_BAD_REQUEST)
        except Member.DoesNotExist:
            locations = []
            return Response(locations, status=status.HTTP_400_BAD_REQUEST)
        return Response(locations, status=status.HTTP_200_OK)

    @csrf_exempt
    def post(self, request):
        # deserialize the json into objects to put into database
        serializer = GetLocationDataSerializer(data=request.data)
        # checks for valid form
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetMember(APIView):
    if settings.DEBUG is False:
        permission_classes = (IsAuthenticated,)

    @csrf_exempt
    def get(self, request, userid):
        memberdata = Member.objects.get(user_id=userid)
        serializer = GetMemberDataSerializer(memberdata)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @csrf_exempt
    def post(self, request):
        serializer = PostMemberDataSerializer(data=request.data)
        # checks for valid form
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PropertiesData(APIView):
    if settings.DEBUG is False:
        permission_classes = (IsAuthenticated,)

    @csrf_exempt
    def get(self, request, userid):
        memberdata = Member.objects.get(user_id=userid)
        propertiesdata = Properties.objects.filter(member_id_id=memberdata.id)
        serializer = GetPropertiesSerializer(propertiesdata, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @csrf_exempt
    def post(self, request, userid):
        # deserialize the json into objects to put into database
        serializer = GetPropertiesSerializer(data=request.data)
        # checks for valid form
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterUser(APIView):
    @csrf_exempt
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReservationsData(APIView):
    if settings.DEBUG is False:
        permission_classes = (IsAuthenticated,)

    @csrf_exempt
    def get(self, request):
        # memberdata = Member.objects.get(user_id=userid)
        data = Reservations.objects.all()
        serializer = ReservationsSerializer(data, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
        # now need a serializer for reservation data

    @csrf_exempt
    def post(self, request):
        serializer = ReservationsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MemberCleanerReservationsData(APIView):
    @csrf_exempt
    def get(self, request, userid):
        # filter member model where user_id is same as member_id. Should maybe do id=memberid?
        # But would technically be the same result because user_id should always is the same as memberid
        memberdata = Member.objects.get(user_id=userid)
        reservationdata = Reservations.objects.filter(member_id_id=memberdata.id)

        serializer = GetReservationsByMemberSerializer(reservationdata, many=True)

        return Response(serializer.data, status.HTTP_200_OK)


# review for understanding
class MemberOwnerReservationsData(APIView):
    @csrf_exempt
    def get(self, request, userid):
        memberdata = Member.objects.get(user_id=userid)
        r = {}
        propertydata = Properties.objects.filter(member_id=memberdata.id)
        for item in propertydata:
            reservationdata = Reservations.objects.filter(property_id=item.id)
            serializer = GetReservationsByMemberSerializer(reservationdata, many=True)
            dictkey = item.id
            r.update({dictkey: serializer.data})
        return Response(r, status.HTTP_200_OK)


class RatingByCleaner(APIView):
    @csrf_exempt
    def get(self, request, memberid):
        memberdata = Member.objects.get(user_id=memberid)
        data = Ratings.objects.filter(member_id_id=memberdata.id).order_by('-rating')
        serializer = GetRatingsByMemberSerializer(data, many=True)

        return Response(serializer.data, status.HTTP_200_OK)


class TopRatingByCleaner(APIView):
    @csrf_exempt
    def get(self, request, memberid):
        memberdata = Member.objects.get(user_id=memberid)
        data = Ratings.objects.filter(member_id_id=memberdata.id).order_by('-rating')[:1]
        serializer = GetRatingsByMemberSerializer(data, many=True)

        return Response(serializer.data, status.HTTP_200_OK)

    # const
    # sampleData = [
    #     {
    #         firstName: "Winona",
    #         lastName: "Williams",
    #         imgURL:
    #             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
    #         payRate: 60,
    #         transportMode: "Vehicle",
    #         avgRating: 4.5,
    #         numRatings: 20,
    #         topReview: {
    #                        date: "Jan 23, 2022",
    #                        reviewerName: "James Dean",
    #                        rating: 5,
    #                        reviewMessage: `Winona is spectacular and very efficient at her job.We always use her
    #                 service to clean our apartment when we don't have time to do it
    #                        ourselves.She responds quickly and is always on time!`,
    # }