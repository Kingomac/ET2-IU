// comprobar_form_usuario_add()
// funcion para validar el submit del formulario usuario para las acciones que no sean search

function comprobar_form_usuario_add() {
  if (comprobar_dni() && comprobar_usuario() && comprobar_id_rol()) {
    return true;
  } else {
    return false;
  }
}

// comprobar_form_usuario_search()
// funcion para validar el submit del formulario de usuario para la accion search
function comprobar_form_usuario_search() {
  if (
    comprobar_dni_search() &&
    comprobar_usuario_search() &&
    comprobar_id_rol_search()
  ) {
    return true;
  }
  return false;
}

// comprobar_usuario()
// funcion de validación de formato de usuario en acciones que no sean search
function comprobar_usuario() {
  if (!size_minimo("id_usuario", 3)) {
    mensajeError({
      codigo: "login_corto",
      idInput: "id_usuario",
    });
    return false;
  }
  if (!size_maximo("id_usuario", 15)) {
    mensajeError({
      idInput: "id_usuario",
      codigo: "login_largo",
    });
    return false;
  }
  if (!letrassinacentoynumeros("id_usuario")) {
    mensajeError({
      idInput: "id_usuario",
      codigo: "login_acentos",
    });
    return false;
  }

  mensajeOK("id_usuario");
  return true;
}

// comprobar_usuario_search()
// funcion de validación de formato de usuario en search
function comprobar_usuario_search() {
  const usuario = document.getElementById("id_usuario").value;
  if (usuario.length > 15) {
    mensajeError({
      codigo: "login_largo",
      idInput: "id_usuario",
    });
    return false;
  }
  mensajeOK("id_usuario");
  return true;
}

// comprobar_dni()
// funcion de validación de formato de dni en acciones que no sean search
function comprobar_dni() {
  const dni = document.querySelector("#id_dni").value;
  if (dni.length != 9) {
    mensajeError({
      idInput: "id_dni",
      codigo: "dni_size",
    });
    return false;
  }
  if (!/^[0-9]{8}[a-zA-Z]$/.test(dni)) {
    mensajeError({
      idInput: "id_dni",
      codigo: "dni_format",
    });
    return false;
  }
  const letrasDNI = "TRWAGMYFPDXBNJZSQVHLCKE";
  if (dni.charAt(8) != letrasDNI.charAt(dni.slice(0, 8) % letrasDNI.length)) {
    mensajeError({
      idInput: "id_dni",
      codigo: "dni_incorrecto",
    });
    return false;
  }
  mensajeOK("id_dni");
  return true;
}

// comprobar_dni_search()
// funcion de validación de formato de dni en search
function comprobar_dni_search() {
  const dni = document.querySelector("#id_dni").value;
  if (dni.length > 9) {
    mensajeError({
      idInput: "id_dni",
      codigo: "dni_size_largo",
    });
    return false;
  }
  if (!/^[0-9]{0,8}[a-zA-Z]{0,1}$/.test(dni)) {
    mensajeError({
      idInput: "id_dni",
      codigo: "dni_format_search",
    });
    return false;
  }

  mensajeOK("id_dni");
  return true;
}

// comprobar_id_rol()
// funcion de validacion del formato de id_rol en acciones que no son search
function comprobar_id_rol() {
  return true;
}

// comprobar_id_rol_search()
// funcion de validacion del formato de id_rol
function comprobar_id_rol_search() {
  return true;
}
