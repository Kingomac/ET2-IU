const URL_BACK = "http://193.147.87.202/Back/index.php";

function insertarCampoOculto(idForm, name, valor) {
  const hidden = document.createElement("input");
  hidden.type = "hidden";
  hidden.name = name;
  hidden.value = valor;
  document.getElementById(idForm).append(hidden);
}

function eliminarCamposOcultos(idForm) {
  for (const i of document.getElementById(idForm).querySelectorAll("input")) {
    if (i.type === "hidden") {
      i.remove();
    }
  }
}

/**
 * Crea un botón para una acción CRUD
 * @param {{accion: 'add' | 'edit' | 'delete' | 'detail' | 'search' | 'close', onsubmit?:((this: GlobalEventHandlers, ev: SubmitEvent) => any) | null, click?:((this: GlobalEventHandlers, ev: MouseEvent) => any), width?: number, height?: number, src?: string, id?: string}} accion
 */
function crearBotonCRUD({
  accion,
  onsubmit,
  click,
  width = 50,
  height = 50,
  src,
  id,
}) {
  const btn = document.createElement("img");
  if (id != null) btn.id = id;
  btn.src = src || `images/${accion}.svg`;
  btn.width = width;
  btn.height = height;
  btn.className = `txt txt-titulo_${accion}`;
  btn.title = getTextoTitulo(accion);
  btn.onclick = click;
  btn.onsubmit = onsubmit;
  return btn;
}
