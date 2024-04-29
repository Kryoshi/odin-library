const myLibrary = [];

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
    
}