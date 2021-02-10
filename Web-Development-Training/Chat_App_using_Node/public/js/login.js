document.addEventListener("DOMContentLoaded", ()=>{
    const form = document.querySelector("form");
    const button = document.querySelector("button");
    button.disabled = true;
    let count = {};
    //Removing rejection messages in case of user interacted with the UI
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

        if(Object.keys(count).length === 2)
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

        if(Object.keys(count).length === 2)
            button.disabled = false;
        else
            button.disabled = true;
    }
    form.onsubmit = (event)=>{
        event.preventDefault();
        axios({
            method: "post",
            url: "/users/login",
            data:{
                email: form.elements["email"].value,
                password: form.elements["password"].value
            }
        }).then(response =>{
            window.localStorage.setItem("token",response.data.token);
            window.location.href = "/me/rooms/" + localStorage.getItem("token");
        }).catch(err=>{
            document.getElementById("email-rejection").style.display = "inline";
            document.getElementById("password-rejection").style.display = "inline";

        });
    }

});