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
        const entry = document.createElement('div');
        const title = document.createElement('p');
        const author = document.createElement('p');
        const pages = document.createElement('p');
        title.textContent = book.title;
        title.style.fontSize = 'large';
        title.style.fontWeight = 'bold';
        author.textContent = 'Author: ' + book.author;
        pages.textContent = 'Pages: ' + book.pages;
        entry.classList.add('bookcard')
        entry.appendChild(title);
        entry.appendChild(author);
        entry.appendChild(pages);
        bookshelf.appendChild(entry);
    });
}

const bookshelf = document.querySelector('.bookshelf');
const bookRegister = document.getElementById('bookregister');
bookRegister.addEventListener('submit', addBookToLibrary);

const first = new Book('Capital, Vol. 1: A Critical Analysis of Capitalist Production ', 'Karl Marx', '1152');
myLibrary.push(first);
const second = new Book('Imperialism: The Highest Stage of Capitalism', 'Vladimir Lenin', '192');
myLibrary.push(second);
const third = new Book('The State and Revolution', 'Vladimir Lenin', '116');
myLibrary.push(third);
const fourth = new Book('Socialism: Utopian and Scientific', 'Friedrich Engels', '86');
myLibrary.push(fourth);
const fifth = new Book('Quotations from Chairman Mao Tse-Tung', 'Mao Zedong', '311');
myLibrary.push(fifth);
const sixth = new Book('The Wretched of the Earth', 'Frantz Fanon', '320');
myLibrary.push(sixth);
updateLibrary();

const openModalButtons = document.querySelectorAll('[data-modal-target');
const closeModalButtons = document.querySelectorAll('[data-close-button');
const overlay = document.getElementById('overlay');

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

function openModal(modal) {
    if (modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

