function comprobarNombrePersona() {
  const idInput = "nombre_persona";
  if (!size_maximo(idInput, 15)) {
    mensajeError({
      codigo: "nombre_persona_largo",
      idInput,
    });
    return false;
  }
  if (!size_minimo(idInput, 3)) {
    mensajeError({
      codigo: "nombre_persona_corto",
      idInput,
    });
    return false;
  }
  if (
    /^[^a-zA-Z\sÁÉÍÓÚáéíóúñÑ]+$/.test(document.getElementById(idInput).value)
  ) {
    mensajeError({
      codigo: "nombre_persona_caracteres_invalidos",
      idInput,
    });
    return false;
  }
  mensajeOK(idInput);
  return true;
}

function comprobarApellidosPersona() {
  const idInput = "apellidos_persona";
  if (!size_maximo(idInput, 100)) {
    mensajeError({
      codigo: "apellidos_persona_largo",
      idInput,
    });
    return false;
  }
  if (!size_minimo(idInput, 5)) {
    mensajeError({
      codigo: "apellidos_persona_corto",
      idInput,
    });
    return false;
  }
  if (
    !/^[a-zA-Z\-\sÁÉÍÓÚáéíóúñÑ]+$/.test(document.getElementById(idInput).value)
  ) {
    mensajeError({
      codigo: "apellidos_persona_caracteres_invalidos",
      idInput,
    });
    return false;
  }
  mensajeOK(idInput);
  return true;
}

function comprobarDireccionPersona() {
  const idInput = "direccion_persona";
  if (!size_maximo(idInput, 200)) {
    mensajeError({
      codigo: "direccion_persona_largo",
      idInput,
    });
    return false;
  }
  if (!size_minimo(idInput, 10)) {
    mensajeError({
      codigo: "direccion_persona_corta",
      idInput,
    });
    return false;
  }
  if (
    !/^[0-9a-zA-ZñÑÁÉÍ´PÚáéíóú\s\/\-\,\º\ª]+$/.test(
      document.getElementById(idInput).value
    )
  ) {
    mensajeError({
      codigo: "direccion_persona_caracteres_invalidos",
      idInput,
    });
    return false;
  }
  mensajeOK(idInput);
  return true;
}

function comprobarTelefonoPersona() {
  const idInput = "telefono_persona";
  if (!size_maximo(idInput, 9)) {
    mensajeError({
      codigo: "telefono_persona_largo",
      idInput,
    });
    return false;
  }
  if (!size_minimo(idInput, 9)) {
    mensajeError({
      codigo: "telefono_persona_corto",
      idInput,
    });
    return false;
  }
  if (!/^[0-9]{9}$/.test(document.getElementById(idInput).value)) {
    mensajeError({
      codigo: "telefono_persona_caracteres_invalidos",
      idInput,
    });
    return false;
  }
  mensajeOK(idInput);
  return true;
}

function comprobarEmailPersona() {
  const idInput = "email_persona";
  if (!size_maximo(idInput, 45)) {
    mensajeError({
      codigo: "email_persona_largo",
      idInput,
    });
    return false;
  }
  if (!size_minimo(idInput, 8)) {
    mensajeError({
      codigo: "email_persona_corto",
      idInput,
    });
    return false;
  }
  const valorCampo = document.getElementById(idInput).value;
  if (!/^[0-9a-zA-ZáéíúóÁÉÍÓÚ\-\_\+\.\@]+$/.test(valorCampo)) {
    mensajeError({
      codigo: "email_persona_caracteres_invalidos",
      idInput,
    });
    return false;
  }
  if (
    !/^([a-zA-ZáéíúóÁÉÍÓÚ\-\_\+\.]+)\@([a-zA-ZáéíúóÁÉÍÓÚ\-\_\+\.]+)\.([a-zA-ZáéíúóÁÉÍÓÚ\-\_\+\.]+)$/.test(
      valorCampo
    )
  ) {
    mensajeError({
      codigo: "email_persona_formato_invalido",
      idInput,
    });
    return false;
  }

  if (valorCampo.startsWith(".") || valorCampo.endsWith(".")) {
    mensajeError({
      codigo: "email_persona_empieza_termina_punto",
      idInput,
    });
    return false;
  }
  mensajeOK(idInput);
  return true;
}

function comprobarFotoPersona() {
  const idInput = "foto_persona";
  if (!size_maximo(idInput, 45)) {
    mensajeError({
      codigo: "foto_persona_largo",
      idInput,
    });
    return false;
  }
  const valorCampo = document.getElementById(idInput).value;
  if (valorCampo.length > 1 && !size_minimo(idInput, 6)) {
    mensajeError({
      codigo: "foto_persona_corto",
      idInput,
    });
    return false;
  }
  if (!/^[^À-ÿ]*$/.test(valorCampo)) {
    mensajeError({
      codigo: "foto_persona_caracteres_invalidos",
      idInput,
    });
    return false;
  }

  if (!/^.*\.(png|jpg)$/.test(valorCampo)) {
    mensajeError({
      codigo: "foto_persona_formato_fichero_incorrecto",
      idInput,
    });
  }
  mensajeOK(idInput);
  return true;
}

function comprobarFechaNacimientoPersona() {
  const idInput = "fechaNacimiento_persona";
  if (document.getElementById(idInput).value == "") {
    mensajeError({
      codigo: "fechaNacimiento_invalida",
      idInput,
    });
    return false;
  }
  const valorCampo = document.getElementById(idInput).valueAsDate;
  if (valorCampo.valueOf() > Date.now()) {
    mensajeError({
      codigo: "fechaNacimiento_persona_futura",
      idInput,
    });
    return false;
  }
  mensajeOK(idInput);
  return true;
}

/*******************************************************************************+ */
// #####################################################################################
/************************************************************************************ */

function comprobarNombrePersonaSearch() {
  const idInput = "nombre_persona";
  if (!size_maximo(idInput, 15)) {
    mensajeError({
      codigo: "nombre_persona_largo",
      idInput,
    });
    return false;
  }
  if (
    /^[^a-zA-Z\sÁÉÍÓÚáéíóúñÑ]+$/.test(document.getElementById(idInput).value)
  ) {
    mensajeError({
      codigo: "nombre_persona_caracteres_invalidos",
      idInput,
    });
    return false;
  }
  mensajeOK(idInput);
  return true;
}

function comprobarApellidosPersonaSearch() {
  const idInput = "apellidos_persona";
  if (!size_maximo(idInput, 100)) {
    mensajeError({
      codigo: "apellidos_persona_largo",
      idInput,
    });
    return false;
  }
  if (
    !/^[a-zA-Z\-\sÁÉÍÓÚáéíóúñÑ]*$/.test(document.getElementById(idInput).value)
  ) {
    mensajeError({
      codigo: "apellidos_persona_caracteres_invalidos",
      idInput,
    });
    return false;
  }
  mensajeOK(idInput);
  return true;
}

function comprobarDireccionPersonaSearch() {
  const idInput = "direccion_persona";
  if (!size_maximo(idInput, 200)) {
    mensajeError({
      codigo: "direccion_persona_largo",
      idInput,
    });
    return false;
  }
  if (
    !/^[0-9a-zA-ZñÑÁÉÍ´PÚáéíóú\s\/\-\,\º\ª]*$/.test(
      document.getElementById(idInput).value
    )
  ) {
    mensajeError({
      codigo: "direccion_persona_caracteres_invalidos",
      idInput,
    });
    return false;
  }
  mensajeOK(idInput);
  return true;
}

function comprobarTelefonoPersonaSearch() {
  const idInput = "telefono_persona";
  if (!size_maximo(idInput, 9)) {
    mensajeError({
      codigo: "telefono_persona_largo",
      idInput,
    });
    return false;
  }
  if (!/^[0-9]*$/.test(document.getElementById(idInput).value)) {
    mensajeError({
      codigo: "telefono_persona_caracteres_invalidos",
      idInput,
    });
    return false;
  }
  mensajeOK(idInput);
  return true;
}

function comprobarEmailPersonaSearch() {
  const idInput = "email_persona";
  if (!size_maximo(idInput, 45)) {
    mensajeError({
      codigo: "email_persona_largo",
      idInput,
    });
    return false;
  }
  const valorCampo = document.getElementById(idInput).value;
  if (!/^[0-9a-zA-ZáéíúóÁÉÍÓÚ\-\_\+\.\@]*$/.test(valorCampo)) {
    mensajeError({
      codigo: "email_persona_caracteres_invalidos",
      idInput,
    });
    return false;
  }

  if (valorCampo.split("@").length - 1 > 1) {
    mensajeError({
      codigo: "email_persona_demasiadas_arrobas",
      idInput,
    });
  }

  if (valorCampo.startsWith(".") || valorCampo.endsWith(".")) {
    mensajeError({
      codigo: "email_persona_empieza_termina_punto",
      idInput,
    });
    return false;
  }
  mensajeOK(idInput);
  return true;
}

function comprobarFotoPersonaSearch() {
  const idInput = "foto_persona";
  if (!size_maximo(idInput, 45)) {
    mensajeError({
      codigo: "foto_persona_largo",
      idInput,
    });
    return false;
  }
  const valorCampo = document.getElementById(idInput).value;
  if (!/^[^À-ÿ]*$/.test(valorCampo)) {
    mensajeError({
      codigo: "foto_persona_caracteres_invalidos",
      idInput,
    });
    return false;
  }
  mensajeOK(idInput);
  return true;
}

function comprobarFechaNacimientoPersonaSearch() {
  const idInput = "fechaNacimiento_persona";
  if (document.getElementById(idInput).value == "") {
    mensajeOK(idInput);
    return true;
  }
  const valorCampo = document.getElementById(idInput).valueAsDate;
  if (valorCampo.valueOf() > Date.now()) {
    mensajeError({
      codigo: "fechaNacimiento_persona_futura",
      idInput,
    });
    return false;
  }
  mensajeOK(idInput);
  return true;
}
