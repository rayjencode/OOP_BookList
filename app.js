// Query DOM
const feedback = document.querySelector('.feedback');
const bookList = document.getElementById('book-list');

// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function UI() {}

UI.prototype.addBooksToList = function (book) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">x</a></td>
    `;

    bookList.appendChild(row);
};

UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
};

UI.prototype.showAlert = function (message, alert) {
    feedback.classList.add('show', `${alert}`);
    feedback.textContent = message;

    setTimeout(function () {
        feedback.classList.remove('show', `${alert}`);
        feedback.textContent = '';
    }, 3000);
};

UI.prototype.deleteBook = function (target) {
    if (target.classList.contains('delete')) {
        target.parentElement.parentElement.remove();
    }
};

// Event Listener
document.getElementById('book-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Enter a valid value', 'error');
    } else {
        // Add book to list
        ui.addBooksToList(book);
        ui.clearFields();
        ui.showAlert('New Book Sucesfully Added', 'success');
    }
});

// Delete a book
bookList.addEventListener('click', function (e) {
    e.preventDefault();
    const ui = new UI();
    ui.deleteBook(e.target);
    ui.showAlert('Sucesfully Removed', 'success');
});
