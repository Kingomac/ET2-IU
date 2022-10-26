function comprobarIdFuncionalidad() {
  const idInput = "id_funcionalidad";
  if (!size_maximo(idInput, 4)) {
    mensajeError({
      codigo: "id_funcionalidad_largo",
      idInput,
    });
    return false;
  }
  if (!size_minimo(idInput, 1)) {
    mensajeError({
      codigo: "id_funcionalidad_corto",
      idInput,
    });
    return false;
  }
  if (document.getElementById(idInput).valueAsNumber < 0) {
    mensajeError({
      codigo: "id_funcionalidad_negativo",
      idInput,
    });
    return false;
  }
  mensajeOK(idInput);
  return true;
}

function comprobarNombreFuncionalidad() {
  const idInput = "nombre_funcionalidad";
  if (!size_maximo(idInput, 48)) {
    mensajeError({
      codigo: "nombre_funcionalidad_largo",
      idInput,
    });
    return false;
  }
  if (!size_minimo(idInput, 6)) {
    mensajeError({
      codigo: "nombre_funcionalidad_corto",
      idInput,
    });
    return false;
  }
  if (/[À-ÿ]/.test(document.getElementById(idInput).value)) {
    mensajeError({
      codigo: "nombre_funcionalidad_acentos",
      idInput,
    });
    return false;
  }
  mensajeOK(idInput);
  return true;
}

function comprobarDescripFuncionalidad() {
  const idInput = "descrip_funcionalidad";
  if (!size_maximo(idInput, 200)) {
    mensajeError({
      codigo: "descrip_funcionalidad_largo",
      idInput,
    });
    return false;
  }
  if (!size_minimo(idInput, 20)) {
    mensajeError({
      codigo: "descrip_funcionalidad_corto",
      idInput,
    });
    return false;
  }
  if (/[\=\<\>\$\#\{\}\[\]]/.test(document.getElementById(idInput).value)) {
    mensajeError({
      codigo: "descrip_funcionalidad_caracteres_invalidos",
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

function comprobarIdFuncionalidadSearch() {
  const idInput = "id_funcionalidad";
  if (!size_maximo(idInput, 4)) {
    mensajeError({
      codigo: "id_funcionalidad_largo",
      idInput,
    });
    return false;
  }
  const valorCampo = document.getElementById(idInput).valueAsNumber;
  if (valorCampo != NaN && valorCampo < 0) {
    mensajeError({
      codigo: "id_funcionalidad_negativo",
      idInput,
    });
    return false;
  }
  mensajeOK(idInput);
  return true;
}

function comprobarNombreFuncionalidadSearch() {
  const idInput = "nombre_funcionalidad";
  if (!size_maximo(idInput, 48)) {
    mensajeError({
      codigo: "nombre_funcionalidad_largo",
      idInput,
    });
    return false;
  }
  if (/[À-ÿ]/.test(document.getElementById(idInput).value)) {
    mensajeError({
      codigo: "nombre_funcionalidad_acentos",
      idInput,
    });
    return false;
  }
  mensajeOK(idInput);
  return true;
}

function comprobarDescripFuncionalidadSearch() {
  const idInput = "descrip_funcionalidad";
  if (!size_maximo(idInput, 200)) {
    mensajeError({
      codigo: "descrip_funcionalidad_largo",
      idInput,
    });
    return false;
  }
  if (/[\=\<\>\$\#\{\}\[\]]/.test(document.getElementById(idInput).value)) {
    mensajeError({
      codigo: "descrip_funcionalidad_caracteres_invalidos",
      idInput,
    });
    return false;
  }
  mensajeOK(idInput);
  return true;
}
