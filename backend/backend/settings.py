from pathlib import Path
import environ
import os
import cloudinary

BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env()

# Read .env locally if present
environ.Env.read_env(BASE_DIR / ".env")

FRONTEND_DIR = BASE_DIR.parent / "frontend" / "build"

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

cloudinary.config(
    cloud_name=env("CLOUDINARY_CLOUD_NAME"),
    api_key=env("CLOUDINARY_API_KEY"),
    api_secret=env("CLOUDINARY_API_SECRET")
)

CLOUDINARY_STORAGE = {
    "CLOUD_NAME": env("CLOUDINARY_CLOUD_NAME"),
    "API_KEY": env("CLOUDINARY_API_KEY"),
    "API_SECRET": env("CLOUDINARY_API_SECRET"),
}

STORAGES = {
    "default": {
        "BACKEND": "cloudinary_storage.storage.MediaCloudinaryStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

PORT = env.int("PORT", default=8000)
# Default to 8000 if PORT is not provided

# Define the URL for accessing static files
STATIC_URL = '/static/'

# Directory where collectstatic will copy all static files
STATIC_ROOT = BASE_DIR / "staticfiles"

# Additional locations of static files (e.g., React build directory's static folder)
STATICFILES_DIRS = [
    BASE_DIR.parent / "frontend" / "build" / "static",
]

# DEBUG = os.environ.get("DEBUG", "False") == "True"

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
        },
    },
    "root": {
        "handlers": ["console"],
        "level": "ERROR",
    },
}

# Set your secret key from the .env file
SECRET_KEY = env('SECRET_KEY')

# SET BELOW TO TRUE WHEN RUNNING IN PRODUCTION
SECURE_SSL_REDIRECT = True  

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# Allowed hosts
ALLOWED_HOSTS = ['solmazpurser.com', 'www.solmazpurser.com', '127.0.0.1', 'localhost', 'django-website-react.onrender.com', 'django-website-react-1.onrender.com']

# Email settings for RESEND

EMAIL_BACKEND = 'anymail.backends.resend.EmailBackend'
ANYMAIL = {
    "RESEND_API_KEY": env("RESEND_API_KEY"),
}

DEFAULT_FROM_EMAIL = env(
    "DEFAULT_FROM_EMAIL",
    default="onboarding@resend.dev",
)

CONTACT_TO_EMAIL = env(
    "CONTACT_TO_EMAIL",
    default="your_email@example.com",
)

DATABASES = {
    "default": env.db()
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
    'writing',
    'contact',
    'rest_framework',
    'corsheaders',
    'whitenoise.runserver_nostatic',
    'anymail',
    "cloudinary",
    "cloudinary_storage",
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