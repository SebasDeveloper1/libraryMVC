class Book {
  constructor(id, title, author, genre, available = true) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.available = available;
  }
}

module.exports = Book;
