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
 * @param {{desconectar?: boolean, volver?: boolean, pagVolver?:string, selectIdioma?:boolean, tema?:boolean}} params
 */
function insertarMenuAcciones({
  desconectar = true,
  volver = true,
  pagVolver = "menu.html",
  selectIdioma = true,
  nombreUsuario = true,
  tema = true,
} = {}) {
  const nav = document.createElement("nav");
  nav.classList.add("menu-superior");

  if (selectIdioma) {
    const divIdiomas = document.createElement("div");
    const select = document.createElement("select");
    for (const i of Object.entries(IDIOMAS)) {
      const option = document.createElement("option");
      option.value = i[0];
      option.innerText = i[1].texto;
      select.append(option);
    }
    select.onchange = (e) => setLang(e.target.value);
    select.value = readCookie(COOKIE_LANG);
    select.classList.add("dos");
    divIdiomas.append(select);
    nav.append(divIdiomas);
  }

  if (volver) {
    const btnVolver = document.createElement("a");
    btnVolver.innerText = getTextoTitulo("volver");
    btnVolver.classList.add("txt");
    btnVolver.classList.add("txt-titulo_volver");
    btnVolver.href = pagVolver;
    btnVolver.classList.add("uno");
    nav.append(btnVolver);
  }

  if (nombreUsuario && comprobarLogin()) {
    const textoUsuario = document.createElement("span");
    const textoconectado = document.createElement("span");
    textoconectado.classList.add("tres", "txt", "txt-titulo_conectado_como");
    textoconectado.innerText = getTextoTitulo("conectado_como");
    textoUsuario.innerText = " " + getUsuarioConectado();
    textoUsuario.classList.add("tres");
    textoUsuario.prepend(textoconectado);
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
    btnDesconectar.classList.add("cinco");
    nav.append(btnDesconectar);
  }

  if (tema) {
    //Leer tema del localStorage
    let leerTema = window.localStorage.getItem("tema");
    if (!leerTema)
      leerTema =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "oscuro"
          : "claro";
    // Aplicar tema
    document.body.classList.remove("oscuro");
    if (leerTema == "oscuro") document.body.classList.add(leerTema);

    // Crear botón de cambio de tema
    const divBtnTema = document.createElement("div");
    divBtnTema.classList.add("cuatro");
    const btnTema = document.createElement("img");
    btnTema.classList.add("boton-redondo");
    btnTema.title = getTextoTitulo("boton_tema");
    btnTema.classList.add("txt", "txt-titulo_boton_tema");
    btnTema.src =
      getTema() == "claro" ? "images/modo-claro.svg" : "images/modo-oscuro.svg";
    btnTema.onclick = () => {
      if (getTema() == "claro") {
        cargarTema({ tema: "oscuro" });
      } else {
        cargarTema({ tema: "claro" });
      }
    };
    divBtnTema.append(btnTema);
    nav.append(divBtnTema);
  }

  document.body.prepend(nav);
}

/**
 *
 * @param {{tema: "claro" | "oscuro"}} param0
 */
function cargarTema({ tema } = {}) {
  if (tema != null) {
    window.localStorage.setItem("tema", tema);
    setTema({ tema });
    return;
  }
  let temaLeer = window.localStorage.getItem("tema");
  if (temaLeer != null) {
    setTema({ tema: temaLeer });
  } else {
    let temaSistema =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "oscuro"
        : "claro";
    setTema({ tema: temaSistema });
  }
}

/**
 * @param {{tema: "claro" | "oscuro"}} param0
 */
function setTema({ tema } = {}) {
  if (tema == "claro") {
    document.body.classList.remove("oscuro");
  } else {
    if (!document.body.classList.contains("oscuro"))
      document.body.classList.add("oscuro");
  }
}

/**
 * @returns {'claro' | 'oscuro'}
 */
function getTema() {
  return document.body.classList.contains("oscuro") ? "oscuro" : "claro";
}
