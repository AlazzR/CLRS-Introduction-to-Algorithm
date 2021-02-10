var post = Handlebars.compile(document.getElementById("chat-post-template").innerHTML);

document.addEventListener("DOMContentLoaded", ()=>{
    //socket.emit("message", {data: "Rashid"});
    var socket = io();

    
    const user = Handlebars.compile(document.getElementById("chat-layout").innerHTML);
    var users;
    const roomname = location.pathname.split("/");
    socket.emit("joining-room", {roomname: roomname[roomname.length - 1], userToken: localStorage.getItem("token")});

    //get posts
    socket.on("room-joined", ({roomname, flag=false})=>{
        const roomname_ = location.pathname.split("/");
        console.log(flag)
        if(flag)
        {         
            //The room was deleted by the adminstrater
            console.log("Admin have deleted this room.")
            window.location.href = "/";
        }
        //console.log(roomname_[roomname_.length - 1], '-', roomname)
        if(roomname ===  roomname_[roomname_.length - 1])
        {
            document.getElementById("posts").innerHTML = "";
            document.getElementById("chat-users-ul").innerHTML = "";

            //update the posts and users
            getPosts(roomname_, socket);
            //getusers names
            axios({
                method: 'post', 
                url: "/rooms/userslist",
                headers:{
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                data:{
                    roomName: roomname_[roomname_.length - 1]
                }
            }).then(response =>{
                //console.log(response.data.userNames)
                for(let ind=0; ind < response.data.userNames.length; ind++)
                {
                    const li = document.createElement("li");
                    li.innerHTML += user({"name": response.data.userNames[ind], "src": "data:image/jpg;base64," + response.data.images[ind]});
                    li.style.marginLeft = "-40px";
                    li.style.padding = "5px";
                    li.style.border = "1px solid white";
                    document.getElementById("chat-users-ul").appendChild(li);
            }}).catch(err =>{
                console.log(err);
            });
        }
        else 
        {   
            console.log("-------");
            window.location.href = "/";

        }

    });
    getPosts(roomname, socket);
    //getusers names
    axios({
        method: 'post', 
        url: "/rooms/userslist",
        headers:{
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        data:{
            roomName: roomname[roomname.length - 1]
        }
    }).then(response =>{
        console.log(response.data.userNames)
        for(let ind=0; ind < response.data.userNames.length; ind++)
        {
            const li = document.createElement("li");
            li.innerHTML += user({"name": response.data.userNames[ind], "src": "data:image/jpg;base64," + response.data.images[ind]});
            li.style.marginLeft = "-40px";
            li.style.padding = "5px";
            li.style.border = "1px solid white";
            document.getElementById("chat-users-ul").appendChild(li);
        } 
    }).catch(err =>{
        console.log(err);
    });

    //posting messages
    const send = document.getElementById("send");
    send.disabled = true;
    document.querySelector("textarea").onchange = ()=>{
        document.getElementById("letter-count").innerHTML = document.querySelector("textarea").value.length;
        if(document.querySelector("textarea").value.length >= 5 &&  document.querySelector("textarea").value.length <= 250)
        {
            send.disabled = false;
            document.getElementById("letter-insufficient").style.display = "none";

        }
        else
        {
            send.disabled = true;
            document.getElementById("letter-insufficient").style.display = "flex";
            document.getElementById("letter-insufficient").style.flexDirection = "top";
        }
    }

    document.querySelector("form").onsubmit = (event)=>{
        event.preventDefault();
        const content = document.querySelector("textarea").value;
        document.querySelector("textarea").value = "";
        document.getElementById("letter-count").innerHTML = "";
        send.disabled = true;
        const roomname_ = roomname[roomname.length - 1];
        sendPost(roomname_, content, socket, false);

 
    }

   document.getElementById("location").onclick = () =>{
        const nav = navigator.geolocation;
        if(nav)
        {
            nav.getCurrentPosition((positon) =>{
                //console.log(positon)
                const url = "https://www.google.com/maps?q=" + positon.coords.latitude + ',' + positon.coords.longitude;
                sendPost(roomname[roomname.length - 1], "https://www.google.com/maps?q=" + "#########" + ',' + "#########", socket, true);
            }, err => console.log(err))
        }
    };
    
});

function sendPost(roomname_, content, socket, flag)
{
    axios({
        method: 'post',
        url: '/posts',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        data:{
            roomName: roomname_,
            content: content
        }
    }).then(response =>{
        document.querySelector("textarea").value = "";
        //console.log(response);
        const li = document.createElement("li");
        if(!flag && response.data.content.slice(0, 5) !== "https")
            li.innerHTML += post({"id":response.data.postid, "username": response.data.username, "content": response.data.content, "date": response.data.createdAt});
        else
            li.innerHTML += post({"id":response.data.postid, "username": response.data.username, "url": response.data.content, "date": response.data.createdAt});

        li.style.padding = "10px";
        li.style.width = "50%"
        li.style.borderRadius = "20%";
        if(localStorage.getItem("userName") === response.data.username)
        {
            li.style.margin = "5px";
            li.style.backgroundColor = "#4d4dff";
            li.style.marginLeft = "47%"

        }
        else{
            li.style.margin = "5px";
            li.style.backgroundColor = "#669999";
        }

        document.getElementById("posts").appendChild(li);
        //post the new post
        socket.emit("posted-new-post", {roomname: roomname_, token: localStorage.getItem("token")});
        //scroll to the new post.
        document.getElementById("div-posts").scrollTop = document.getElementById("posts").lastElementChild.scrollHeight + parseInt(getComputedStyle(document.getElementById("posts")).height);

        if(localStorage.getItem("userName") !== response.data.username)
            document.getElementById("button-" +  response.data.postid).disabled = true;
        else{   
               document.getElementById("button-" +  response.data.postid).onclick = (event)=>{
                axios({
                method: "delete",
                url: "/posts", 
                headers:{
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                data:{
                    _id: response.data.postid
                }
            }).then(response =>{
                //console.log(response.data._id);
                window.location.href = "/rooms/redirect/" + roomname_ + "/" + localStorage.getItem("token");
            }).catch(err =>{
                console.log(err);
            })
        }

        }   
    }).catch(err =>{
        console.log(err);
    })
}

function getPosts(roomname, socket){
    axios({
        method: "get",
        url: "/posts/" + roomname[roomname.length - 1],
        headers:{
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }).then(response =>{
        console.log(response.data.posts)
        response.data.posts.forEach(postItem =>{
            const user = postItem.User;
            const li = document.createElement("li");
            if(postItem.content.slice(0, 5) !== "https")
                li.innerHTML += post({"id":postItem.postid, "username": user.userName, "content": postItem.content, "date": postItem.createdAt});
            else
                li.innerHTML += post({"id":postItem.postid, "username": user.userName, "url": postItem.content, "date": postItem.createdAt});
            li.style.padding = "10px";
            li.style.width = "50%"
            li.style.borderRadius = "20%";
            if(localStorage.getItem("userName") === user.userName)
            {
                li.style.margin = "5px";
                li.style.backgroundColor = "#4d4dff";
                li.style.marginLeft = "47%"

            }
            else{
                li.style.margin = "5px";
                li.style.backgroundColor = "#669999";
            }
            document.getElementById("posts").appendChild(li);
            document.getElementById("div-posts").scrollTop = document.getElementById("posts").lastElementChild.scrollHeight + parseInt(getComputedStyle(document.getElementById("posts")).height);
            if(localStorage.getItem("userName") !== user.userName)
                document.getElementById("button-" +  postItem.postid).disabled = true;
            //delete posts
            document.querySelectorAll(".delete-post").forEach(item =>{
                //console.log(item)
                item.onclick = ()=>{
                    axios({
                        method: "delete",
                        url: "/posts", 
                        headers:{
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        },
                        data:{
                            _id: item.id.split('button-')[1]
                        }
                    }).then(response =>{
                        //console.log(response.data._id);
                        socket.emit("delete-post", {roomname: roomname[roomname.length - 1], token: localStorage.getItem("token")})
                        window.location.href = "/rooms/redirect/" + roomname[roomname.length - 1] + "/" + localStorage.getItem("token");
                    }).catch(err =>{
                        console.log(err);
                    })
                }});
            });})
            .catch(err =>{
                console.log(err);
            })
}

const autoscroll = () => {
    // New message element
    const lastPost = document.getElementById("posts").lastElementChild;

    // Height of the new message
    const lastPostStyle = getComputedStyle(lastPost);
    const lastPostMargin = parseInt(lastPostStyle.marginBottom);
    const lastPostHeight = lastPost.offsetHeight + lastPostMargin;

    // Visible height
    const visibleHeight = document.getElementById("posts").offsetHeight;

    // Height of messages container
    const containerHeight = document.getElementById("posts").scrollHeight;

    // How far have I scrolled?
    const scrollOffset =    document.getElementById("posts").scrollTop + visibleHeight;

    if (containerHeight - lastPostHeight <= scrollOffset) {
        document.getElementById("posts").scrollTop = document.getElementById("posts").scrollHeight;
    }
}
