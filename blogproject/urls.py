from django.contrib import admin
from django.urls import path
from blog import views
from blog.views import SignupView
from blog.views import login_view
from blog.views import CreatePostView
from blog.views import CsrfTokenView
from blog.views import CreatePostView
from blog.views import get_all_posts
from blog.views import BlogListView
from blog.views import create_post
from blog.views import delete_blog


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/delete/<int:id>/', delete_blog, name='delete_blog'),
    path('getAll/', views.get_all_blogs, name='get_all_blogs'),
    path('getComments/<int:blog_id>/', views.get_blog_comments, name='get_blog_comments'),
    path('comment/', views.add_comment, name='add_comment'),
    path('login/', login_view, name='login'),
    path('signup/', SignupView.as_view(), name='signup'),
    path('create/', CreatePostView.as_view(), name='create_post'),
    path('api/csrf-token/', CsrfTokenView.as_view(), name='csrf_token'),
    path('getAll/', BlogListView.as_view(), name='blog-list'),
    path('api/create/', create_post, name='create_post'),

    
    
]
