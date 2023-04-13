let form = document.querySelector(".inputs")
let inpImg = document.querySelector("#inpImage");
let inpTrailer = document.querySelector("#inpTrailer")
let inpName = document.querySelector("#inpName");
let inpDesc = document.querySelector("#inpDesc");
let btnAdd = document.querySelector("#btnAdd");
let API = "http://localhost:8000/movies";
let cardsContainer = document.querySelector("#cards");
let currentPage = 1;
let pageLength = 1;
let filterValue="Все";


// Навешиваем событие submit на тег Form, для того, чтобы собрать значения инпутов в один объект и отрпавить их в db.json

form.addEventListener("submit", (e) => {
    e.preventDefault();
    //   Проверка на заполненность полей
    if (
      !inpName.value.trim() ||
      !inpImg.value.trim() ||
      !inpDesc.value.trim() ||
      !inpTrailer.value.trim()
    ) {
      alert("Заполните все поля!");
      return;
    }
    //   Создаём новый объект и туда добавляем значения наших инпутов
  let newCard = {
    title: inpName.value,
    image: inpImg.value,
    description: inpDesc.value
  };
  createCard(newCard);
});

// !Create - добавление новых данных
async function createCard(objProf) {
    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(objProf),
    });
    readCard();
  
    let inputs = document.querySelectorAll("form input");
    inputs.forEach((elem) => {
      elem.value = "";
    });
  }
  
// !Read - отображение данных
async function readCard(search = "") {
    // let res = filterValue !== "Все"? await fetch(`${API}?q=${search}&_page=${currentPage}&_limit=3&category=${filterValue}`): await fetch(`${API}`);
    let res = await fetch(API)
    let data = await res.json();
    cardsContainer.innerHTML = "";
    data.forEach((elem) => {
      cardsContainer.innerHTML += `
      <div class="grad">
            <div class="card" style="width: 20rem; height: 43rem">
              <img
                style="height: 31em; width: 100%"
                src="${elem.image}"
                class="card-img-top"
                alt="..."
                
              />
              <div class="card-body">
                <h5 class="card-title">${elem.title}</h5>
                <p class="card-text">
                ${elem.description}
                </p>
                <button style="color: white;
                background-color: rgb(141, 36, 36);
                border: none;
                border-radius: 5px;
                width: 40%;" onclick="showModalEdit(${elem.id}) class="btn">Edit</button>
                <button style="color: white;
                background-color: rgb(141, 36, 36);
                border: none;
                border-radius: 5px;
                width: 40%;" onclick="deleteProfile(${elem.id}) class="btn">Delete</button>
              </div>
            </div>      
          </div>
      `;
  
    });
    // countPages();
  }
  
  readCard();
  

// Delete - удаление одного элемента по id

async function deleteCard(id) {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });
    readCard();
  }
