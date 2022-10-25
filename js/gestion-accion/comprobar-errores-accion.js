function comprobarIdAccion() {
  const idInput = "id_accion";
  if (!size_maximo(idInput, 4)) {
    mensajeError({
      codigo: "id_accion_largo",
      idInput,
    });
    return false;
  }
  if (!size_minimo(idInput, 1)) {
    mensajeError({
      codigo: "id_accion_corto",
      idInput,
    });
    return false;
  }
  if (document.getElementById(idInput).valueAsNumber < 0) {
    mensajeError({
      codigo: "id_accion_negativo",
      idInput,
    });
    return false;
  }
  mensajeOK(idInput);
  return true;
}

function comprobarNombreAccion() {
  const idInput = "nombre_accion";
  if (!size_maximo(idInput, 48)) {
    mensajeError({
      codigo: "nombre_accion_largo",
      idInput,
    });
    return false;
  }
  if (!size_minimo(idInput, 6)) {
    mensajeError({
      codigo: "nombre_accion_corto",
      idInput,
    });
    return false;
  }
  if (/[À-ÿ]/.test(document.getElementById(idInput).value)) {
    mensajeError({
      codigo: "nombre_accion_acentos",
      idInput,
    });
    return false;
  }
  mensajeOK(idInput);
  return true;
}

function comprobarDescripAccion() {
  const idInput = "descrip_accion";
  if (!size_maximo(idInput, 200)) {
    mensajeError({
      codigo: "descrip_accion_largo",
      idInput,
    });
    return false;
  }
  if (!size_minimo(idInput, 20)) {
    mensajeError({
      codigo: "descrip_accion_corto",
      idInput,
    });
    return false;
  }
  if (/[\=\<\>\$\#\{\}\[\]]/.test(document.getElementById(idInput).value)) {
    mensajeError({
      codigo: "descrip_accion_caracteres_invalidos",
      idInput,
    });
    return false;
  }
  mensajeOK(idInput);
  return true;
}

/*************************************************************************************************************/
/****************************************** SEARCH  **********************************************************/
/*************************************************************************************************************/

function comprobarIdAccionSearch() {
  const idInput = "id_accion";
  if (!size_maximo(idInput, 4)) {
    mensajeError({
      codigo: "id_accion_largo",
      idInput,
    });
    return false;
  }
  const valorCampo = document.getElementById(idInput).valueAsNumber;
  if (valorCampo != NaN && valorCampo < 0) {
    mensajeError({
      codigo: "id_accion_negativo",
      idInput,
    });
    return false;
  }
  mensajeOK(idInput);
  return true;
}

function comprobarNombreAccionSearch() {
  const idInput = "nombre_accion";
  if (!size_maximo(idInput, 48)) {
    mensajeError({
      codigo: "nombre_accion_largo",
      idInput,
    });
    return false;
  }
  if (/[À-ÿ]/.test(document.getElementById(idInput).value)) {
    mensajeError({
      codigo: "nombre_accion_acentos",
      idInput,
    });
    return false;
  }
  mensajeOK(idInput);
  return true;
}

function comprobarDescripAccionSearch() {
  const idInput = "descrip_accion";
  if (!size_maximo(idInput, 200)) {
    mensajeError({
      codigo: "descrip_accion_largo",
      idInput,
    });
    return false;
  }
  if (/[\=\<\>\$\#\{\}\[\]]/.test(document.getElementById(idInput).value)) {
    mensajeError({
      codigo: "descrip_accion_caracteres_invalidos",
      idInput,
    });
    return false;
  }
  mensajeOK(idInput);
  return true;
}
