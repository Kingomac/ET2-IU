const OPCIONES_MENU = [
  {
    clase: "pagina_login",
    href: "login.html",
  },
  {
    clase: "gestion_personas",
    href: "gestionpersonas.html",
  },
  {
    clase: "gestion_usuarios",
    href: "gestionusuario.html",
  },
  {
    clase: "gestion_roles",
    href: "gestionroles.html",
  },
];

/**
 *
 * @param {{clase: string, href: string}[]} opciones
 */
function crearMenu(opciones) {
  const nav = document.createElement("nav");
  const ul = document.createElement("ul");
  nav.append(ul);
  for (const i of opciones) {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = i.href;
    link.innerText = getTextoTitulo(i.clase);
    link.className = `txt txt-titulo_${i.clase}`;
    li.append(link);
    ul.append(li);
  }
  return nav;
}
