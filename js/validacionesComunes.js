function ponerinvisibleerror() {}

function ponerinvisibleformusuario() {
  document.getElementById("id_caja_formulario_usuario").style.display = "none";
}

function setDivInvisible(form) {
  document.getElementById(form).style.display = "none";
}

function mensajeOKOLD(idElemento) {
  document.getElementById("id_texterror").innerHTML = "";

  document.getElementById(idElemento).style.borderColor = "#00e600";
}

function mensajeOK(idElemento) {
  const el = document.getElementById(idElemento);
  el.style.borderColor = "#00e600";
  const err = el.nextElementSibling;
  if (err && err.classList.contains("err-div")) err.remove();
  if (err && err.classList.contains("error-div")) err.textContent = "";
}

/**
 *
 * @param {{onclose:((this: GlobalEventHandlers, ev: Event) => any) | null, codigoMensaje: string}} param0
 */
function mensajeOKmodal({ onclose, codigoMensaje } = {}) {
  const dialog = document.createElement("dialog");
  const divModal = document.createElement("div");
  const cabeceraModal = document.createElement("div");

  cabeceraModal.classList.add("cabecera-modal");
  divModal.classList.add("caja-modal");

  const tituloModal = document.createElement("h2");
  tituloModal.classList.add("txt", "txt-titulo_error_modal");
  tituloModal.innerText = lang["titulo_modal_exito"];
  const cerrarModal = document.createElement("img");
  cerrarModal.classList.add("boton-redondo");
  cerrarModal.src = "images/close.svg";
  cerrarModal.width = "50";
  cerrarModal.onclick = () => {
    dialog.close();
    dialog.remove();
  };
  cabeceraModal.append(tituloModal, cerrarModal);

  const divMensaje = document.createElement("div");
  divMensaje.innerText = lang[codigoMensaje] || lang["modal_mensaje_exito"];

  divModal.append(cabeceraModal, divMensaje);
  dialog.append(divModal);
  document.body.append(dialog);
  dialog.onclose = onclose;
  dialog.showModal();
}

function size_minimo(idElemento, longitudminima) {
  const elemento = document.getElementById(idElemento).value;
  if (elemento.length < longitudminima) {
    return false;
  }
  return true;
}

/**
 * Comprobación del tamaño máximo de un campo, si se cumple devuelve true
 * @param {string} idElemento
 * @param {number} longitudmaxima
 * @returns `true` si longitudElemento < logitudMáxima
 */
function size_maximo(idElemento, longitudmaxima) {
  const elemento = document.getElementById(idElemento).value;
  if (elemento.length > longitudmaxima) {
    return false;
  }
  return true;
}

function letrassinacentoynumeros(idElemento) {
  const campo = document.getElementById(idElemento).value;
  if (!/^[a-zA-Z0-9]+$/.test(campo)) {
    return false;
  }
  return true;
}

function encriptarpassword() {
  document.getElementById("id_contrasena").value = hex_md5(
    document.getElementById("id_contrasena").value
  );
  return true;
}

/**
 * Crea un `<tr>...<td>Nodo N</td></tr>` con los parámetros
 * @param  {...string|Node} a
 */
function crearTR(...a) {
  const tr = document.createElement("tr");
  for (const i of a) {
    const td = document.createElement("td");
    td.append(i);
    tr.append(td);
  }
  return tr;
}

/**
 * Limpia campos del formulario, reinicia los bordes y quita los readonly de los campos
 * @param {string} idForm
 */
function resetForm(idForm) {
  const form = document.getElementById(idForm);
  form.reset();
  for (const i of form.querySelectorAll("input, textarea")) {
    i.style.borderColor = "";
    i.removeAttribute("readonly");
  }
  for (const i of form.querySelectorAll("fieldset")) {
    i.style.borderColor = "";
  }
}

function limpiarErrores(idForm) {
  document.getElementById("img_form_submit").style.display = "block";
  const form = document.getElementById(idForm);
  form.querySelectorAll(".err-div").forEach((e) => (e.textContent = ""));
}

function scrollFinTabla() {
  $("html, body").animate(
    {
      scrollTop: document.querySelector("table").offsetHeight,
    },
    800,
    function () {}
  );
}

function alternarDisplay(id, modo = "block") {
  const el = document.getElementById(id);
  el.style.display = el.style.display != "none" ? "none" : modo;
  setTimeout(() => {
    if (el.style.display == modo) el.scrollIntoView({ behavior: "smooth" });
  }, 100);
}
