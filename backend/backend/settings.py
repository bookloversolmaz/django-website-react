from pathlib import Path
import os
import dj_database_url

# from environ import Env
# env = Env()
# env.read_env()

import environ
env = environ.Env()
environ.Env.read_env()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False
# Set your secret key from the .env file
SECRET_KEY = env('SECRET_KEY')

# Allowed hosts
ALLOWED_HOSTS = ['solmazpurser.com', 'www.solmazpurser.com', '127.0.0.1', 'localhost']

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

# DATABASES = {
#     'default': env.db('DATABASE_URL') {
#         'URL': env("DATABASE_URL"),
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': env("DATABASE_NAME"),
#         'USER': env("DATABASE_USER"),
#         'PASSWORD': env("DATABASE_PASSWORD"),
#         'HOST': env("DATABASE_HOST"),
#         'PORT': env("DATABASE_PORT"),
#         'TEST': {
#             'NAME': env("DATABASE_TEST"),
#         }
#     } 
# }

# DATABASES = {
#     'default': env.db(
#         # Replace this value with your local database's connection string.
#         default=env.db('DATABASE_URL'),
#         conn_max_age=600
#     )
# } 

DATABASES = {
    'default': dj_database_url.config(
        default=env('DATABASE_URL')
    )
}

# Additional settings can be added separately
DATABASES['default'].update({
    'ENGINE': 'django.db.backends.postgresql',
    'NAME': env('DATABASE_NAME'),
    'USER': env('DATABASE_USER'),
    'PASSWORD': env('DATABASE_PASSWORD'),
    'HOST': env('DATABASE_HOST'),
    'PORT': env('DATABASE_PORT'),
    'TEST': {
        'NAME': env('DATABASE_TEST'),
    },
    'CONN_MAX_AGE': 600,  # This sets the database connection max age
})
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
    'django-environ',
    'backend',
    'home',
    'projects',
    'todo',
    'writing',
    'contact',
    'rest_framework',
    'corsheaders',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
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
]

CORS_ALLOW_METHODS = [
    'DELETE', 'GET', 'OPTIONS', 'PATCH', 'POST', 'PUT',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
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

ASGI_APPLICATION = 'backend.asgi.application'

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Localization
LANGUAGE_CODE = 'en-gb'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True
# Base directory for project
BASE_DIR = Path(__file__).resolve().parent.parent

# Static files settings
STATIC_URL = '/static/'

# Static files directory to collect all static files (for production)
STATIC_ROOT = BASE_DIR/'staticfiles'

# Directory where React static files are located (during development)
STATICFILES_DIRS = [
    BASE_DIR / 'frontend/build/static',  # Path to React build output
]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            BASE_DIR / 'frontend/build',  # React build index.html
        ],
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


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'