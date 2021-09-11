let myLibrary = [];

function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

Book.prototype = {
    switchStatus(e) {
        e.preventDefault();
        console.log(e);
        const index = findBook(myLibrary, e.target.id);
        if (e.target.className == 'toggleRead') {
            e.target.className = 'toggleBtn'
            e.target.textContent = 'Not Read'
            myLibrary[index].readStatus = 'Not-Read'
        } else {
            e.target.className = 'toggleRead'
            e.target.textContent = 'Read'
            myLibrary[index].readStatus = 'Read'
        }
    }
};

function findBook(myLibrary, title) {
    for (const book of myLibrary) {
        if (book.title == title) return myLibrary.indexOf(book);
    }
}

function addBook(e) {
    e.preventDefault();
    const dataForm = new FormData(e.target);
    const book = new Book(dataForm.get('title'), dataForm.get('author'), dataForm.get('pages'), dataForm.get('readstatus'));
    myLibrary.push(book);
    updateLibrary();
    document.getElementById('bookregister').reset();
}

function removeBook(e) {
    e.preventDefault();
    for (let i=0; i < myLibrary.length; i++) {
       if (myLibrary[i].title == e.target.id) {
           myLibrary.splice(i, 1);
       }
    }
    updateLibrary();
}

function createBookCard(book) {
    const toggleBtn = document.createElement('button')
    toggleBtn.classList.add('toggleBtn');
    toggleBtn.textContent = 'Not Read';
    toggleBtn.setAttribute('id', book.title);
    if (book.readStatus == 'Read') {
        toggleBtn.classList.remove('toggleBtn')
        toggleBtn.classList.add('toggleRead');
        toggleBtn.textContent = 'Read';
    }
    const entry = document.createElement('div');
    const header = document.createElement('div');
    const delBtn = document.createElement('button');
    const title = document.createElement('p');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    entry.classList.add('bookcard')
    header.classList.add('bookcard-header');
    delBtn.classList.add('del-button');
    delBtn.innerHTML = '&times;';
    delBtn.setAttribute('id', book.title);
    title.textContent = book.title;
    title.style.fontSize = 'large';
    title.style.fontWeight = 'bold';
    author.textContent = 'Author: ' + book.author;
    pages.textContent = 'Pages: ' + book.pages;
    header.appendChild(delBtn);
    entry.appendChild(header);
    entry.appendChild(title);
    entry.appendChild(author);
    entry.appendChild(pages);
    entry.appendChild(toggleBtn);
    bookshelf.appendChild(entry);
    delBtn.addEventListener('click', removeBook);
    toggleBtn.addEventListener('click', book.switchStatus);
}

function updateLibrary() {
    bookshelf.textContent = '';
    myLibrary.forEach(book => createBookCard(book));
}

const bookshelf = document.querySelector('.bookshelf');
const bookRegister = document.getElementById('bookregister');
bookRegister.addEventListener('submit', addBook);

const first = new Book('Capital, Vol. 1: A Critical Analysis of Capitalist Production ', 'Karl Marx', '1152', 'Read');
myLibrary.push(first);
const second = new Book('Imperialism: The Highest Stage of Capitalism', 'Vladimir Lenin', '192', 'Read');
myLibrary.push(second);
const third = new Book('The State and Revolution', 'Vladimir Lenin', '116', 'Read');
myLibrary.push(third);
const fourth = new Book('Socialism: Utopian and Scientific', 'Friedrich Engels', '86', 'Read');
myLibrary.push(fourth);
const fifth = new Book('Quotations from Chairman Mao Tse-Tung', 'Mao Zedong', '311', 'Not-Read');
myLibrary.push(fifth);
const sixth = new Book('The Wretched of the Earth', 'Frantz Fanon', '320', 'Not-Read');
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

