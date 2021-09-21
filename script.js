class Book {
    constructor(title, author, pages, readStatus) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
    }
}

const myLibrary = (() => {
    const _library = []

    // sample books
    const first = new Book('Capital, Vol. 1: A Critical Analysis of Capitalist Production ', 'Karl Marx', '1152', 'Read');
    const second = new Book('Socialism: Utopian and Scientific', 'Friedrich Engels', '86', 'Read');
    const third = new Book('Imperialism: The Highest Stage of Capitalism', 'Vladimir Lenin', '192', 'Read');
    const fourth = new Book('Quotations from Chairman Mao Tse-Tung', 'Mao Zedong', '311', 'Not-Read');
    _library.push(first);
    _library.push(second);
    _library.push(third);
    _library.push(fourth);

    function findBook(title) {
        for (const book of _library) {
            if (book.title == title) return _library.indexOf(book);
        }
        //return _library.indexOf(_library.filter((book) => book.title === title)); // not sure why this breaks switchStatus function only
    }

    function addBook(e) {
        e.preventDefault();
        const dataForm = new FormData(e.target);
        const book = new Book(dataForm.get('title'), dataForm.get('author'), dataForm.get('pages'), dataForm.get('readstatus'));
        _library.push(book);
        display.render();
        document.getElementById('bookregister').reset();
    }

    function removeBook(e) {
        e.preventDefault();
        const index = findBook(e.target.id);
        _library.splice(index, 1)
        display.render();
    }

    function switchStatus(e) {
        e.preventDefault();
        const index = findBook(e.target.id);
        _library[index].readStatus = (e.target.className == 'toggleRead') ? 'Not-Read' : 'Read';
        display.render();
    }

    function update() {
        _library.forEach(book => display.addBookCard(book))
    }

    return {findBook, addBook, removeBook, switchStatus, update}

})();

const display = (() => {

    function render() {
        //update library display
        const bookshelf = document.querySelector('.bookshelf');
        bookshelf.textContent = '';
        myLibrary.update();

        // add event listeners
        const bookRegister = document.getElementById('bookregister');
        bookRegister.addEventListener('submit', myLibrary.addBook);

        const openModalBtn = document.querySelectorAll('[data-modal-target');
        openModalBtn.forEach(button => {
            button.addEventListener('click', () => {
                const modal = document.querySelector(button.dataset.modalTarget);
                openModal(modal);
            })
        })

        const closeModalBtn = document.querySelectorAll('[data-close-button');
        closeModalBtn.forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal');
                closeModal(modal);
            })
        })
    
        const overlay = document.getElementById('overlay');
        overlay.addEventListener('click', () => {
            const modals = document.querySelectorAll('.modal.active');
            modals.forEach(modal => {
                closeModal(modal);
            })
        })
    }

    function addBookCard(book) {
        const bookshelf = document.querySelector('.bookshelf');
        const bookCard = document.createElement('div');
        const header = document.createElement('div');
        const delBtn = document.createElement('button');
        const title = document.createElement('p');
        const author = document.createElement('p');
        const pages = document.createElement('p');
        const toggleBtn = document.createElement('button')
        bookCard.classList.add('bookcard')
        header.classList.add('bookcard-header');
        delBtn.classList.add('del-button');
        delBtn.innerHTML = '&times;';
        delBtn.setAttribute('id', book.title);
        title.textContent = book.title;
        title.classList.add('bookcard-title')
        author.textContent = book.author;
        pages.textContent = book.pages + ' pages';
        toggleBtn.classList.add('toggleBtn');
        toggleBtn.textContent = 'Not Read';
        toggleBtn.setAttribute('id', book.title);
        if (book.readStatus == 'Read') {
            toggleBtn.classList.remove('toggleBtn')
            toggleBtn.classList.add('toggleRead');
            toggleBtn.textContent = 'Read';
        }
        header.appendChild(delBtn);
        bookCard.appendChild(header);
        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(pages);
        bookCard.appendChild(toggleBtn);
        bookshelf.appendChild(bookCard);
        delBtn.addEventListener('click', myLibrary.removeBook);
        toggleBtn.addEventListener('click', myLibrary.switchStatus);
    }

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

    return {render, addBookCard}

})();

display.render();