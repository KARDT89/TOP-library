let myLibrary = [
    new Book("book1", "author1", 123, true),
    new Book("book2", "author2", 456, false),
];

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("#close-btn");
const cardContainer = document.querySelector(".card-container");
const form = document.getElementById("library-form")

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    if (read) {
      return `${title} by ${author}, ${pages} pages, have read`;
    } else {
      return `${title} by ${author}, ${pages} pages, have not read`;
    }
  };
}

Book.prototype.toggleRead = function () {
  this.read = !this.read
}


function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
  displayBooks()
}

addBookToLibrary("Tamal Sarkar", "dt89", 3223, true)
const book2 = new Book("test", "test", 3223, true)

function displayBooks() {
  cardContainer.innerHTML = '';
  myLibrary.map((book) => {
    const card = document.createElement("div");
    card.classList.add("card")
    const title = document.createElement("h1")
    const author = document.createElement("h2")
    const pages = document.createElement("p")
    const read = document.createElement("p")
    const toggleButton = document.createElement("button")
    const deleteButton = document.createElement("button")
    title.innerText = book.title
    author.innerText = book.author
    pages.innerText = book.pages
    read.innerText = book.read ? "Read" : "Not Read"
    toggleButton.innerText = "Toggle"
    deleteButton.innerText = "Delete"
    deleteButton.setAttribute('data-id', book.id)
    toggleButton.addEventListener("click", () => toggleBtn(book.id))
    deleteButton.addEventListener("click", () => deleteBtn(book.id))
    card.appendChild(title)
    card.appendChild(author)
    card.appendChild(pages)
    card.appendChild(read)
    card.appendChild(toggleButton)
    card.appendChild(deleteButton)
    cardContainer.appendChild(card)
  });
}

function toggleBtn(id) {
  const index = myLibrary.findIndex((book) => book.id === id)
  myLibrary[index].toggleRead()
  displayBooks()
}

function deleteBtn(id){
  // works if i use let on myLibrary
  const updatedLibrary = myLibrary.filter((book) => book.id !== id)
  myLibrary = updatedLibrary
  // myLibrary.splice(myLibrary.findIndex((book)=> book.id === id), 1) // works even if i use const
  displayBooks()
}

form.addEventListener("submit", (e) => {
  e.preventDefault()
  const title = e.target["title"].value
  const author = e.target["author"].value
  const pages = e.target["pages"].value
  const isRead = e.target["isRead"].checked
  if (title && author && pages && isRead){
     addBookToLibrary(title, author, pages, isRead)
  }
  dialog.close();
})

displayBooks();
