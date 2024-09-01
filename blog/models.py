from django.db import models
from django.contrib.auth.models import User
from django.db import models

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15, blank=True, null=True)
    

class Signup(models.Model):
    fname = models.CharField(max_length=100)
    lname = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    password = models.CharField(max_length=100)

class Blog(models.Model):
    nameb = models.TextField()  # This corresponds to the title
    aname = models.TextField()  # This corresponds to the author
    blog = models.TextField()   # This corresponds to the content
    comment = models.JSONField(default=list)  # Assuming you're using JSONField for comments


    class Meta:
        db_table = 'blog_blog'


class Blog(models.Model):
    nameb = models.TextField()  # Title
    aname = models.TextField()  # Author
    blog = models.TextField()   # Content
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # User who created the post

class Comment(models.Model):
    cname=models.TextField(default='Rabha')
    comment=models.TextField()
    blog=models.ForeignKey(Blog,on_delete=models.CASCADE)

