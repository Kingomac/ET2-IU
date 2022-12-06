/**
 * Crea una lista no ordenada de los elementos pasados como parametros
 * @param  {...Node | string} elems
 */
function crearLista(...elems) {
  const ul = document.createElement("ul");
  for (const i of elems) {
    const li = document.createElement("li");
    li.append(i);
    ul.append(li);
  }
  return ul;
}

/*function crearSelectIdioma() {
  const select = document.createElement("select");
  for (const i of Object.entries(IDIOMAS)) {
    const option = document.createElement("option");
    option.value = i[0];
    option.innerText = i[1].texto;
    select.append(option);
  }
  select.onchange = (e) => setLang(e.target.value);
  document.body.prepend(select);
}*/

/**
 * Crea e inserta el menú de acciones para usuarios logueados
 * @param {{desconectar?: boolean, volver?: boolean, selectIdioma?:boolean}} params
 */
function insertarMenuAcciones({
  desconectar = true,
  volver = true,
  selectIdioma = true,
  nombreUsuario = true,
} = {}) {
  const nav = document.createElement("nav");
  nav.classList.add("menu-superior");

  if (selectIdioma) {
    const select = document.createElement("select");
    for (const i of Object.entries(IDIOMAS)) {
      const option = document.createElement("option");
      option.value = i[0];
      option.innerText = i[1].texto;
      select.append(option);
    }
    select.onchange = (e) => setLang(e.target.value);
    select.value = readCookie(COOKIE_LANG);
    nav.append(select);
  }

  if (nombreUsuario && comprobarLogin()) {
    const textoUsuario = document.createElement("span");
    textoUsuario.innerText = `Conectado como ${getUsuarioConectado()}`;
    nav.append(textoUsuario);
  }

  if (desconectar && comprobarLogin()) {
    const btnDesconectar = document.createElement("a");
    btnDesconectar.innerText = getTextoTitulo("desconectar");
    btnDesconectar.classList.add("txt");
    btnDesconectar.classList.add("txt-titulo_desconectar");
    btnDesconectar.href = "#";
    btnDesconectar.onclick = () => {
      desconectarUsuario();
      window.location.href = "login.html";
    };
    nav.append(btnDesconectar);
  }
  if (volver) {
    const btnVolver = document.createElement("a");
    btnVolver.innerText = getTextoTitulo("volver");
    btnVolver.classList.add("txt");
    btnVolver.classList.add("txt-titulo_volver");
    btnVolver.href = "menu.html";
    nav.append(btnVolver);
  }

  document.body.prepend(nav);
}
