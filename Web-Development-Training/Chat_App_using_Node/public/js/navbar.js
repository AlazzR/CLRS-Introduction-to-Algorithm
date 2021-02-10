document.addEventListener("DOMContentLoaded", ()=>{
    function replaceHref(){
        document.getElementById("home").setAttribute("href", "/me/rooms/" + localStorage.getItem("token"));
    }
    document.getElementById("home").onclick = ()=>{
        replaceHref();
    };
    document.querySelector(".nav-button").onclick = ()=>{
        if(document.getElementById("options").style.display === "none")
            document.getElementById("options").style.display = "inline-block"
        else
            document.getElementById("options").style.display = "none"
    }
    document.getElementById("upload-image").onclick = ()=>{
        window.location.href = "/users/me/pages/uploadAvatar";
    }
    document.getElementById("logout").onclick = ()=>{
        axios({
            method: "get",
            url: "/users/me/logout", 
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res =>{
            window.location.href = "/"
        }).catch(err => console.log(err));
    }    
});