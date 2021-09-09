let myLibrary = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

function addBookToLibrary(title, author, pages) {
    const title = new Book(title, author, pages);
    myLibrary.push(title);
}

const libGrid = document.querySelector('.libgrid');

