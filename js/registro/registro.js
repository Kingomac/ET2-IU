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
  if (!comprobarFormPersona() || !comprobarFormUsuario()) return false;
  try {
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
  insertarCampoOculto(
    "id_form_registro",
    "contrasena",
    hex_md5(document.getElementById("id_contrasena").value)
  );
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
        reject(`http_status_${jqXHR.status}`);
      });
  });
}
