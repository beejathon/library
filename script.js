let myLibrary = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

function addBookToLibrary(title, author, pages) {
    const book = new Book(title, author, pages);
    myLibrary.push(book);
}

const firstbook = new Book('The Wretched of the Earth', 'Frantz Fanon', '320');
myLibrary.push(firstbook)

const bookshelf = document.querySelector('.bookshelf');
myLibrary.forEach(book => {
    const entry = document.createElement('p');
    entry.classList.add('bookcard')
    const title = document.createElement('p');
    title.textContent = 'Title: ' + book.title;
    entry.appendChild(title);
    const author = document.createElement('p');
    author.textContent = 'Author: ' + book.author;
    entry.appendChild(author);
    const pages = document.createElement('p');
    pages.textContent = 'Pages: ' + book.pages;
    entry.appendChild(pages)
    bookshelf.appendChild(entry);
});


