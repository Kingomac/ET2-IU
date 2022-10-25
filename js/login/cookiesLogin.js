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
  gestionacciones: "gestionacciones",
  gestionfuncionalidad: "gestionfuncionalidad",
  login: "login",
});

/**
 *
 * @param {PAGINAS} pagina
 */
function redirigirLoginTrue(pagina = PAGINAS.menu) {
  if (comprobarLogin()) {
    window.location.href = `${pagina}.html`;
  }
}

function redirigirLoginFalse(pagina = PAGINAS.login) {
  if (!comprobarLogin()) {
    window.location.href = `${pagina}.html`;
  }
}
