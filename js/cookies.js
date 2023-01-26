/**
 * clave: clave de la cookie
 * valor: valor de la cookie
 * expires: fecha a expirar la cookie
 * @param {{clave: string, valor: string, expires?: Date}} params
 * @returns void
 */
function writeCookie({ clave, valor, expires }) {
  const expiresString =
    expires != null ? `expires=${expires.toUTCString()}; ` : "";
  document.cookie = `${clave}=${valor}; ${expiresString}path=/`;
}

/**
 *
 * @param {string} clave
 * @returns {string | undefined}
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

function deleteCookie(clave) {
  writeCookie({
    clave,
    valor: "",
    expires: new Date(0),
  });
}
