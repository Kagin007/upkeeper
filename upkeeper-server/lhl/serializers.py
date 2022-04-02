from rest_framework import serializers
from django.contrib.auth.models import User
from lhl.models import Location, Member, Properties, Reservations, Ratings
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.db.models import Avg, Count, Max
from django.contrib.auth import authenticate


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'id')


class LoginSerializer(serializers.Serializer):
    """
    This serializer defines two fields for authentication:
      * username
      * password.
    It will try to authenticate the user with when validated.
    """
    username = serializers.CharField(
        label="Username",
        write_only=True
    )
    password = serializers.CharField(
        label="Password",
        # This will be used when the DRF browsable API is enabled
        style={'input_type': 'password'},
        trim_whitespace=False,
        write_only=True
    )

    def validate(self, attrs):
        # Take username and password from request
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            # Try to authenticate the user using Django auth framework.
            user = authenticate(request=self.context.get('request'),
                                username=username, password=password)
            if not user:
                # If we don't have a regular user, raise a ValidationError
                msg = 'Access denied: wrong username or password.'
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = 'Both "username" and "password" are required.'
            raise serializers.ValidationError(msg, code='authorization')
        # We have a valid user, put it in the serializer's validated_data.
        # It will be used in the view.
        attrs['user'] = user
        return attrs


class GetUserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']


class GetLocationDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'address', 'city', 'province', 'longitude', 'latitude']


class PostMemberDataSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(many=False, queryset=User.objects.all())
    location = serializers.PrimaryKeyRelatedField(many=False, queryset=Location.objects.all())

    class Meta:
        model = Member
        fields = ['id', 'role', 'pay_rate', 'imgurl', 'location', 'user']


class GetPropertiesSerializer(serializers.ModelSerializer):
    member_id = serializers.PrimaryKeyRelatedField(many=False, queryset=Member.objects.all())

    class Meta:
        model = Properties
        fields = ['id', 'address', 'city', 'country', 'longitude', 'latitude', 'member_id']


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        # front end validates password
        fields = ('id', 'username', 'password', 'password2', 'email', 'first_name', 'last_name')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


class ReservationsSerializer(serializers.ModelSerializer):
    # member = serializers.PrimaryKeyRelatedField(many=False, queryset=Member.objects.all())
    # property = serializers.PrimaryKeyRelatedField(many=False, queryset=Properties.objects.all())

    class Meta:
        model = Reservations
        fields = ['booking_date', 'member_id', 'property_id']


class MemberSerializer(serializers.ModelSerializer):
    user = GetUserDataSerializer(many=False, read_only=True)
    class Meta:
        model = Member
        fields = ['id', 'role', 'pay_rate', 'location_id', 'user', 'imgurl']


class GetReservationsByMemberSerializer(serializers.ModelSerializer):
    member_id = MemberSerializer(many=False, read_only=True)
    property_id = GetPropertiesSerializer(many=False, read_only=True)

    class Meta:
        model = Reservations
        fields = ['property_id', 'booking_date', 'is_complete', 'member_id', 'property_id']


class GetRatings(serializers.ModelSerializer):
    member_id = serializers.PrimaryKeyRelatedField(many=False, queryset=Member.objects.all())

    class Meta:
        model = Ratings
        fields = ['member_id', 'reservation_id', 'message', 'rating']


class GetRatingsByMemberSerializer(serializers.ModelSerializer):
    member_id = serializers.PrimaryKeyRelatedField(many=False, queryset=Member.objects.all())
    reservation_id = serializers.PrimaryKeyRelatedField(many=False, queryset=Reservations.objects.all())
    average_rating = serializers.SerializerMethodField()
    rating_count = serializers.SerializerMethodField()

    class Meta:
        model = Ratings
        fields = ['member_id', 'reservation_id', 'message', 'rating', 'average_rating', 'rating_count']

    def get_average_rating(self, obj):
        avg_rating = Ratings.objects.filter(member_id=obj.member_id).aggregate(Avg('rating'))
        return avg_rating

    def get_rating_count(self, obj):
        rating_count = Ratings.objects.filter(member_id=obj.member_id).count()
        return rating_count


class GetMemberDataSerializer(serializers.ModelSerializer):
    # extends the user table into Members
    user = GetUserDataSerializer(many=False, read_only=True)
    location = GetLocationDataSerializer(many=False, read_only=True)
    average_rating = serializers.SerializerMethodField()
    rating_count = serializers.SerializerMethodField()
    # rating = serializers.PrimaryKeyRelatedField(many=False, queryset=Ratings.objects.all())
    top_comment = serializers.SerializerMethodField()

    class Meta:
        model = Member
        fields = ['id', 'role', 'pay_rate', 'location', 'user', 'imgurl', 'average_rating', 'rating_count', 'top_comment']

    def get_average_rating(self, obj):
        avg_rating = Ratings.objects.filter(member_id=obj.id).aggregate(Avg('rating'))
        return avg_rating

    def get_rating_count(self, obj):
        rating_count = Ratings.objects.filter(member_id=obj.id).count()
        return rating_count

    def get_top_comment(self, obj):
        ratings = Ratings.objects.filter(member_id=obj.id).order_by('-rating')[:1]
        if ratings:
            return ratings[0].message
        else:
            empty = []
            return empty


# avg = Ratings.objects.filter(member_id_id=memberid).aggregate(avg=Avg('rating'))

# user stories
# All Users
# should a user choose to be a owner or a cleaner at profile creation?
# As a user I want to create a profile
# As a user I would like to be see/write messages between cleaners and owners
# As a user (owners & cleaners) I can cancel appointments
# As a user I want to change appointment to different times

# Owner
# As a user want to book cleaners
# As an owner I would like to see list of cleaners without signing up
# As an owner I would like to rank cleaners that I have used (rate the cleaner just once per reservation)
# As an owner I would like to write reviews about cleaners I have used
# As an owner I would like to filter the available services provided by cleaners
# As a user I would like to book cleaners through the application and pay for services through their availability

# Cleaner
# As a cleaner I want to be able to post a profile with:
# Availabilities
# Rates$$
# Particular services
# Location (city)
# Photo
