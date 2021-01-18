from django import forms
from django.core.exceptions import ValidationError
def checkPassword(word):
    print(word)

class AuthForm(forms.Form):
    username = forms.CharField(label='Enter your username- ', max_length=64, min_length=5, help_text="Please enter a username with at least 5 characters.")
    username.widget.attrs['placeholder'] ='Enter your username'
    
    password = forms.CharField(label="Enter your password ", max_length=128, widget=forms.PasswordInput, min_length=5,help_text="Enter a password of at least 5 characters.", validators=[checkPassword]) 
    password.widget.attrs['placeholder'] ='Enter your password'


""" class AuthForm(forms.ModelForm):
    username = forms.CharField(label='Enter your username- ', max_length=64, min_length=5, help_text="Please enter a username with at least 5 characters.")
    username.widget.attrs['placeholder'] ='Enter your username'
    
    password = forms.CharField(label="Enter your password ", max_length=128, widget=forms.PasswordInput, min_length=5,help_text="Enter a password of at least 5 characters.", validators=[checkPassword]) 
    password.widget.attrs['placeholder'] ='Enter your password'

    class Meta:
        model = RawAuthForm

    def clean_username(self, *args, **kwargs):
        username = self.cleaned_data.get('username')
        if len(list(self.username)) > 3:
            raise forms.ValidationError(_('Invalid Username: %{value}'), params={'value': self.username})
        return username
    
    def clean_username(self, *args, **kwargs):
        password = self.cleaned_data.get('password')
        if len(list(self.username)) > 3:
            raise forms.ValidationError(_('Invalid password: %{value}'), params={'value': self.password})
         





 """