document.addEventListener('DOMContentLoaded', ()=>{
/*     console.log(booksList)
    const tmp = Handlebars.compile(document.getElementById('sidebar-template').innerHTML);
    for(let b of booksList)
        document.getElementById('sidebar-window').innerHTML += tmp({'img': b.img_url, 'title': b.title, 'id': b.bookid, 'date': b.date}); */
   document.querySelector('#search-volume').disabled = true;
   document.querySelectorAll('.form-input').forEach((event) =>{
       event.addEventListener('change', ()=>{
           const value = document.getElementById(event.dataset.form).value;
           //console.log(event.dataset.form, value.length);
           if(value.length > 0 )
            document.querySelector('#search-volume').disabled = false;
       });
   });
   document.querySelector('.form-search').addEventListener('change', (event)=>{
       // console.log(document.querySelector('#search-volume').disabled)
        if(document.querySelector('#search-volume').disabled === false)
        {
            const values = [];
            document.querySelectorAll('.form-input').forEach(event =>{
                const type = event.dataset.form;
                //console.log(document.getElementById(type));
                const value = document.getElementById(type).value;
                //console.log('len', value.length)
                if(value.length != 0 && value!=='YYYY') 
                    values.push({[type]: value});
            });
            if(values.length !== 0)
            {
                //console.log('Values', values)
                for(let item of values)
                {
                    const key = Object.keys(item)[0];
                    let value = item[key];
                    if(typeof value === 'string')
                    {
                        value = value.toLowerCase().replace(/ /g, '%');
                    }
                    updateReg(key+'='+value+'&');
                }
                //let regD = getReg();
                //regD = regD.substring(0, regD.length - 1);
                //const csrftoken = getCookie('csrftoken');

                //console.log(regD)
            }
            else
                document.querySelector('#search-volume').disabled = true;
        }
   });
   document.querySelector('.form-search').addEventListener('submit', (event)=>{
       event.preventDefault();
       document.querySelector('#search-volume').disabled = true;
        let reg = getReg();
        reg = reg.substring(0, reg.length - 1);
        const csrftoken = getCookie('csrftoken');
        document.querySelectorAll('.form-input').forEach(event => {document.getElementById(event.dataset.form).value = '';});
        console.log('Search for: ', reg);
        axios(
        {
            method:'post',
            url: url_post, 
            data: {
            url_value: reg}, 
            headers:{"X-CSRFToken": csrftoken}
        }).then((response) => {renderingNewBooks(response.data.data, response.data.numItems)}).catch((error) => {console.log(error)});
        resetReg();
        //console.log('TTsssssssssss', regD);

   });
/*    document.getElementById('visit-force-refresh').onclick = (event)=>{
       console.log('clicked refresh');
       location.reload()Tr;
   } */
});
function renderingNewBooks(books, numitems)
{
    //console.log(books)
    console.log(numitems)
    document.getElementById('books').innerHTML = '';
    //remove all navigations buttons
    while(document.getElementById('page-navigations').firstChild)
        document.getElementById('page-navigations').lastChild.remove();
    document.getElementById('p-num-items').innerHTML = '#items is: ' + String(numitems) + ", google limit the query upto 10 books for non-authorized users.";
    const template = Handlebars.compile(document.getElementById('template').innerHTML);
    if(numitems >= 0)
    {
        const numSubsets = parseInt(numitems/5);
        let counter=0;
        //show the first two books
        function getMoreElements(books, counter, numSubsets)
        {
            for(let ind=counter; ind  <numSubsets + counter; ind++)
            {
                let book = books[ind];
                document.getElementById('books').innerHTML += template({'id': book.id, 'img': book.thumbnail, 'url': book.selfLink, 'title': book.title, 'pagecount': book.pageCount, 'publisher': book.publisher, 'authors': book._authors, 'publishedDate': book.publishedDate, 'saleInfoCountry': book.saleInfoCountry, 'description': book.description, 'bookurl': 'book/' + book.id});
            }
            return counter + numSubsets;
        }
        for(let co=0; co<5; co++)
        {
            let button = document.createElement('button');
            button.classList = 'button-navigation';
            let content = document.createTextNode(String(co));
            //let clickAction = getMoreElements(books, co * numSubsets, numSubsets);
            button.appendChild(content);
            //button.setAttribute('onclick', clickAction);
            document.getElementById('page-navigations').appendChild(button);
        } 
        console.log(numSubsets)
        for(let ind=counter; ind  <numSubsets; ind++)
        {
            let book = books[ind];
            console.log(book)
            document.getElementById('books').innerHTML += template({'id': book.id, 'img': book.thumbnail, 'url': book.selfLink, 'title': book.title, 'pagecount': book.pageCount, 'publisher': book.publisher, 'authors': book._authors, 'publishedDate': book.publishedDate, 'saleInfoCountry': book.saleInfoCountry, 'description': book.description, 'bookurl': 'book/' + book.id});
        }
        counter = numSubsets;
        console.log(counter)
        document.querySelectorAll('.button-navigation').forEach(button =>{
            button.addEventListener('click', ()=>{
                document.getElementById('books').innerHTML = '';    
                const c = getMoreElements(books, parseInt(button.innerHTML) * numSubsets, numSubsets)
                console.log('Counter of rendered objects', c)
            })
        });
    
    }
    else{
        document.getElementById('books').innerHTML = "No books were found for your search";
    }
}
var regD = '';
function updateReg(str)
{
    regD += str;
}
function getReg()
{
    return regD;
}
function resetReg()
{
    regD = '';
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