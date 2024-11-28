// Lista de usuarios
const users = [{ username: "a", password: "a" }];

// Verificar si el usuario está logueado
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next(); // Si está autenticado continúa con la siguiente ruta
  }
  res.redirect("/login"); // Si no está autenticado redirige al inicio de sesión
};

// Verificar las credenciales de inicio de sesión
const login = (req, res, next) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    req.session.user = user; // Guarda al usuario en la sesión
    res.redirect("/books"); // Redirige a la lista de libros si el inicio de sesión es exitoso
  } else {
    res.redirect("/login"); // Si no se encuentra el usuario, redirige al inicio de sesión
  }
};

// Registrar un nuevo usuario
const register = (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.redirect("/register"); // Si las contraseñas no coinciden, redirige de nuevo al formulario de registro
  }

  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.redirect("/register"); // Si el usuario ya existe, redirige al formulario de registro
  }

  users.push({ username, password }); // Agrega el nuevo usuario a la lista
  res.redirect("/login"); // Redirige a la página de inicio de sesión
};

module.exports = { isAuthenticated, login, register };
