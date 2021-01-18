from django.urls import path, include
from . import views
urlpatterns = [
    path('', views.index, name="index"),
    path('book/<slug:bookid>', views.bookpage, name='bookpage'),
    path('login', views.authenticateUser, name='login'),
    path('logout', views.logoutUser, name='logout'),
    path('updaterating', views.updateRating, name='updaterating'),
    path('getbooks', views.getbooks, name='getbooks')
]