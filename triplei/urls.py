from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView
from . import views
urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/',include('users.urls')),
    re_path('.*',TemplateView.as_view(template_name='index.html'))
]


