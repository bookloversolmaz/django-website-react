import os
import environ
env = environ.Env()
environ.Env.read_env()
import os
import psycopg2
from urllib.parse import urlparse

# Parse DATABASE_URL if available
DATABASE_URL = os.getenv('DATABASE_URL')

if DATABASE_URL:
    url = urlparse(DATABASE_URL)
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': url.path[1:],  # remove the leading '/'
            'USER': url.username,
            'PASSWORD': url.password,
            'HOST': url.hostname,
            'PORT': url.port,
            'OPTIONS': {
                'sslmode': 'require',  # Enforce SSL connection
            }
        }
    }
else:
    # Fallback to your default DATABASE settings
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.getenv('DATABASE_NAME'),
            'USER': os.getenv('DATABASE_USER'),
            'PASSWORD': os.getenv('DATABASE_PASSWORD'),
            'HOST': os.getenv('DATABASE_HOST'),
            'PORT': '5432',
            'OPTIONS': {
                'sslmode': 'require',  # Enforce SSL connection
            }
        }
    }


# Other necessary settings like `DEBUG`, `ALLOWED_HOSTS`, etc.
DEBUG = False
ALLOWED_HOSTS = ['solmazpurser.com', 'www.solmazpurser.com', '127.0.0.1', 'localhost', 'django-website-react.onrender.com', 'django-website-react-1.onrender.com']