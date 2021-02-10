
document.addEventListener("DOMContentLoaded", ()=>{
    const form = document.querySelector("form");
    const button = document.querySelector("button");
    button.disabled = true;
    let count = {};
    //Removing rejection messages in case of user interacted with the UI
    form.elements["username"].onchange = ()=>{
        document.getElementById("userName-rejection").style.display = "none";

        if(form.elements["username"].value.length >= 5  &&  form.elements["username"].value.length < 32)
            count["username"] = 0;
        else
        {
            if(Object.keys(count).includes("username"))
                delete count["username"];
            document.getElementById("userName-rejection").style.display = "inline";
        }

        if(Object.keys(count).length === 3)
            button.disabled = false;
        else 
            button.disabled = true;

    }
    form.elements["email"].onchange = () => {
        console.log(Object.keys(count).length)
        document.getElementById("email-rejection").style.display = "none";
        if(form.elements["email"].value.length !== 0 && validator.isEmail(form.elements["email"].value))
            count["email"] = 0;
        else
        {
            if(Object.keys(count).includes("email"))
                delete count["email"];
            document.getElementById("email-rejection").style.display = "inline";
            
        }

        if(Object.keys(count).length === 3)
            button.disabled = false;
        else
            button.disabled = true;

    }
    form.elements["password"].onchange = ()=>{
        //console.log("password")
        document.getElementById("password-rejection").style.display = "none";

        if(form.elements["password"].value.length !== 0 && validator.isStrongPassword(form.elements["password"].value, {minLength:8, minUpperCase:1, minSymbols:1}))
            count["password"] = 0;
        else
        {
            if(Object.keys(count).includes("password"))
                delete count["password"];
            document.getElementById("password-rejection").style.display = "inline";
            
        }

        if(Object.keys(count).length === 3)
            button.disabled = false;
        else
            button.disabled = true;
    }

    //Submit form, can't redirect when axios is involved
    form.onsubmit = async(event)=>{
        event.preventDefault();
        await axios.post("/users/signup", {
            userName: form.elements["username"].value,
            email: form.elements["email"].value,
            password: form.elements["password"].value 
        }).then( response =>{
            //console.log(response.data.token)
            window.localStorage.setItem("token", response.data.token);
            //alert(window.localStorage.getItem("token"))
            window.location.href = "/users/me/pages/uploadAvatar";
        }).catch(err =>{
            console.log(err)
            for(let error of err.response.data)
            {
                document.getElementById(error + "-rejection").style.display = "inline";
            }
        });
    } 
});