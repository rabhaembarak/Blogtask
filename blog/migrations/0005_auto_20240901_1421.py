from django.db import migrations

def populate_user_field(apps, schema_editor):
    Blog = apps.get_model('blog', 'Blog')
    User = apps.get_model('auth', 'User')
    default_user = User.objects.first() 
    Blog.objects.filter(user__isnull=True).update(user=default_user)

class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0004_blog_user'),
    ]

    operations = [
        migrations.RunPython(populate_user_field),
    ]