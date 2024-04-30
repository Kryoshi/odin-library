const myLibrary = [];
const libraryCards = [];

myLibrary.push(new Book("The Hobbit", "J. R. R. Tolkien", "500", true));
myLibrary.push(new Book("The Lord of the Rings", "J. R. R. Tolkien", "1000", true));
myLibrary.push(new Book("The Cat in the Hat", "Dr. Seuss", "50"));
myLibrary.push(new Book("Shogun", "James Clavell", "500"));

function Book(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    if (read)
        return `${this.title} by ${this.author}, ${pages} pages, has been read.`;
    else
        return `${this.title} by ${this.author}, ${pages} pages, not read yet.`;
}

Book.prototype.toggleRead = function() {
    this.read = !(this.read);
}

function addBookToLibrary() {
    title = bookNameInput.value;
    author = bookAuthorInput.value;
    pages = bookPagesInput.value;
    read = bookReadInput.checked;

    book = new Book(title, author, pages, read)
    myLibrary.push(book);
    generateCard(book);
}

function displayLibrary() {
    for (let i in myLibrary) {
        let book = myLibrary[i];
        generateCard(book);
        library.appendChild(libraryCards[i]);
    }
}

function generateCard(book) {
    const newBook = document.createElement("div");
    const title = document.createElement("h3");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const status = document.createElement("h6");

    newBook.className = (book.read ? "card read" : "card unread");
    title.className = "title";
    author.className = "author";
    pages.className = "pages";
    status.className = "status";

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;

    const buttons = document.createElement("div");
    const buttonDelete = document.createElement("button");
    const buttonRead = document.createElement("button");

    buttons.className = "buttons";
    buttonDelete.className = "delete";
    buttonRead.className = "markread";

    buttonDelete.textContent = "Delete";

    buttons.append(buttonRead, buttonDelete);

    newBook.append(title, author, pages, status, buttons);
    libraryCards.push(newBook);

    newBook.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            index = libraryCards.indexOf(newBook);
            if (e.target.className === "markread") {
                myLibrary[index].toggleRead();
                newBook.className = (myLibrary[index].read ? "card read" : "card unread");
            } else if (e.target.className === "delete") {
                newBook.remove();
                libraryCards.splice(index, 1);
                myLibrary.splice(index, 1);
            }
        }
    });
}


const library = document.querySelector(".library");
const newBookButton = document.querySelector(".newbook");
const bookDialog = document.querySelector("#bookdialog");

const bookNameInput = document.querySelector("#bookname");
const bookAuthorInput = document.querySelector("#bookauthor");
const bookPagesInput = document.querySelector("#bookpages");
const bookReadInput = document.querySelector("#bookread");
const bookDialogForm = document.querySelector("#bookdialog form");

bookDialogForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addBookToLibrary();
    bookDialog.close();
    bookDialogForm.reset();
});

newBookButton.addEventListener("click", (e) => {
    bookDialog.showModal();
});

displayLibrary();