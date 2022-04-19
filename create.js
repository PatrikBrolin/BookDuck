let bookBtn = document.querySelector(".book-btn")
let eBookBtn = document.querySelector(".ebook-btn")

let bookArray = []
let genreArray = [] 

//användaren har valt att rendera ut fomrulär för att lägga till Ljudbok
eBookBtn.addEventListener("click", (e) => {
  document.querySelector(".create-form").innerHTML = 
  `<form id="submit-book" action="">
  <input
    type="text"
    name="Titel"
    id="titel"
    placeholder="Titel"
    required
  />
  <input
    type="date"
    name="Date"
    id="date"
    placeholder="publicerad"
    max='2022-04-01'
    required
  />
  <div class="length">
  <label>Längd:</label>
  <input
    type="number"
    name="Hours"
    id="hours"
    placeholder="Timmar"
    required
  /><input
  type="number"
  name="Minutes"
  id="minutes"
  placeholder="Minuter"
  min="0"
  max="60"
  required
/>
  </div>

  <div class="select-box">
  <div>
   <label for="1">Romantik</label>
   <input type="checkbox"  class="genre" name="Romantik" id="1" onclick="selectedValue()">
  </div>
  <div>
   <label for="2">Humor</label>
   <input type="checkbox" class="genre" name="Humor" id="2" onclick="selectedValue()">
  </div>
  <div>
   <label for="3">Skräck</label>
   <input type="checkbox" class="genre" name="Skräck" id="3" onclick="selectedValue()">
  </div>
  <div>
   <label for="4">Barnbok</label>
   <input type="checkbox" class="genre" name="Barnbok" id="4" onclick="selectedValue()">
  </div>
  <div>
   <label for="5">Fantasy</label>
   <input type="checkbox" class="genre" name="Fantasy" id="5" onclick="selectedValue()">
  </div>
  <div>
   <label for="6">Sci-fi</label>
   <input type="checkbox" class="genre" name="Sci-fi" id="6" onclick="selectedValue()">
  </div>
  <div>
   <label for="7">Action</label>
   <input type="checkbox" class="genre" name="Action" id="7" onclick="selectedValue()">
  </div>
</div>
  
  <div class="rating-box">
    <label for="rating">Rating</label>
    <label class="checked-star" for="rating-1" onclick="getRating(1)"><i class="bi bi-star-fill"></i></label>
    <input
    type="radio"
    name="rating"
    value="1"
    id="rating-1"
    checked
  />
  <label for="rating-2" onclick="getRating(2)"><i class="bi bi-star-fill"></i></label>
  <input
    type="radio"
    name="rating"
    value="2"
    id="rating-2"
  />
  <label for="rating-3" onclick="getRating(3)"><i class="bi bi-star-fill"></i></label>
  <input
    type="radio"
    name="rating"
    value="3"
    id="rating-3"

  />
  <label for="rating-4" onclick="getRating(4)"><i class="bi bi-star-fill"></i></label>
  <input
    type="radio"
    name="rating"
    value="4"
    id="rating-4"

  />
  <label for="rating-5" onclick="getRating(5)"><i class="bi bi-star-fill"></i></label>
  <input
    type="radio"
    name="rating"
    value="5"
    id="rating-5"

  />
</div>
<input type="file" id="bookImg">
<button type="button" onclick="submitEBook()">submit</button>
  
</form>`
})
//användaren har valt att rendera ut fomrulär för att lägga till vanlig bok
bookBtn.addEventListener("click", (e) =>{
  document.querySelector(".create-form").innerHTML = 
  `<form id="submit-book" action="">
  <input
    type="text"
    name="Titel"
    id="titel"
    placeholder="Titel"
    required
  />
  <input
    type="text"
    name="Author"
    id="author"
    placeholder="Author"
    required
  />
  <input
    type="number"
    name="Pages"
    id="pages"
    placeholder="Pages"
    required
  />

  <div class="select-box">
  <div>
   <label for="1">Romantik</label>
   <input type="checkbox"  class="genre" name="Romantik" id="1" onclick="selectedValue()">
  </div>
  <div>
   <label for="2">Humor</label>
   <input type="checkbox" class="genre" name="Humor" id="2" onclick="selectedValue()">
  </div>
  <div>
   <label for="3">Skräck</label>
   <input type="checkbox" class="genre" name="Skräck" id="3" onclick="selectedValue()">
  </div>
  <div>
   <label for="4">Barnbok</label>
   <input type="checkbox" class="genre" name="Barnbok" id="4" onclick="selectedValue()">
  </div>
  <div>
   <label for="5">Fantasy</label>
   <input type="checkbox" class="genre" name="Fantasy" id="5" onclick="selectedValue()">
  </div>
  <div>
   <label for="6">Sci-fi</label>
   <input type="checkbox" class="genre" name="Sci-fi" id="6" onclick="selectedValue()">
  </div>
  <div>
   <label for="7">Action</label>
   <input type="checkbox" class="genre" name="Action" id="7" onclick="selectedValue()">
  </div>
</div>
  
  <div class="rating-box">
    <label for="rating">Rating</label>
    <label class="checked-star" for="rating-1" onclick="getRating(1)"><i class="bi bi-star-fill"></i></label>
    <input
    type="radio"
    name="rating"
    value="1"
    id="rating-1"
    checked
  />
  <label for="rating-2" onclick="getRating(2)"><i class="bi bi-star-fill"></i></label>
  <input
    type="radio"
    name="rating"
    value="2"
    id="rating-2"
  />
  <label for="rating-3" onclick="getRating(3)"><i class="bi bi-star-fill"></i></label>
  <input
    type="radio"
    name="rating"
    value="3"
    id="rating-3"

  />
  <label for="rating-4" onclick="getRating(4)"><i class="bi bi-star-fill"></i></label>
  <input
    type="radio"
    name="rating"
    value="4"
    id="rating-4"

  />
  <label for="rating-5" onclick="getRating(5)"><i class="bi bi-star-fill"></i></label>
  <input
    type="radio"
    name="rating"
    value="5"
    id="rating-5"

  />
</div>
<input type="file" id="bookImg">
<button type="button" onclick="submitbook()"">submit</button>
</form>`
})

//function för att lägga till en ljudbok 
let submitEBook = async () =>{

  //alla inputs hämtas in
  let username = sessionStorage.getItem("user")
  let titel = document.querySelector("#titel").value;
  let date = document.querySelector("#date").value
  console.log(date)
  let hours= document.querySelector("#hours").value
  let minutes = document.querySelector("#minutes").value
  let time = null
  //kontrollerar så användaren inte använt någon felaktiga inputs över längd
  if(hours.includes(".") || (minutes.includes(".") || minutes > 60)){
    alert("Fyll i längden i fulla timmar och minuter")
  } else{
    time = hours + "." + minutes
  }

  let rating = document.querySelector('input[type="radio"]:checked').value 
  let userID = sessionStorage.getItem("id")


  let img = document.querySelector("#bookImg").files;
  let imgData = new FormData();
  imgData.append("files", img[0])

  //kontrollerar så alla fält är ifyllda och korrekta
  if(titel.length < 1 || date.length < 1 || time === null || genreArray.length < 0 || img[0] === undefined){
    alert("Fyll i alla fält")
    console.log(titel.length)
    console.log(date.length)
    console.log(time)
    console.log(genreArray.length)
    console.log(img[0])
  } // om det inte hittas några felaktigheter så skickas en post med bokens info
  else{
    await axios.post("http://localhost:1337/api/upload", imgData,
  {
    headers: {
      Authorization:`Bearer ${sessionStorage.getItem("token")}`
    }

  })
  .then((response) => {
      axios.post("http://localhost:1337/api/e-books", {
          data: {
              Titel: titel,
              Date: date,
              Time: time,
              Rating: rating,
              Image: response.data[0].id, 
              Userinfo: username,
              user: userID,
              genres: genreArray
            }

        },
        {
          headers: {
            Authorization:`Bearer ${sessionStorage.getItem("token")}`
        }
      })
  })
  }
}
//funtion för att lägga till en vanlig bok
let submitbook = async () =>{

    //hämtar alla användarens inputs
    let username = sessionStorage.getItem("user")
    let titel = document.querySelector("#titel").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let rating = document.querySelector('input[type="radio"]:checked').value 
    let userID = sessionStorage.getItem("id")


    let img = document.querySelector("#bookImg").files;
    let imgData = new FormData();
    imgData.append("files", img[0])
    
    //felhanterings validering så alla fält är ifyllda och korrekta
    if(titel.length < 1 || author.length < 1 || pages.length < 1 ||genreArray.length < 1 || img[0] === undefined){
      alert("Fyll i alla fält")
    } else {
      //post körs om inga felaktigheter hittas
      await axios.post("http://localhost:1337/api/upload", imgData,
      {
        headers: {
          Authorization:`Bearer ${sessionStorage.getItem("token")}`
        }})
      .then((response) => {
          axios.post("http://localhost:1337/api/books", {
              data: {
                  Titel: titel,
                  Author: author,
                  Pages: pages,
                  Rating: rating,
                  Image: response.data[0].id, 
                  Userinfo: username,
                  user: userID,
                  genres: genreArray
                }
            },
            {
              headers: {
                Authorization:`Bearer ${sessionStorage.getItem("token")}`
            }
          })
      })
    }
}

  
// funtion för att hämta och rendera böker som användare lagt ut
let getBooks = async () => {
  //hämtar info från sessionStorage för att identifera Användare
  let user = sessionStorage.getItem("user")
  let bookresponse = await axios.get(`http://localhost:1337/api/books?filters[Userinfo][$eq]=${user}&populate=*`)
  let ebookresponse = await axios.get(`http://localhost:1337/api/e-books?filters[Userinfo][$eq]=${user}&populate=*`)

  let books = bookresponse.data.data
  let ebooks = ebookresponse.data.data
  //lägger till både vanliga och ljudböcker i Array

    books.forEach(element =>{
      bookArray.push(element)
    })
    ebooks.forEach(element =>{
      bookArray.push(element)
    })
    //array renderas ut i DOM
    renderBooks(bookArray)
}
//function för att rendera böcker
let renderBooks = (books) => {
  let booksDiv = document.querySelector(".books-div-create")
      booksDiv.innerHTML=""
      books.forEach(element =>{
        //kontrollerar om det är en vanlig eller ljudbok genom att hitta element som bara finns för vanliga böcker
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
          // renderar Ljudbook om författare inte fanns
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
//function för att logga ut, tar bort sessionStorage info och återvänder till index.html sida
let logout = () =>{
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  location.href = "index.html"
}

//function för att användare ska kunna välja flera genres när man lägger till en bok
let selectedValue = () =>{
  genreArray.length = 0;
  let selected = document.querySelectorAll(".genre")
  //valda genres sparas i en Array som sedan skickas med vis post request
  selected.forEach(element => {
    if(element.checked){
      genreArray.push(element.id)
      element.parentElement.classList.add("selected")
    }
    else{
      element.parentElement.classList.remove("selected")
    }
  })
}

//function för att välja antal stjärnor man vill ge till en bok
let getRating = (id) =>{
  let stars = document.getElementsByName("rating")
  stars.forEach(star =>{
    let checked = star.previousElementSibling
    if(star.value <= id) {
      checked.classList.add("checked-star")
    }
    else{
      checked.classList.remove("checked-star")
    }
  })
}


getBooks()
