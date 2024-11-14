const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const book1 = new Book('God of Thunder', 'Thor', 950, true);
const book2 = new Book('God of Thunder - Part 2', 'Thor', 780, false);

myLibrary.push(book1, book2);

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook  = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    const libraryEl = document.getElementById("library");
    libraryEl.innerHTML = "";

    myLibrary.forEach((book, index) => {
        const bookEl = document.createElement("div");
        bookEl.classList.add("book");
        bookEl.innerHTML = `<h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: ${book.read ? "Yes" : "No"}</p>
            <button onclick="toggleReadStatus(${index})">Toggle Read</button>
            <button onclick="removeBook(${index})">Remove</button>`;

        libraryEl.appendChild(bookEl);
    });
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

function toggleReadStatus(index) {
    myLibrary[index].toggleRead();
    displayBooks();
}

// Form handling
const newBookBtn = document.getElementById('newBookBtn');
const bookForm = document.getElementById('bookForm');
const addBookForm = document.getElementById('addBookForm');


newBookBtn.addEventListener('click', () => {
    bookForm.style.display = 'block';
});

addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    
    addBookToLibrary(title, author, pages, read);
    
    addBookForm.reset();
    bookForm.style.display = 'none';
});


// Close the modal when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === bookForm) {
        bookForm.style.display = 'none';
    }
});

// Initial display
displayBooks();