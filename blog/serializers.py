from rest_framework import serializers
from .models import Blog, Comment, Signup
from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['name'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['phone']


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields='__all__'


        
class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields='__all__'

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model=Signup
        fields='__all__'
 