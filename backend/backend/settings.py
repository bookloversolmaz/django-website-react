from pathlib import Path
import os
import dj_database_url
import environ

env = environ.Env()
environ.Env.read_env()

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FRONTEND_DIR = os.path.join(BASE_DIR, '..', 'frontend', 'build')

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [FRONTEND_DIR, '/build'],  # Ensure this points to the React build directory
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

PORT = os.getenv('PORT', 8000)  # Default to 8000 if PORT is not provided

# Define the URL for accessing static files
STATIC_URL = '/static/'

# Directory where collectstatic will copy all static files
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Additional locations of static files (e.g., React build directory's static folder)
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, '..', 'frontend', 'build', 'static'),  # React's static files
]

DEBUG = False
# Configure Django to handle static file serving in production
if not DEBUG:
    STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Set your secret key from the .env file
SECRET_KEY = env('SECRET_KEY')
DEBUG = False

# SET BELOW TO TRUE WHEN RUNNING IN PRODUCTION
SECURE_SSL_REDIRECT = True  
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# Allowed hosts
ALLOWED_HOSTS = ['solmazpurser.com', 'www.solmazpurser.com', '127.0.0.1', 'localhost', 'django-website-react.onrender.com', 'django-website-react-1.onrender.com']

# Email settings for SendGrid
SENDGRID_API_KEY = env('SENDGRID_API_KEY')
DEFAULT_FROM_EMAIL = env('DEFAULT_FROM_EMAIL')
REPLY_TO_EMAIL = env('DEFAULT_FROM_EMAIL')
SENDGRID_SANDBOX_MODE_IN_DEBUG = False

EMAIL_BACKEND = 'sendgrid_backend.SendgridBackend'
EMAIL_HOST = 'smtp.sendgrid.net'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'apikey'  # SendGrid username is always 'apikey'
EMAIL_HOST_PASSWORD = SENDGRID_API_KEY

DATABASES = {
    'default': dj_database_url.config(
        default=os.getenv('DATABASE_URL'),
        conn_max_age=600,
        ssl_require=True,
    )
}
# EMAIL_HOST_PASSWORD  config('SENDGRID_API_KEY'
# SECRET_KEY = config('SECRET_KEY')
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': config('DATABASE_NAME'),
#         'USER': config('DATABASE_USER'),
#         'PASSWORD': config('DATABASE_PASSWORD'),
#         'HOST': config('DATABASE_HOST'),
#         'PORT': config('DATABASE_PORT'),
#     }
# }
# DEFAULT_FROM_EMAIL = config('DEFAULT_FROM_EMAIL')
# SENDGRID_API_KEY = config('SENDGRID_API_KEY')


STORAGE = {
    "default":{
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedStaticFilesStorage"
    }
}

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'backend',
    'home',
    'projects',
    'todo',
    'writing',
    'contact',
    'rest_framework',
    'corsheaders',
    'whitenoise.runserver_nostatic',
    'sendgrid'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# REST Framework Settings
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ], 
}

# CORS settings
CORS_ALLOW_HEADERS = [
    'content-type',
    'accept',
    'authorization',
    'x-csrftoken',
    'object',
]

CORS_ALLOWED_ORIGINS = [
    'https://solmazpurser.com',
    'http://localhost:3000',  # React frontend during development
    'http://127.0.0.1:3000',  # React frontend during development
    'http://localhost:8000',  # Django backend in development
    'https://django-website-react-1.onrender.com',
]

CORS_ALLOW_METHODS = [
    'DELETE', 'GET', 'OPTIONS', 'PATCH', 'POST', 'PUT',
]

CORS_ALLOW_CREDENTIALS = True  # Allow credentials like cookies or authorization headers

ROOT_URLCONF = 'backend.urls'

ASGI_APPLICATION = 'backend.asgi.application'

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

CSRF_COOKIE_NAME = "csrftoken"
CSRF_TRUSTED_ORIGINS = ['https://solmazpurser.com', 'http://127.0.0.1', 'http://localhost', 'https://django-website-react.onrender.com', 'https://django-website-react-1.onrender.com']  # Add your frontend domain
CSRF_COOKIE_SECURE = True  # HTTPS-only
SESSION_COOKIE_SAMESITE = 'Lax'

# Localization
LANGUAGE_CODE = 'en-gb'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
