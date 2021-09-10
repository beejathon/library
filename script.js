let myLibrary = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

function addBookToLibrary(e) {
    e.preventDefault();
    const dataForm = new FormData(e.target);
    console.log(dataForm.get('status'));
    const book = new Book(dataForm.get('title'), dataForm.get('author'), dataForm.get('pages'));
    myLibrary.push(book);
    updateLibrary();
    document.getElementById('bookregister').reset();
}

function updateLibrary() {
    bookshelf.textContent = '';
    myLibrary.forEach(book => {
        const entry = document.createElement('p');
        entry.classList.add('bookcard')
        const title = document.createElement('p');
        title.textContent = book.title;
        title.style.fontSize = 'large';
        title.style.fontWeight = 'bold';
        entry.appendChild(title);
        const author = document.createElement('p');
        author.textContent = 'Author: ' + book.author;
        entry.appendChild(author);
        const pages = document.createElement('p');
        pages.textContent = 'Pages: ' + book.pages;
        entry.appendChild(pages)
        bookshelf.appendChild(entry);
    });
}


const bookRegister = document.getElementById('bookregister');
bookRegister.addEventListener('submit', addBookToLibrary);
const bookshelf = document.querySelector('.bookshelf');

const firstbook = new Book('The Wretched of the Earth', 'Frantz Fanon', '320');
myLibrary.push(firstbook);
myLibrary.forEach(book => {
    const entry = document.createElement('p');
    entry.classList.add('bookcard')
    const title = document.createElement('p');
    title.textContent = book.title;
    title.style.fontSize = 'large';
    title.style.fontWeight = 'bold';
    entry.appendChild(title);
    const author = document.createElement('p');
    author.textContent = 'Author: ' + book.author;
    entry.appendChild(author);
    const pages = document.createElement('p');
    pages.textContent = 'Pages: ' + book.pages;
    entry.appendChild(pages)
    bookshelf.appendChild(entry);
});