let lang;
const ALT_TEXT = "👌👌👌👌👌👌👌👌";
const COOKIE_LANG = "lang";
const IDIOMAS = Object.freeze({
  ES: {
    texto: "Español",
    valores: ES,
  },
  EN: {
    texto: "English",
    valores: EN,
  },
  GA: {
    texto: "Galego",
    valores: GA,
  },
});

function setLangSelect(ev) {
  setLang(ev.target.value);
}

function setLang(codigo = "ES") {
  lang = IDIOMAS[codigo].valores;

  for (const el of document.querySelectorAll("div.txt")) {
    el.innerHTML =
      lang[getLangClass(el.classList)] ||
      `${ALT_TEXT} (${getLangClass(el.classList)})`;
  }

  for (const el of document.querySelectorAll(
    "th.txt, td.txt, label.txt, h1.txt, h2.txt, h3.txt, h4.txt, h5.txt, h6.txt, title.txt, legend.txt, a.txt, button.txt"
  )) {
    el.innerText =
      lang[getLangClass(el.classList)] ||
      `${ALT_TEXT} (${getLangClass(el.classList)})`;
  }

  for (const el of document.querySelectorAll("option.txt")) {
    const query =
      lang[getLangClass(el.classList)] ||
      `${ALT_TEXT} (${getLangClass(el.classList)})`;
    if (query != null) el.innerText = query;
  }

  for (const el of document.querySelectorAll("img.txt")) {
    el.title =
      lang[getLangClass(el.classList)] ||
      `${ALT_TEXT} (${getLangClass(el.classList)})`;
  }

  for (const el of document.querySelectorAll("input.txt")) {
    el.placeholder =
      lang[getLangClass(el.classList)] ||
      `${ALT_TEXT} (${getLangClass(el.classList)})`;
  }

  writeCookie({
    clave: "lang",
    valor: codigo,
    expires: new Date(Date.now() + 36288000),
  });
  const sel = document.getElementById("select_idioma");
  sel != null && (sel.value = codigo);
}

function getTextosRoles(rol) {
  return lang[`rol_${rol}`] || rol;
}

function getTextoTitulo(titulo) {
  return lang[`titulo_${titulo}`] || `${ALT_TEXT} (titulo_${titulo})`;
}

/**
 * Muestra mensaje de error en un div con id "id_caja_error"
 * @param idTextError `<div>` que contiene el texto del error
 * @param idCajaError `<div>` que contiene todo lo relativo a los errores
 * @param idInput `<input>` a resaltar en rojo
 * @param codigo código del error (siendo este en los locales err_codigo)
 * @param {{idTextDiv: string = 'id_texterror', idCajaDiv: string = 'id_caja_error', idInput?, codigo: string}}
 */
function mensajeErrorOLD({
  idTextDiv = "id_texterror",
  idCajaDiv = "id_caja_error",
  idInput,
  codigo,
}) {
  console.error("mensajeError:", codigo, idInput);
  document.getElementById(idCajaDiv).style.display = "block";
  if (idInput != null)
    document.getElementById(idInput).style.borderColor = "#ff0000";
  const texterror = document.getElementById(idTextDiv);
  removeLangClass(texterror.classList);
  texterror.classList.add("txt-err_" + codigo.toString().split(" ")[0]);
  texterror.innerText = lang[`err_${codigo}`] || `${ALT_TEXT} (${codigo})`;
  if (idCajaDiv != null)
    document.getElementById(idCajaDiv).scrollIntoView({ behavior: "smooth" });
}

function getLangClass(classList) {
  for (const i of classList) {
    if (i.startsWith("txt-")) return i.replace("txt-", "");
  }
  return undefined;
}

function mensajeError({ codigo, idInput, idResaltar = idInput }) {
  const elInput = document.getElementById(idInput);
  const errDiv = elInput.nextElementSibling.classList.contains("err-div")
    ? elInput.nextElementSibling
    : document.createElement("div");

  errDiv.classList.add("err-div", "txt", `txt_err_${codigo}`);
  errDiv.innerText = lang[`err_${codigo}`] || `${ALT_TEXT} (${codigo})`;

  elInput.parentNode.insertBefore(errDiv, elInput.nextSibling);
  document.getElementById(idResaltar).style.borderColor = "#ff0000";
}

function removeLangClass(classList) {
  for (const i of classList) {
    if (i.startsWith("txt-")) classList.remove(i);
  }
}

// function crearSelectIdioma() {
//   const select = document.getElementById("select_idioma");
//   for (const i of IDIOMAS) {
//     const option = document.createElement("option");
//     option.value = i.codigo;
//     option.innerText = i.texto;
//     select.append(option);
//   }
// }
