let bookArray = []

//function för att hämta böcker som ska renderas på profilsida
let getBooks = async () => {
  //hämtar användare från sessionStorage
  let user = sessionStorage.getItem("user")
  let bookresponse = await axios.get(`http://localhost:1337/api/books?filters[Userinfo][$eq]=${user}&populate=*`)
  let ebookresponse = await axios.get(`http://localhost:1337/api/e-books?filters[Userinfo][$eq]=${user}&populate=*`)

  let books = bookresponse.data.data
  let ebooks = ebookresponse.data.data
  //böcker som hör till användare läggs i en array
    books.forEach(element =>{
      bookArray.push(element)
    })
    ebooks.forEach(element =>{
      bookArray.push(element)
    })
    //arrayen renderas med hjälp av function renderBooks
    renderBooks(bookArray)
}

//function för att rendera böcker
let renderBooks = (books) => {
  let booksDiv = document.querySelector(".books-div-profile")
      booksDiv.innerHTML=""
      books.forEach(element =>{
        // boken kontrollers om det är vanlig eller ljudbok
        if(element.attributes.Author !== undefined){
          image = "http://localhost:1337" + (element.attributes.Image.data.attributes.url)
          let book = document.createElement("div")
          book.classList.add("books")
          book.innerHTML = 
          `<img src="${image}" alt="">
          <div class="book-type-profile"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
          <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
        </svg></div>
          <div class="book-info">
          <ul>
            <li><strong>Titel:</strong> ${element.attributes.Titel}</li>
            <li><strong>Författare:</strong> ${element.attributes.Author}</li>
            <li><strong>Sidor:</strong> ${element.attributes.Pages}</li>
            <li><strong>Betyg:</strong> ${element.attributes.Rating}</li>
          </ul> 
          </div> `
          booksDiv.appendChild(book)
          
        }else{
          image = "http://localhost:1337" + (element.attributes.Image.data.attributes.url)
          let book = document.createElement("div")
          book.classList.add("books")
          book.innerHTML = 
          `<img src="${image}" alt="">
          <div class="book-type-profile"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-headphones" viewBox="0 0 16 16">
          <path d="M8 3a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a6 6 0 1 1 12 0v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1V8a5 5 0 0 0-5-5z"/>
        </svg></div>
          <div class="book-info">
          <ul>
            <li><strong>Titel:</strong> ${element.attributes.Titel}</li>
            <li><strong>Publicerad:</strong> ${element.attributes.Date}</li>
            <li><strong>Längd:</strong> ${element.attributes.Time}h</li>
            <li><strong>Betyg:</strong> ${element.attributes.Rating}</li>
          </ul> 
          </div> `
          booksDiv.appendChild(book)
        }    
    })
}
// function för att hämta användare. 
let getUserInfo = async () => {
  //användarnamn hämtas från sessionStorage
  let username = sessionStorage.getItem("user")
  //skickar med användarnamn i url för att få rätt användarinfo
  let response = await axios.get(`http://localhost:1337/api/users?filters[username][$eq]=${username}`)
  renderUserInfo(response.data[0])
}

//function för att rendera ut användarinfomration
let renderUserInfo = (user) =>{

  // hämtar användarinformation och render ut
  const date =  new Date(user.createdAt);
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()

  if(month < 10){
    month = "0" + month
  }
  if(day < 10){
    day = "0" + day
  }
  document.querySelector(".user-info").innerHTML = 
 `<p><strong>Användarnamn: </strong> ${user.username}</p>
 <p><strong>Email: </strong> ${user.email}</p>
 <p><strong>Id: </strong> ${user.id}</p>
 <p><strong>Registrerad: </strong> ${year} - ${month} - ${day}</p> ` 
}

//function för att logga ut användare
let logout = () =>{
  //tar bort användarinfo från sessionStorage och byter sida till index.hmtl
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("id");
  location.href = "index.html"
}
// hämtar username och renderar i DOM
let loggedin = () =>{
  let user = sessionStorage.getItem("user")
  document.querySelector(".user-tag").innerText = user
}
getUserInfo()
getBooks()
loggedin()