const LOGIN_COOKIE_TOKEN = "token";
const LOGIN_COOKIE_USUARIO_SISTEMA = "usuarioSistema";

function comprobarLogin() {
  const token = readCookie(LOGIN_COOKIE_TOKEN);
  const usuarioSistema = readCookie(LOGIN_COOKIE_USUARIO_SISTEMA);
  if (token && usuarioSistema) return true;
  return false;
}

const PAGINAS = Object.freeze({
  menu: "menu",
  gestionpersonas: "gestionpersonas",
  gestionpermisos: "gestionpermisos",
  gestionusuario: "gestionusuario",
  gestionroles: "gestionroles",
  gestionaccion: "gestionaccion",
  gestionfuncionalidad: "gestionfuncionalidad",
  login: "login",
});

/**
 * Redirige a la página especificada si el usuario está logueado
 * @param {PAGINAS} pagina
 */
function redirigirLoginTrue(pagina = PAGINAS.menu) {
  if (comprobarLogin()) {
    window.location.href = `${pagina}.html`;
  }
}

/**
 * Redirige a la página especificada si el usuario NO está conectado
 * @param {PAGINAS} pagina
 */
function redirigirLoginFalse(pagina = PAGINAS.login) {
  if (!comprobarLogin()) {
    window.location.href = `${pagina}.html`;
  }
}

function conectarUsuario({ usuarioSistema, token }) {
  writeCookie({
    clave: LOGIN_COOKIE_TOKEN,
    valor: token,
  });
  writeCookie({
    clave: LOGIN_COOKIE_USUARIO_SISTEMA,
    valor: usuarioSistema,
  });
}

function desconectarUsuario() {
  deleteCookie(LOGIN_COOKIE_TOKEN);
  deleteCookie(LOGIN_COOKIE_USUARIO_SISTEMA);
}

function getUsuarioConectado() {
  return readCookie(LOGIN_COOKIE_USUARIO_SISTEMA);
}
