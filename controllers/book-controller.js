// Lista de libros de ejemplo
let books = [
  {
    id: 1,
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    genre: "Realismo mágico",
    available: true,
  },
  {
    id: 2,
    title: "El arte de la guerra",
    author: "Sun Tzu",
    genre: "Filosofía",
    available: false,
  },
  {
    id: 3,
    title: "Hábitos atómicos",
    author: "James Clear",
    genre: "Autoayuda",
    available: true,
  },
  {
    id: 4,
    title: "Narraciones extraordinarias",
    author: "Edgar Allan Poe",
    genre: "Terror",
    available: true,
  },
];

// Lista de géneros disponibles
const genres = [
  "Ficción",
  "No ficción",
  "Fantasía",
  "Ciencia ficción",
  "Misterio",
  "Realismo mágico",
  "Filosofía",
  "Autoayuda",
  "Terror",
  "Romance",
  "Aventura",
  "Cuento",
  "Poesía",
  "Otro",
];

// Función para obtener todos los libros con filtros aplicados
const getBooks = (filters = {}) => {
  let filteredBooks = books;

  // Filtrar por disponibilidad
  if (filters.available !== undefined) {
    filteredBooks = filteredBooks.filter(
      (book) => book.available === filters.available
    );
  }

  // Filtrar por género
  if (filters.genre) {
    filteredBooks = filteredBooks.filter(
      (book) => book.genre.toLowerCase() === filters.genre.toLowerCase()
    );
  }

  // Retornar los libros filtrados o el mensaje si no hay libros para mostrar
  const noBooksMessage =
    filteredBooks.length === 0 ? "No hay libros para este género." : null;
  return { filteredBooks, noBooksMessage };
};

// Función para obtener un libro por su ID
const getBookById = (id) => {
  return books.find((b) => b.id === parseInt(id)); // Buscar por ID
};

// Función para agregar un nuevo libro
const addBook = (book) => {
  books.push(book); // Agregar libro a la lista
};

// Función para actualizar un libro existente
const updateBook = (id, updatedBook) => {
  const bookIndex = books.findIndex((b) => b.id === parseInt(id)); // Encontrar índice del libro
  if (bookIndex !== -1) {
    books[bookIndex] = { ...books[bookIndex], ...updatedBook }; // Actualizar libro
  }
};

// Función para eliminar un libro
const deleteBook = (id) => {
  books = books.filter((b) => b.id !== parseInt(id)); // Eliminar libro por ID
};

module.exports = {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
  genres,
};
