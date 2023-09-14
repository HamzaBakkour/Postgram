#core/user/models.py
from django.contrib.auth.models import AbstractBaseUser, \
                                        BaseUserManager, \
                                        PermissionsMixin
from django.db import models
from core.abstract.models import AbstractModel, \
                                    AbstractManager

from django.contrib.auth.hashers import check_password 


import logging
logger = logging.getLogger(__name__)

def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'user_{0}/{1}'.format(instance.public_id, filename)


class UserManager(BaseUserManager, AbstractManager):
        
    def create_user(self, username, email, password = None, **kwargs):
        """Create and return a 'User' with an email, phone number,
        username and password."""
        if username is None:
            raise TypeError('Users must have a username.')
        
        if email is None:
            raise TypeError('User must have an email.')
        
        if password is None:
            raise TypeError('User must have a password.')
        
        user = self.model(username = username,
                            email = self.normalize_email(email),
                            **kwargs)
        
        user.set_password(password)
        user.save(using = self.db)
        return user
    
    def create_superuser(self, username, email, password, **kwargs):
        """Create and return a 'User' with supteruser (admin)
            permissions"""
        if password is None:
            raise TypeError('Superusers must have a password')
        
        if email is None:
            raise TypeError("Superusers must have an email.")
        
        if username is None:
            raise TypeError('Superusers must have an username.')
        
        user = self.create_user(username, email, password, **kwargs)
        user.is_superuser = True
        user.is_staff = True
        user.save(using = self.db)

    def change_password(self, email, old_password, new_password):
        user = self.get(email = email)
        if user.check_password(old_password):

            user.set_password(new_password)
            user.save(using = self.db)
            return user
        return False
        

class User(AbstractModel, AbstractBaseUser, PermissionsMixin):

    username = models.CharField(db_index=True,
                                max_length=255,
                                unique=True)

    first_name = models.CharField(max_length=255)

    last_name = models.CharField(max_length=255)

    email = models.EmailField(db_index=True,
                                unique=True)

    is_active = models.BooleanField(default=True)

    is_superuser = models.BooleanField(default=False)

    bio = models.TextField(blank=True)

    avatar = models.ImageField(null=True,
                                blank = True,
                                upload_to = user_directory_path)

    posts_liked = models.ManyToManyField(
        "core_post.Post",
        related_name = "liked_by"
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def __str__(self):
        return f"{self.email}"

    @property
    def name(self):
        return f"{self.first_name} {self.last_name}"

    
    def like(self, post):
        """Like `post` if it hasn't been done yest"""
        return self.posts_liked.add(post)
    
    def remove_like(self, post):
        """Remove a like from a `post`"""
        return self.posts_liked.remove(post)
    
    def has_liked(self, post):
        """Return True if the user has liked a
        `post`; else False"""
        return self.posts_liked.filter(pk = post.pk).exists()
