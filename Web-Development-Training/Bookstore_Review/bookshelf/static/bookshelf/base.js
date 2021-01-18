document.addEventListener('DOMContentLoaded', ()=>{
    let boolUser = isUser == 1;
    //console.log('xxxx', boolUser)
    if(boolUser === false)
    {
        //console.log('sssssssssss')
        document.getElementById('login').disabled = false;
        document.getElementById('logout').disabled = true;
        document.getElementById('login-submit').disabled = true;
        document.getElementById('logout').classList.add('disabled');
        document.getElementById('login').onclick = (button)=>{
            //console.log(document.getElementById('login').parentElement.childNodes[3].classList);
            if(document.getElementById('login').parentElement.childNodes[3].classList[0] == 'sign-in' && document.getElementById('login').parentElement.childNodes[3].classList[1] == 'disable')
            {
                document.getElementById('login').parentElement.childNodes[3].classList.remove('disable');
                document.getElementById('logout').parentElement.childNodes[3].classList.add('disable');
    
            }
            else
                document.getElementById('login').parentElement.childNodes[3].classList.add('disable');
        };
    }
    else{
        document.getElementById('login').disabled = true;
        document.getElementById('logout').disabled = false;
        document.getElementById('login').classList.add('disabled');
        document.getElementById('logout').onclick = (button)=>{
            //console.log(document.getElementById('logout').parentElement.childNodes[3].classList);
            if(document.getElementById('logout').parentElement.childNodes[3].classList[0] == 'sign-in' && document.getElementById('logout').parentElement.childNodes[3].classList[1] == 'disable')
            {
                document.getElementById('logout').parentElement.childNodes[3].classList.remove('disable');
                document.getElementById('login').parentElement.childNodes[3].classList.add('disable');
            }
            else
                document.getElementById('logout').parentElement.childNodes[3].classList.add('disable');
        };
    }

    
    document.getElementById('id_username').addEventListener('change', (event)=>{
        if(String(event.target.value).length >= 5 && document.getElementById('id_password').value.length >= 5)
            document.getElementById('login-submit').disabled = false;
        else
            document.getElementById('login-submit').disabled = true;
    });
    document.getElementById('id_password').addEventListener('change', (event)=>{
        if(String(event.target.value).length >= 5 && document.getElementById('id_username').value.length >= 5)
            document.getElementById('login-submit').disabled = false;
        else
            document.getElementById('login-submit').disabled = true;
    });
});