const myLibrary = [];

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

function addBookToLibrary() {
    title = bookNameInput.value;
    author = bookAuthorInput.value;
    pages = bookPagesInput.value;
    read = bookReadInput.checked;

    book = new Book(title, author, pages, read)
    myLibrary.push(book);
    displayBook(book);
}

function displayLibrary() {
    for (let i in myLibrary) {
        let book = myLibrary[i];
        displayBook(book);
    }
}

function displayBook(book) {
    const newBook = document.createElement("div");
        const title = document.createElement("h3");
        const author = document.createElement("p");
        const pages = document.createElement("p");
        const read = document.createElement("h6");

        newBook.className = "card";
        title.className = "title";
        author.className = "author";
        pages.className = "pages";
        read.className = (book.read ? "read" : "notread");

        console.log(book);

        title.textContent = book.title;
        author.textContent = book.author;
        pages.textContent = book.pages;
        read.textContent = (book.read ? "Read" : "Not read");

        newBook.append(title, author, pages, read);

        library.appendChild(newBook);
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