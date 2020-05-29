const feedback = document.querySelector('.feedback');
const bookList = document.getElementById('book-list');
const form = document.getElementById('book-form');

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// Local Storage
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();
        books.forEach(function (book) {
            const ui = new UI();

            ui.addBookToList(book);
        });
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        let books = Store.getBooks();

        /**
         * ALTERNATIVE FILTER for REMOVE
         * const items = books.filter(function (book) {
            if (book.isbn !== isbn) {
                return book;
            }
        });
         */

        books.forEach(function (book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

class UI {
    addBookToList(book) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">x</a></td>
        
        `;

        bookList.appendChild(row);
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    showAlert(message, alert) {
        feedback.classList.add('show', `${alert}`);
        feedback.textContent = message;

        setTimeout(() => {
            feedback.classList.remove('show', `${alert}`);
            feedback.textContent = '';
        }, 3000);
    }

    deleteBook(target) {
        if (target.classList.contains('delete')) {
            target.parentElement.parentElement.remove();
        }
    }
}

// Load DOM Event
document.addEventListener('DOMContentLoaded', function () {
    Store.displayBooks();
});

// Form Submit
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    const book = new Book(title, author, isbn);

    const ui = new UI();

    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('You entered an Invalid value', 'error');
    } else {
        ui.addBookToList(book);

        // Add to Local Storage
        Store.addBook(book);

        ui.showAlert('New Book successfully Added', 'success');
        ui.clearFields();
    }
});

// Delete Item
bookList.addEventListener('click', function (e) {
    e.preventDefault();
    const ui = new UI();
    ui.deleteBook(e.target);

    // Delete Local Storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    ui.showAlert('Item Successfully Removed', 'success');
});
