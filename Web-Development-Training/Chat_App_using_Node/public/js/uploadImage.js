document.addEventListener("DOMContentLoaded", async()=>{
    const form = document.querySelector("form");
    const button = document.getElementById("upload");
    button.disabled = true;
    await axios({
        method: "get",
        url: "/users/me/uploadAvatar",
        headers:{
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }).then(response =>{
        console.log(response.data.token)
        document.getElementById("username").innerHTML = response.data.username;
        localStorage.setItem("token", response.data.token);
    }).catch(err =>{
        console.log(err);
    });

    document.getElementById("skip").onclick = ()=>{
        window.location.href = "/me/rooms/" + localStorage.getItem("token");
    }

    form.elements["profileimage"].onchange = ()=>{
        if(form.elements["profileimage"].value.toLowerCase().match(/\.(png|jpg|jpeg)/).length !== 0)
            button.disabled = false;
        else
            button.disabled = true;
    }

    form.onsubmit = (event)=>{
        event.preventDefault();
        const formData = new FormData();
        //console.log(document.querySelector("#img-to-upload").files)
        formData.append("profile", document.querySelector("#img-to-upload").files[0]);
        axios.post("/users/me/avatar", formData, {
            headers:{
                "Authorization": localStorage.getItem("token"),
                "Content-type": 'multipart/form-data'
            }
        }).then(response =>{
            //console.log(response.data);
            window.location.href = "/me/rooms/" + localStorage.getItem("token");
        }).catch(err =>{
            console.log(err);
        })
    }
})