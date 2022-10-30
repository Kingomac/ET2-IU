function comprobar_contrasena() {
  const idInput = "id_contrasena";
  if (!size_maximo(idInput, 45)) {
    mensajeError({
      codigo: "contrasena_format_larga",
      idInput,
    });
    return false;
  }
  if (!size_minimo(idInput, 3)) {
    mensajeError({
      codigo: "contrasena_format_corta",
      idInput,
    });
    return false;
  }
  if (/[^a-zA-Z0-9\_\-]/.test(document.getElementById(idInput).value)) {
    mensajeError({
      codigo: "contrasena_caracteres_invalidos",
      idInput,
    });
    return false;
  }
  mensajeOK(idInput);
  return true;
}

function comprobar_contrasena_verificada() {
  if ($("#id_contrasena").val() != $("#id_contrasena_verificar").val()) {
    mensajeError({
      codigo: "contrasena_no_verifica",
      idInput: "id_contrasena_verificar",
    });
    return false;
  }
  mensajeOK("id_contrasena_verificar");
  return true;
}

function comprobarFormPersona() {
  return (
    comprobar_dni() &&
    comprobarNombrePersona() &&
    comprobarApellidosPersona() &&
    comprobarDireccionPersona() &&
    comprobarTelefonoPersona() &&
    comprobarEmailPersona() &&
    comprobarFotoPersona() &&
    comprobarFechaNacimientoPersona()
  );
}

function comprobarFormUsuario() {
  return (
    comprobar_usuario() &&
    comprobar_contrasena() &&
    comprobar_contrasena_verificada()
  );
}

async function appendSelectRoles() {
  document.getElementById("id_fields_usuario").append(
    await crearSelectRoles({
      readonly: false,
      vacio: false,
    })
  );
}

async function registrar() {
  try {
    encriptarpassword();
    await peticionBackRegistrar();
    window.location.href = "login.html";
  } catch (err) {
    mensajeError({
      codigo: err,
      idInput: "id_form_registro",
    });
  }
}

function peticionBackRegistrar() {
  console.info("peticion registrar usuario back");
  eliminarCamposOcultos("id_form_registro");
  insertarCampoOculto("id_form_registro", "controlador", "AUTH");
  insertarCampoOculto("id_form_registro", "action", "REGISTRAR");
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      url: URL_BACK,
      data: $("#id_form_registro").serialize(),
    })
      .done((res) => {
        if (res.ok != true || res.code != "REGISTRAR_OK") {
          reject(res.code);
        } else {
          resolve(res);
        }
      })
      .fail(function (jqXHR) {
        reject(`http_status_${jqXHR}`);
      });
  });
}
