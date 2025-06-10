const arr = []

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

const book2 = new Book("test", "test", 3223, true)
const book3 = new Book("test", "test", 3223, true)
arr.push(book2)
arr.push(book3)
// console.log(arr);
arr[0].toggleRead()
console.log(arr[0]);

