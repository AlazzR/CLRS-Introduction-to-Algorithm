document.addEventListener("DOMContentLoaded", ()=>{
    axios({
        method: "get",
        url: "/users/me/avatar",
        headers:{
            "Authorization": localStorage.getItem("token")
        }
    }).then(response =>{
        //console.log(response.data.image)
        document.getElementById("profileImage").src = "data:image/jpg;base64," +  response.data.image;
    }).catch(err =>{
        console.log(err);
    })
})