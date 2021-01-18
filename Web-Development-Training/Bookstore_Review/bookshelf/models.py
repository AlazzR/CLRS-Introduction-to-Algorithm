from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class VisitedBooks(models.Model):
    bookid = models.CharField(max_length=128, blank=False, default='None')
    user_id = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name="books_viewed")
    img_url = models.URLField(max_length=2048)
    title = models.CharField(max_length=256)
    date = models.CharField(max_length=128)
    rating = models.IntegerField(null=True)

    class Meta:
        unique_together = ("user_id", "bookid")
    def __str__(self):
        return f"{self.user_id}:{self.bookid}->{self.title} on {self.date}"
