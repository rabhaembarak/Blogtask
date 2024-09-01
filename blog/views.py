from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404, render, redirect
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import BlogSerializer, CommentSerializer
from .models import Blog, Comment
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
import json
import datetime
import jwt
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView

from .serializers import UserSerializer
from django.http import JsonResponse
from django.views import View
from .models import Blog
from django.middleware.csrf import get_token
from django.http import JsonResponse, HttpResponseBadRequest





class CsrfTokenView(View):
    def get(self, request, *args, **kwargs):
        csrf_token = get_token(request)
        return JsonResponse({'csrfToken': csrf_token})
    
@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
        return JsonResponse({'message': 'Login successful'}, status=status.HTTP_200_OK)
    else:
        return JsonResponse({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
    


class SignupView(APIView):
    def post(self, request):
        print("Received signup data:", request.data)  # Debugging

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        print("Signup validation errors:", serializer.errors)  # Debugging
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        print("Received login data:", request.data)  # Debugging

        username = request.data.get('fname')
        password = request.data.get('password')

        if username is None or password is None:
            raise AuthenticationFailed('Username and password required')

        user = authenticate(username=username, password=password)
        if not user:
            raise AuthenticationFailed('Invalid credentials')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'message': 'Login Success',
            'jwt': token
        }
        return response
    
class CreatePostView(View):
    @csrf_exempt
    def post(self, request, *args, **kwargs):
        title = request.POST.get('nameb')
        author = request.POST.get('aname')
        content = request.POST.get('blog')

        if not (title and author and content):
            return JsonResponse({'error': 'Missing required fields'}, status=400)

        # Create the blog post with the correct field names
        blog_post = Blog.objects.create(
            nameb=title,  # Map title to nameb
            aname=author, # Map author to aname
            blog=content  # Map content to blog
        )

        return JsonResponse({'message': 'Post created successfully', 'postId': blog_post.id})


@csrf_exempt
def add_comment(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        post_id = data.get('postId')
        comment = data.get('comment')

        if post_id and comment:
            # Assuming you have a Blog model with an id and comments field
            try:
                post = Blog.objects.get(id=post_id)
                post.comments.append(comment)  # Or whatever method you use to add comments
                post.save()
                return JsonResponse({'status': 'success'})
            except Blog.DoesNotExist:
                return JsonResponse({'status': 'error', 'message': 'Post not found'})
        else:
            return JsonResponse({'status': 'error', 'message': 'Invalid data'})
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

def get_comments(request, post_id):
    # Retrieve comments for the post
    comments = ['Sample comment 1', 'Sample comment 2'] # Replace with actual retrieval logic
    return JsonResponse({'comments': comments})
def get_all_posts(request):
    if request.method == 'GET':
        posts = Blog.objects.all().values('nameb', 'aname', 'blog')
        return JsonResponse(list(posts), safe=False)

class BlogListView(APIView):
    def get(self, request, format=None):
        blogs = Blog.objects.all()
        serializer = BlogSerializer(blogs, many=True)
        return Response(serializer.data)

def login_user(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = authenticate(username=form.cleaned_data['username'], password=form.cleaned_data['password'])
            if user is not None:
                login(request, user)
                return redirect('get_all_blogs')
        return render(request, 'login.component.html', {'form': form, 'error': 'Invalid credentials'})
    else:
        form = AuthenticationForm()
    return render(request, 'login.component.html', {'form': form})
@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user = User.objects.create_user(
                username=data['username'],
                first_name=data['first_name'],
                last_name=data['last_name'],
                email=data['email'],
                password=data['password']
            )
            return JsonResponse({'message': 'User created successfully'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=400)

@api_view(['POST'])
def create_blog(request):
    if not request.user.is_authenticated:
        return Response({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)

    serializer = BlogSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(author=request.user)  # Associate blog with the current user
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@csrf_exempt
def create_post(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            nameb = data.get('nameb')
            aname = data.get('aname')
            blog = data.get('blog')
            
            if not (nameb and aname and blog):
                return JsonResponse({'error': 'Missing required fields'}, status=400)

            # Create the post logic here
            blog_post = Blog.objects.create(nameb=nameb, aname=aname, blog=blog)
            
            return JsonResponse({'message': 'Post created successfully', 'postId': blog_post.id}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)




def get_blogs(request):
    page_number = request.GET.get('page', 1)
    search_query = request.GET.get('search', '')

    if search_query:
        blogs = Blog.objects.filter(blog__icontains=search_query)
    else:
        blogs = Blog.objects.all()

    paginator = Paginator(blogs, 5)  # 5 posts per page
    page_obj = paginator.get_page(page_number)

    blogs_data = list(page_obj.object_list.values())

    return JsonResponse({
        'blogs': blogs_data,
        'current_page': page_obj.number,
        'total_pages': paginator.num_pages,
    })

@api_view(['GET'])
def get_all_blogs(request):
    blogs = Blog.objects.all().values('id', 'nameb', 'aname', 'blog', 'comment')
    return JsonResponse(list(blogs), safe=False)

@api_view(['GET'])
def get_blog_comments(request, blog_id):
    blog = get_object_or_404(Blog, pk=blog_id)
    comments = blog.comments.all()
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)



@csrf_exempt
def update_post(request, post_id):
    try:
        post = Blog.objects.get(id=post_id)
        if request.method == 'PUT':
            data = json.loads(request.body)
            post.nameb = data.get('nameb', post.nameb)
            post.aname = data.get('aname', post.aname)
            post.blog = data.get('blog', post.blog)
            post.save()
            return JsonResponse({'message': 'Post updated successfully'})
    except Blog.DoesNotExist:
        return JsonResponse({'error': 'Post not found'}, status=404)


def delete_blog(request, id):
    if request.method == 'DELETE':
        try:
            blog = Blog.objects.get(id=id)
            blog.delete()
            return JsonResponse({'message': 'Post deleted successfully'})
        except Blog.DoesNotExist:
            return JsonResponse({'error': 'Post not found'}, status=404)
    return JsonResponse({'error': 'Invalid request method'}, status=405)