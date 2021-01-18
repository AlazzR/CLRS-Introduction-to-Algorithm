document.addEventListener('DOMContentLoaded', ()=>{
    //console.log('ccccccccccc', item_rating);
    const stars = document.querySelectorAll('.look-at-stars');
    //console.log(stars);
    //console.log('aa',isUser);
    if(isUser == 0 )
        updateStarsState(stars, -1);
    else
        updateStarsState(stars, item_rating);

   stars.forEach((star, ind) =>{
        star.addEventListener('click', (event)=>{
            //console.log('len', stars.length)
             updateStarsState(stars);
            const csrftoken = getCookie('csrftoken');
            //console.log(csrftoken);
            axios(
                {
                    method: 'post',
                    url: url_rating,
                    data:{
                        bookid: item_id,
                        rate: ind, 
                    },
                    headers:{"X-CSRFToken": csrftoken}
                }).then(response => updateStarsState(stars, response.data.ind - 1)).catch(error => console.log(error));
        });
    });
});
function updateStarsState(stars, ind=-1)
{
    console.log('ind', ind)
    if(ind === -1)
    {
        for(let i=0; i < stars.length; i++)
                stars[i].innerHTML ="<i class=\"far fa-star\"></i>";
            //console.log(ind)
    }
    for(let i=0; i <= ind; i++)
                stars[i].innerHTML ="<i class=\"fas fa-star\"></i>";
}
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}