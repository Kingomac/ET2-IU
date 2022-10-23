function comprobarIdRol() {
  const idInput = "id_rol";
  if (!size_maximo(idInput, 4)) {
    mensajeError({
      codigo: "id_rol_largo",
      idInput,
    });
    return false;
  }
  if (!size_minimo(idInput, 1)) {
    mensajeError({
      codigo: "id_rol_corto",
      idInput,
    });
    return false;
  }
  if (document.getElementById(idInput).valueAsNumber < 0) {
    mensajeError({
      codigo: "id_rol_negativo",
      idInput,
    });
    return false;
  }
  mensajeOK(idInput);
  return true;
}

function comprobarNombreRol() {
  const idInput = "nombre_rol";
  if (!size_maximo(idInput, 48)) {
    mensajeError({
      codigo: "nombre_rol_largo",
      idInput,
    });
    return false;
  }
  if (!size_minimo(idInput, 6)) {
    mensajeError({
      codigo: "nombre_rol_corto",
      idInput,
    });
    return false;
  }
  if (/[À-ÿ]/.test(document.getElementById(idInput).value)) {
    mensajeError({
      codigo: "nombre_rol_acentos",
      idInput,
    });
    return false;
  }
  mensajeOK(idInput);
  return true;
}

function comprobarDescripRol() {
  const idInput = "descrip_rol";
  if (!size_maximo(idInput, 200)) {
    mensajeError({
      codigo: "descrip_rol_largo",
      idInput,
    });
    return false;
  }
  if (!size_minimo(idInput, 20)) {
    mensajeError({
      codigo: "descrip_rol_corto",
      idInput,
    });
    return false;
  }
  if (/[\=\<\>\$\#\{\}\[\]]/.test(document.getElementById(idInput).value)) {
    mensajeError({
      codigo: "descrip_rol_caracteres_invalidos",
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

function comprobarIdRolSearch() {
  const idInput = "id_rol";
  if (!size_maximo(idInput, 4)) {
    mensajeError({
      codigo: "id_rol_largo",
      idInput,
    });
    return false;
  }
  const valorCampo = document.getElementById(idInput).valueAsNumber;
  if (valorCampo != NaN && valorCampo < 0) {
    mensajeError({
      codigo: "id_rol_negativo",
      idInput,
    });
    return false;
  }
  mensajeOK(idInput);
  return true;
}

function comprobarNombreRolSearch() {
  const idInput = "nombre_rol";
  if (!size_maximo(idInput, 48)) {
    mensajeError({
      codigo: "nombre_rol_largo",
      idInput,
    });
    return false;
  }
  if (/[À-ÿ]/.test(document.getElementById(idInput).value)) {
    mensajeError({
      codigo: "nombre_rol_acentos",
      idInput,
    });
    return false;
  }
  mensajeOK(idInput);
  return true;
}

function comprobarDescripRolSearch() {
  const idInput = "descrip_rol";
  if (!size_maximo(idInput, 200)) {
    mensajeError({
      codigo: "descrip_rol_largo",
      idInput,
    });
    return false;
  }
  if (/[\=\<\>\$\#\{\}\[\]]/.test(document.getElementById(idInput).value)) {
    mensajeError({
      codigo: "descrip_rol_caracteres_invalidos",
      idInput,
    });
    return false;
  }
  mensajeOK(idInput);
  return true;
}
