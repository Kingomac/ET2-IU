function comprobar_form_login() {
  if (
    comprobar_usuario() &&
    comprobar_contrasena({ idInput: "id_contrasena_noencriptada" })
  ) {
    return true;
  } else {
    return false;
  }
}

function comprobar_usuario() {
  if (!size_minimo("id_usuario", 3)) {
    mensajeError({ idInput: "id_usuario", codigo: "login_corto" });
    return false;
  }
  if (!size_maximo("id_usuario", 15)) {
    mensajeError({ idInput: "id_usuario", codigo: "login_largo" });
    return false;
  }
  if (!letrassinacentoynumeros("id_usuario")) {
    mensajeError({ idInput: "id_usuario", codigo: "login_acentos" });
    return false;
  }

  mensajeOK("id_usuario");
  return true;
}

//Función ajax con promesas
function loginAjaxPromesa() {
  eliminarCamposOcultos("id_form_login");
  insertarCampoOculto("id_form_login", "controlador", "AUTH");
  insertarCampoOculto("id_form_login", "action", "LOGIN");
  insertarCampoOculto(
    "id_form_login",
    "contrasena",
    hex_md5($("#id_contrasena_noencriptada").val())
  );

  return new Promise(function (resolve, reject) {
    $.ajax({
      method: "POST",
      url: URL_BACK,
      data: $("#id_form_login").serialize(),
    })
      .done((res) => {
        if (res.code != "LOGIN_OK") {
          reject(res.code);
        } else {
          resolve(res.resource);
        }
      })
      .fail(function (jqXHR) {
        mensajeErrorModal({
          idInput: "id_form_login",
          codigo: `http_status_${jqXHR.code}`,
        });
      });
  });
}

async function login() {
  if (!comprobar_form_login()) {
    return;
  }
  await loginAjaxPromesa()
    .then((res) => {
      mensajeOK("id_form_login");
      conectarUsuario({
        token: res,
        usuarioSistema: document.getElementById("id_usuario").value,
      });
      window.location.href = "menu.html";
    })
    .catch((res) => {
      mensajeErrorModal({ idInput: "id_form_login", codigo: res });
      console.log("HOLA MIRAME 🙌🙌🙌🙌", res);
      //eliminarcampo('controlador');
      //eliminarcampo('action');
      //setLang(idioma);
    });
}
