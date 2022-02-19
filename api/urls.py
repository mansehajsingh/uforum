"""api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path
from . import views

from django.urls import path

urlpatterns = [
    path('', views.base, name="base"),
    path('create-user', views.create_user, name="create-user"),
    path('login', views.login, name="login"),
    path('logout', views.logout, name="logout"),
    path('create-community', views.create_community, name="create-community"),
    path('communities', views.get_communities, name="communities"),
    path('communities/<str:community_id>', views.get_community, name="community")
]