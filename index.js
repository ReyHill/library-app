const myLibrary = [];
const libraryView = document.getElementById("library-view");
const libraryForm = document.getElementById("library-form");

const formToggle = document.getElementById("form-toggle");
const addEntry = document.getElementById("add-entry");
const removeLastEntry = document.getElementById("remove-last-entry");

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("read");

addEntry.addEventListener("click", () => {
  const readValue = readInput.value.trim().toLowerCase(); 
  
  if(readValue !== 'yes' && readValue !== 'no') {
    alert('Invalid "Read" field input. Indicate "Yes" or "No".');
    return;
  }

  addBookToLibrary(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    readValue.charAt(0).toUpperCase() + readValue.slice(1),
  );
  looper(myLibrary);
});

removeLastEntry.addEventListener("click", (e) => {
  libraryView.lastChild.remove();
  myLibrary.splice(-1);
});

formToggle.addEventListener("click", () => {
  const display = window.getComputedStyle(libraryForm).display;
  if (display == "block") {
    libraryForm.style.display = "none";
    formToggle.textContent = "Add Book";
  } else if (display == "none") {
    libraryForm.style.display = "block";
    formToggle.textContent = "Close Form";
  }
});

function Book(title, author, pages, read) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.read = read),
    (this.info = function () {
      return `${this.title} by ${this.author}, ${this.pages} pages, Read: ${this.read}.`;
    });
}

function addBookToLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function looper(myLibrary) {
  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];
    if (book.id) {
      continue;
    } else {
      
      const item = document.createElement("div");
      item.className = "book";
      const newId = self.crypto.randomUUID();
      item.id = newId;
      book.id = newId;
      libraryView.appendChild(item);
      
      const bookInfo = document.createElement('ul'); 
      const bookTitle = document.createElement('li');
      const bookAuthor = document.createElement('li');
      const bookPages = document.createElement('li');
      const bookRead = document.createElement('li');
      
      bookTitle.textContent = `Title: ${book.title}`;
      bookAuthor.textContent = `Author: ${book.author}`; 
      bookPages.textContent = `Pages: ${book.pages}`; 
      bookRead.textContent = `Read: ${book.read}`; 
      
      bookInfo.appendChild(bookTitle); 
      bookInfo.appendChild(bookAuthor);
      bookInfo.appendChild(bookPages); 
      bookInfo.appendChild(bookRead); 
      
      item.appendChild(bookInfo); 

      const itemRemove = document.createElement("button"); 
      itemRemove.textContent = "Remove";
      itemRemove.id = newId; 
      itemRemove.addEventListener("click", (e) => {
        e.target.parentElement.remove();
        const clicked = e.target.id;
        const indexToRemove = myLibrary.findIndex(elem => elem.id === clicked);
        if (indexToRemove !== -1) {
          myLibrary.splice(indexToRemove, 1);
        }
      }); 
      item.appendChild(itemRemove);
      
      const itemReadToggle = document.createElement('button');
      itemReadToggle.textContent = 'Read?'; 
      itemReadToggle.addEventListener('click', () => {
        if (book.read == 'Yes') {
          book.read = 'No';
        } else if (book.read == 'No') {
          book.read = 'Yes'; 
        }
        bookRead.textContent = `Read: ${book.read}`;
      });
      item.appendChild(itemReadToggle); 
    }
  }
}

// addBookToLibrary("Book A", "Author One", 100, "Read");
// addBookToLibrary("Book B", "Author Two", 200, "Read");
// addBookToLibrary("Book C", "Author Three", 300, "Not Read");
// addBookToLibrary("Book D", "Author Four", 400, "Read");
// addBookToLibrary("Book E", "Author Five", 500, "Not Read");

const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, "have not read");
