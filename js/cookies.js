/**
 * clave: clave de la cookie
 * valor: valor de la cookie
 * expires: ms a sumar al timestamp actual
 * @param {{clave: string, valor: string, expires: number}} params
 * @returns void
 */
function writeCookie({ clave, valor, expires = 7 * 24 * 60 * 60 * 1000 }) {
  expires = new Date(Date.now() + expires);
  document.cookie = `${clave}=${valor}; expires=${expires.toUTCString()}; path=/`;
}

/**
 *
 * @param {string} clave
 * @returns string | undefined
 */
function readCookie(clave) {
  for (const entrada of document.cookie.split("; ")) {
    const dividido = entrada.split("=");
    if (dividido[0] === clave) {
      return dividido[1];
    }
  }
  return undefined;
}
