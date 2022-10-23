function ponerinvisibleerror() {
  document.getElementById("id_caja_error").style.display = "none";
}

function ponerinvisibleformusuario() {
  document.getElementById("id_caja_formulario_usuario").style.display = "none";
}

function setDivInvisible(form) {
  document.getElementById(form).style.display = "none";
}

function mensajeKO(idElemento, texto) {
  document.getElementById("id_texterror").innerHTML = texto;
  document.getElementById("id_caja_error").style.display = "block";
  document.getElementById(idElemento).style.borderColor = "#ff0000";
}

function mensajeOK(idElemento) {
  document.getElementById("id_texterror").innerHTML = "";
  document.getElementById("id_caja_error").style.display = "none";
  document.getElementById(idElemento).style.borderColor = "#00e600";
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
}
