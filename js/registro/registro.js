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

async function registrar() {
  const results = await Promise.allSettled([
    peticionBackAddPersona(),
    peticionADDusuarioBack(),
  ]);
  for (const i of results) {
    if (i.status == "rejected") {
      console.error("error registrar", err);
      mensajeError({
        codigo: `http_status_${err.status}`,
        idInput: "id_form_registro",
      });
      continue;
    }

    console.log("resultado promesa registro", i.value);
  }
}
