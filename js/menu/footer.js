function crearFooter() {
  const footer = document.createElement("footer");
  footer.innerText = "footer";
  document.querySelector("body").append(footer);
  footer.append(``);
}

async function cargarFooter() {
  const req = await fetch("templates/footer.html");
  const resp = await req.text();
  const parser = new DOMParser();
  const virtualDom = parser.parseFromString(resp, "text/html");
  console.log(virtualDom.body.children);
  setLangElem({
    elem: virtualDom.body,
  });
  document.body.append(...virtualDom.body.children);
}
