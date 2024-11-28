const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");

const {
  isAuthenticated,
  login,
  register,
} = require("./middlewares/authentication");
const {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
  genres,
} = require("./controllers/book-controller");

const app = express();

// Configura el middleware de sesión
app.use(
  session({
    secret: "clave_seguridad",
    resave: false,
    saveUninitialized: true,
  })
);

// Middleware para analizar los datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/public", express.static(path.join(__dirname, "public")));

// Ruta para el login
app.get("/login", (req, res) => {
  res.render("login"); // Muestra el formulario de login
});

// Ruta para procesar el login
app.post("/login", login);

// Ruta para el registro
app.get("/register", (req, res) => {
  res.render("register"); // Muestra el formulario de registro
});

// Ruta para procesar el registro
app.post("/register", register);

// Ruta para mostrar los libros con filtros
app.get("/books", isAuthenticated, (req, res) => {
  const genreFilter = req.query.genre || ""; // Filtro de género (por defecto vacío)
  const availableFilter = req.query.available || ""; // Filtro de disponibilidad (por defecto vacío)

  const filters = {};

  // Filtro por disponibilidad
  if (availableFilter !== "") {
    filters.available = availableFilter === "true"; // Convierte el valor de "true"/"false" a booleano
  }

  // Filtro por género
  if (genreFilter !== "") {
    filters.genre = genreFilter;
  }

  // Llama a "getBooks" con los filtros aplicados
  const { filteredBooks, noBooksMessage } = getBooks(filters);

  // Pasa los libros, los filtros y el mensaje (si no hay libros para ese género) a la vista
  res.render("books", {
    books: filteredBooks,
    genreFilter,
    availableFilter,
    genres,
    noBooksMessage, // Pasa el mensaje a la vista
  });
});

// Ruta para agregar un libro
app.get("/add-book", isAuthenticated, (req, res) => {
  res.render("add-book", { genres }); // Pasa los géneros a la vista
});

app.post("/add-book", isAuthenticated, (req, res) => {
  const { title, author, genre, available } = req.body;
  const newBook = {
    id: Date.now(),
    title,
    author,
    genre,
    available: available === "on", // Marca el checkBox
  };

  addBook(newBook);
  res.redirect("/books");
});

// Ruta para editar un libro
app.get("/edit-book/:id", isAuthenticated, (req, res) => {
  const book = getBookById(req.params.id);
  if (book) {
    res.render("edit-book", { book, genres });
  }
});

app.post("/edit-book/:id", isAuthenticated, (req, res) => {
  const { title, author, genre, available } = req.body;
  const updatedBook = {
    title,
    author,
    genre,
    available: available === "on", // Marca el checkBox
  };

  updateBook(req.params.id, updatedBook);
  res.redirect("/books");
});

// Ruta para eliminar un libro
app.get("/delete-book/:id", isAuthenticated, (req, res) => {
  deleteBook(req.params.id);
  res.redirect("/books");
});

// Ruta para cerrar sesión
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

// Inicia el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`El servidor está escuchando en http://localhost:${PORT}/login`);
});
