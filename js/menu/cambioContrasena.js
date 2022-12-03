function peticionBackCambiarContrasena(
  { dni, contrasenaSinEncriptar } = {
    dni: undefined,
    contrasenaSinEncriptar: undefined,
  }
) {
  const datoDni = dni || document.getElementById("cc_dni").value;
  const datoContrasena =
    contrasenaSinEncriptar ||
    document.getElementById("cc_contrasena_noencriptada");

  const datos = new URLSearchParams({
    controlador: "AUTH",
    action: "CAMBIAR_CONTRASENA",
    dni: datoDni,
    contrasena: hex_md5(datoContrasena),
  });

  return new Promise(function (resolve, reject) {
    $.ajax({
      method: "POST",
      url: URL_BACK,
      data: datos,
      processData: false,
      contentType: false,
    })
      .done((res) => {
        if (res.code != "CAMBIAR_contrasena_OK") {
          reject(res.code);
        } else {
          resolve(res);
        }
      })
      .fail(function (jqXHR) {
        mensajeError({
          idInput: "id_form_cambiar_contrasena",
          codigo: `http_status_${jqXHR}`,
        });
      });
  });
}

async function cambiarContrasenaLogin() {
  if (
    !comprobar_dni({ idInput: "cc_dni" }) ||
    !comprobar_contrasena({ idInput: "cc_contrasena_noencriptada" })
  ) {
    return false;
  }
  try {
    await peticionBackCambiarContrasena();
    mensajeOK("id_fields_cambiar_contrasena");
    document.getElementById("modal-recuperar-contrasena").close();
  } catch (err) {
    mensajeError({
      idInput: "id_form_cambiar_contrasena",
      codigo: err,
    });
  }
}

async function cambiarContrasenaMenu() {
  if (!comprobar_contrasena({ idInput: "cc_contrasena_noencriptada" })) {
    return false;
  }
  try {
    await peticionBackCambiarContrasena({ dni: await getDniUsuario() });
    mensajeOK("id_fields_cambiar_contrasena");
    document.getElementById("modal-recuperar-contrasena").close();
  } catch (err) {
    mensajeError({
      idInput: "id_form_cambiar_contrasena",
      codigo: err,
    });
  }
}

async function getDniUsuario(usuario = getUsuarioConectado()) {
  const datos = new URLSearchParams({
    controlador: "usuario",
    action: "SEARCH",
    usuario: usuario,
  });
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      url: URL_BACK,
      data: datos,
      processData: false,
      contentType: false,
    })
      .done((res) => {
        if (res.ok != true || res.code != "RECORDSET_DATOS") {
          reject(res);
        } else resolve(res.resource[0].dni);
      })
      .fail((res) => {
        reject(res);
      });
  });
}
