from django.shortcuts import render, reverse
from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse
from django.contrib.auth import login, logout, authenticate
from .forms import  AuthForm
import requests
import json
from django.contrib.auth.models import User
from .models import VisitedBooks
import datetime
preventAnon = hash('AnonymousUser')
from .getAllPossibleKeys import *
from .getBookKeysPage import *
from django.template.defaulttags import register

@register.filter
def get_range(value):
    return range(value)

# Create your views here.
def index(request):
    """
    with open('sample.png', 'wb') as f:
        f.write(tmp.content) """
    user = request.user
    #print(User.objects.get())
    if user.is_authenticated:
        #print('TUSERRR', user)
        flag = 1
        books = User.objects.get(username=user).books_viewed.all()
        context = {
            'form': AuthForm(),
            'user': user,
            'isUser': flag,
            "booksList": books,
            'tmpList': [1, 2, 3, 4, 5]
        }
        #print(books)
        return render(request, 'bookshelf/index.html', context=context, status=200)
    else:
        flag = 0
        books = []
        context = {
            'form': AuthForm(),
            'user': user,
            'isUser': flag,
            "booksList": books
        }
        return render(request, 'bookshelf/index.html', context=context, status=200)

def authenticateUser(request):
    #form = AuthForm(request.POST)
    #print(form.is_valid())
    username = request.POST["username"]
    password = request.POST["password"]
    auth = authenticate(request, username=username, password=password)
    if auth is not None:
        login(request, auth)
        return HttpResponseRedirect(reverse('index'))
    else:
        raise Http404("This user doesn't exist or the password is incorrect " + username)

def logoutUser(request):
    user = request.user
    if user is not None:
        logout(request)
        return HttpResponseRedirect(reverse('index'))

def getbooks(request):

    if request.method == 'POST' and request.is_ajax:
        url_ = request.body.decode('utf-8')
        url_ = json.loads(url_)
        url_ = url_["url_value"]
        #print(url_)
        req = requests.get("https://www.googleapis.com/books/v1/volumes?q=" + url_).json()
        #print(req['totalItems'])
        #print('red', req)
        items = list(req['items'])
        if len(items) > 0:
            #totalNumber = req['totalItems']
            itemsReturned = []
            #print(len(items))
            for ind in range(0, len(items)):
                #print(ind)
                itemsReturned.append(getAllKeyValuePairs(items[ind]))

            #print('\n\n', items[0]['volumeInfo'], '\n\n')
            return JsonResponse({'data': itemsReturned, 'numItems': len(items)})

        else:
            return Http404('I wasn\'t able to find this book')
    else:
        return Http404('I willn\'t allow get methods because it would defeat the purpose of this project.')

def bookpage(request, bookid):
    try:
        req = requests.get("https://www.googleapis.com/books/v1/volumes/" + bookid).json()
        user = request.user
        flag = 0
        rating = -1
        if user.is_authenticated:
            flag = 1
            currentuser = User.objects.get(username=user)
            print(currentuser)

            date = datetime.datetime.now().strftime("%Y-%m-%d|%H:%M:%S")
            try:
                #print(currentuser)
                book = VisitedBooks(bookid=req['id'], user_id= currentuser, img_url= str(req['volumeInfo']['imageLinks']['thumbnail']), title=req['volumeInfo']['title'], date=date)
                #print(book)
                book.save()
            #except VisitedBooks.DoesNotExist:

            except:
                print('This book already exist')
                pass
            try: 
                rating = VisitedBooks.objects.get(user_id=currentuser, bookid=req['id']).rating -1
            except TypeError:
                rating = -1
            except VisitedBooks.DoesNotExist:
                rating = -1
        print(rating)
        data = getKeysPage(req)
        data['rating'] = rating
        #print(currentuser)
        #print(currentuser.books_viewed.all())
        if user.is_authenticated:
            return render(request, 'bookshelf/getbook.html', context={'isUser':flag, 'data': data, 'form': AuthForm(), 'booksList': currentuser.books_viewed.all()})
        return render(request, 'bookshelf/getbook.html', context={'isUser':flag, 'data': data, 'form': AuthForm(), 'booksList': []})
    except KeyError:
        return HttpResponseRedirect(reverse('index'))

def updateRating(request):
    user = request.user
    bookid = request
    if user.is_authenticated:
        data = request.body.decode('utf-8')
        data = json.loads(data)
        bookid = data["bookid"]
        rating = data["rate"] + 1
        try:
            book = User.objects.get(username=user).books_viewed.get(bookid=bookid)
            book.rating = rating 
            #print(book.rating)
            book.save()
            return JsonResponse({'ind': rating})
        except:
            return JsonResponse({'ind': rating})
        
    else:
        return JsonResponse({'ind': -1})