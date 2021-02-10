document.addEventListener("DOMContentLoaded", ()=>{
    const socket = io();
    const room_template = Handlebars.compile(document.getElementById("room-shape").innerHTML);
    const ul = document.getElementById("rooms-list");
    const ul_logged = document.getElementById("loggedin-rooms-list");

    const roomsList = rooms.split(",");
    const adminsList = admins.split(",");
    //All available room
    if(roomsList[0] !== "" )
    {        
        for(let ind=0; ind < roomsList.length; ind++)
        {
            ul.innerHTML += room_template({"roomName": roomsList[ind], "adminName": adminsList[ind], "join": "join-" + roomsList[ind], "exit": "exit-" + roomsList[ind]});
            document.getElementById("exit-" + roomsList[ind]).disabled = true;
            document.getElementById("join-" + roomsList[ind]).disabled = false;
    
        }
    }

    //logged in rooms
    const logED = logged.split(",");
    const adminED = loggedAdminList.split(",");
    if(logED[0] !== "")
    {
        for(let ind=0; ind < logED.length; ind++)
        {
            ul_logged.innerHTML += room_template({"roomName": logED[ind], "adminName": adminED[ind], "join": "join-" + logED[ind], "exit": "exit-" + logED[ind]});

        }
    }
    //Events for join/exit
    //join event
    document.querySelectorAll(".join-buttons").forEach(button =>{
        const roomname = button.id.split("-")[1];
        //console.log("/rooms/" + roomname + "/" + localStorage.getItem('token'))

        button.onclick = ()=>{
            axios({
                    method:"post",
                    url: "/rooms/users",
                    headers:{
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    },
                    data:{
                        "roomName": roomname
    
                    }  
                }).then(response =>{
                    console.log(response.msg);
                    //Go to the room
                    window.location.href = "/rooms/redirect/" + roomname + "/" + localStorage.getItem("token"); 
                }).catch(err =>{
                    console.log(err);
                });
            }
    });
    //exit-event
    document.querySelectorAll(".exit-buttons").forEach(button =>{
        const roomname = button.id.split("-")[1];
        console.log(logED.length)
        //console.log("/rooms/" + roomname + "/" + localStorage.getItem('token'))
        for(let ind = 0; ind < logED.length; ind++)
        {
            if(logED[ind] === roomname && adminED[ind] === username)
            {
                console.log(logED[ind], '-', roomname, '-', adminED[ind], '-', username);
                button.onclick = ()=>{
                    axios({
                            method:"delete",
                            url: "/rooms/delete/" + roomname + "/" + username,
                            headers:{
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            },
                            data:{
                                "roomName": roomname
            
                            }  
                        }).then(response =>{
                            console.log(response.data.msg);
                            //Go to the room
                            socket.emit('remove-user', {roomname, token: localStorage.getItem("token"), flag: true});

                            window.location.href = "/me/rooms/" + response.data.token; 
                        }).catch(err =>{
                            console.log(err);
                        });
                }
                break;
            }
            else{
                button.onclick = ()=>{
                    axios({
                            method:"delete",
                            url: "/rooms/delete/me/" + roomname + "/" + username,
                            headers:{
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            },
                            data:{
                                "roomName": roomname
            
                            }  
                        }).then(response =>{
                            console.log(response.data.msg);
                            //Go to the room
                            socket.emit('remove-user', {roomname, token: localStorage.getItem("token"), flag: false});
                            window.location.href = "/me/rooms/" + response.data.token; 
                        }).catch(err =>{
                            console.log(err);
                        });
                }
                break;
            }
        }

    });

    //disabling create room
    const submit = document.getElementById("submit");
    submit.disabled = true;
    const form = document.querySelector("form");
    form.elements["room-name"].onchange = ()=>{
        if(form.elements["room-name"].value.length >= 5 &&  form.elements["room-name"].value.length <= 25 && form.elements["room-name"].value.split(" ").length === 1)
        {
            submit.disabled = false;
            document.getElementById("error-room-name").style.display = "none";
        }
        else
        {
            submit.disabled = true;
            document.getElementById("error-room-name").style.display = "inline";

        }
    }
    //console.log(form.elements["room-name"])
    //create the room -> join it
    form.onsubmit = (e)=>{
        e.preventDefault(form.elements["room-name"].value);
        console.log(form.elements["room-name"].value)
        //Create the room
        axios({
            method:"post",
            url: "/rooms",
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            data:{
                "roomName": form.elements["room-name"].value
            }
        }).then(response =>{
            //Add the user
            axios({
                method:"post",
                url: "/rooms/users",
                headers:{
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                data:{
                    "roomName": response.data.name

                }  
            }).then(response =>{
                console.log(response.msg);
                //Go to the room
                window.location.href = "/rooms/redirect/" + form.elements["room-name"].value + "/" + localStorage.getItem("token"); 
            }).catch(err =>{
                console.log(err);
            });
        }).catch(err =>{
            console.log(err);
            document.getElementById("error-room-name").style.display = "inline";
        })
    }
    
})