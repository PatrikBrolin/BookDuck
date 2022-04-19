let genreArray = []


// Hämtar böcker från API
let getAllBooks= async () =>{

  genreArray.length = 0
  // Hämtar både vanliga och ljudböcker 

  if(document.querySelector("#books-checkbox1").checked && document.querySelector("#books-checkbox2").checked) {
    let bookResponse = await axios.get("http://localhost:1337/api/books?populate=*")
    let ebookResponse = await axios.get("http://localhost:1337/api/e-books?populate=*")

    let books = bookResponse.data.data
    let ebooks = ebookResponse.data.data

    books.forEach(element =>{
      genreArray.push(element)
    })
    ebooks.forEach(element =>{
      genreArray.push(element)
    })
    
  }
  //hämtar vanliga böcker
  else if(document.querySelector("#books-checkbox1").checked){
    let bookResponse = await axios.get("http://localhost:1337/api/books?populate=*")

    let books = bookResponse.data.data
    books.forEach(element =>{
      genreArray.push(element)
    })
  }
  //hämtar bara ljudböcker
  else if (document.querySelector("#books-checkbox2").checked){
    let ebookResponse = await axios.get("http://localhost:1337/api/e-books?populate=*")

    let ebooks = ebookResponse.data.data
    ebooks.forEach(element =>{
      genreArray.push(element)
    })
  }
  // alla böcker sparas i array som sorteras för random rendering
  genreArray.sort(() => Math.random() - 0.5)
  //renderar böcker till dom
  render(genreArray)
}

// funtion för att sortera fetch efter genre
let getGenre = async (genre) =>{

  genreArray.length = 0

  if(document.querySelector("#books-checkbox1").checked && document.querySelector("#books-checkbox2").checked) {
    let bookResponse = await axios.get("http://localhost:1337/api/books?populate=*")
    let ebookResponse = await axios.get("http://localhost:1337/api/e-books?populate=*")

    let books = bookResponse.data.data
    let ebooks = ebookResponse.data.data
    books.forEach(element =>{
      element.attributes.genres.data.forEach(item =>{
        if(item.attributes.Genre === genre){
          genreArray.push(element)
        }
      })
    })
    ebooks.forEach(element =>{
      element.attributes.genres.data.forEach(item =>{
        if(item.attributes.Genre === genre){
          genreArray.push(element)
        }
      })
    })

  }
  else if(document.querySelector("#books-checkbox1").checked){
    let bookResponse = await axios.get("http://localhost:1337/api/books?populate=*")

    let books = bookResponse.data.data
    books.forEach(element =>{
      element.attributes.genres.data.forEach(item =>{
        if(item.attributes.Genre === genre){
          genreArray.push(element)
        }
      })
    })
  }
  else if (document.querySelector("#books-checkbox2").checked){
    let ebookResponse = await axios.get("http://localhost:1337/api/e-books?populate=*")

    let ebooks = ebookResponse.data.data
    ebooks.forEach(element =>{
      element.attributes.genres.data.forEach(item =>{
        if(item.attributes.Genre === genre){
          genreArray.push(element)
        }
      })
    })
  }

  genreArray.sort(() => Math.random() - 0.5)
  render(genreArray)
}


//function för att rendera ut böcker i DOM
let render = (books) => {
  let booksDiv = document.querySelector(".books-div")
      booksDiv.innerHTML=""
      books.forEach(element =>{
       // kontrollerar att det är en vanlig bok genom att kolla att det finns en författare
        if(element.attributes.Author !== undefined){
          image = "http://localhost:1337" + (element.attributes.Image.data.attributes.url)
          let book = document.createElement("div")
          book.classList.add("books")
          book.innerHTML = 
          `<img src="${image}" alt="">
          <div class="book-type"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
          <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
        </svg></div>
          <div class="book-info">
          <ul>
            <li><strong>Titel:</strong> ${element.attributes.Titel}</li>
            <li><strong>Författare:</strong> ${element.attributes.Author}</li>
            <li><strong>Sidor:</strong> ${element.attributes.Pages}</li>
            <li><strong>Betyg:</strong> ${element.attributes.Rating}</li>
            <li><strong>User:</strong> ${element.attributes.user.data.attributes.username}</li>
            <li><strong>Email:</strong> ${element.attributes.user.data.attributes.email}</li>
          </ul> 
          </div> `
          booksDiv.appendChild(book)
          //finns ingen författare så renderas enligt ljudbok modell
        }else{
          image = "http://localhost:1337" + (element.attributes.Image.data.attributes.url)
          let book = document.createElement("div")
          book.classList.add("books")
          book.innerHTML = 
          `<img src="${image}" alt="">
          <div class="book-type"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-headphones" viewBox="0 0 16 16">
          <path d="M8 3a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a6 6 0 1 1 12 0v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1V8a5 5 0 0 0-5-5z"/>
        </svg></div>
          <div class="book-info">
          <ul>
            <li><strong>Titel:</strong> ${element.attributes.Titel}</li>
            <li><strong>Publicerad:</strong> ${element.attributes.Date}</li>
            <li><strong>Längd:</strong> ${element.attributes.Time}h</li>
            <li><strong>Betyg:</strong> ${element.attributes.Rating}</li>
            <li><strong>User:</strong> ${element.attributes.user.data.attributes.username}</li>
            <li><strong>Email:</strong> ${element.attributes.user.data.attributes.email}</li>
          </ul> 
          </div> `
          booksDiv.appendChild(book)

        }
        
    })
}
// hämtar input om vilken genre användaren vill hämta
let genreBtn = document.querySelector(".genre-btn")
genreBtn.childNodes.forEach(element =>{
  element.addEventListener("click", (e) =>{
    //sätter rubriken på vilken genre som visas
    document.querySelector(".category").innerText = e.target.innerText
    //om användaren väljer Alla böcker görs getAllBooks function
    if(e.target.innerText === "Alla Böcker"){
      getAllBooks()
    }
    //om användaren väljer en genre görs getGenre function
    else{
      getGenre(e.target.innerText)
    }
  })
})



//hämtar och för att rendera logga in och skapa account funtioner
const loginBtn = document.querySelector(".login-btn");
const loginPage = document.querySelector(".login-page");
const exitBoxLogin = document.querySelector(".exit-box-login");

loginBtn.addEventListener("click", () => {
  loginPage.classList.toggle("hide");
})
exitBoxLogin.addEventListener("click", () => {
  loginPage.classList.add("hide");
});


const createAccountBtn = document.querySelector(".create-account-btn");
const createAccountPage = document.querySelector(".create-account-page");
const exitBoxAccount = document.querySelector(".exit-box-account");

createAccountBtn.addEventListener("click", () => {
  loginPage.classList.add("hide");
  createAccountPage.classList.remove("hide");
});

exitBoxAccount.addEventListener("click", () => {
  createAccountPage.classList.add("hide");
});


//formulöär för att logga in användare
const myFormLogin = document.querySelector(".my-form-login");
myFormLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  //login function körs, om den godkäns 
  login().then(()=>{
    loginPage.classList.add("hide");
    // loggedIN function körs för att rendera iconer i DOM
    loggedIn()
  })
})


//formulär för att registrerar användare 
const myFormAccount = document.querySelector(".my-form-account");
myFormAccount.addEventListener("submit", (e) => {
  e.preventDefault()
  //register function körs och om den godkännes så stängs skapa account sidan
  register().then(()=>{
    createAccountPage.classList.add("hide");
  }).then(()=>{
    // loggedIN function körs för att rendera iconer i DOM
    loggedIn()
  })
})

//function för att konrollera om användare är inloggad
let loggedIn = () => {
  //hämtar info från sessionStorare och kontroller om den finns
  let token = sessionStorage.getItem("token")
    if(token !== null){
      //om info finns så visas iconer i DOM
      document.querySelector(".login-btn").classList.add("hide")
      document.querySelector(".logout-btn").classList.remove("hide")
      document.querySelector(".login-links").classList.remove("hide")
    }
}
// function för att registerara användare
let register = async () =>{
    let response = await axios.post(
        "http://localhost:1337/api/auth/local/register",
    {
        //skickar input värde från anvädare
        username:document.querySelector("#Username-account").value,
        password:document.querySelector("#password-account").value,
        email:document.querySelector("#email-account").value
    });
    // skickar username,token och id till sessionStorage 
    let user = document.querySelector("#Username-account").value
    let token = response.data.jwt;
    let id = response.data.user.id
    
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", user);
    sessionStorage.setItem("id", id);

}
//function för att logga in
let login = async () => {
  //hämtar input värde
  let username = document.querySelector("#login-username").value 
  let password = document.querySelector("#login-password").value 

  // post request med inputvärde
  let response = await axios.post("http://localhost:1337/api/auth/local", {
    identifier: username,
    password: password
});
//skickar username, token och id till sessionStorage
let id = response.data.user.id
let user = response.data.user.username
let token = response.data.jwt;
sessionStorage.setItem("token", token);
sessionStorage.setItem("user", user);
sessionStorage.setItem("id", id);
}


//function för att logga ut användare
let logout = () =>{

  //raderar sparad info från sessionStorage
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("id");
  
  //tar bort ikoner från DOM
  document.querySelector(".login-btn").classList.remove("hide")
  document.querySelector(".logout-btn").classList.add("hide")
  document.querySelector(".login-links").classList.add("hide")
}

// function för att stylea boktyp checkbox
let checkboxDiv = document.querySelectorAll(".checkbox-div")
checkboxDiv.forEach(element =>{
  element.addEventListener("click", (e) =>{
    let checkbox = document.querySelector(`#books-checkbox${e.target.id}`)
    
    if (checkbox.checked === true){
          checkbox.checked = false
          checkbox.nextElementSibling.classList.toggle("checked")
        } else{
          checkbox.checked = true
          checkbox.nextElementSibling.classList.toggle("checked")
        }
  })
})

getAllBooks()
loggedIn()