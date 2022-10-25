function comprobar_form_login() {
  if (comprobar_usuario() && comprobar_contrasena()) {
    encriptarpassword();
    return true;
  } else {
    return false;
  }
}

function comprobar_usuario() {
  if (!size_minimo("id_usuario", 3)) {
    mensajeError("id_usuario", "login_corto");
    return false;
  }
  if (!size_maximo("id_usuario", 15)) {
    mensajeError("id_usuario", "login_largo");
    return false;
  }
  if (!letrassinacentoynumeros("id_usuario")) {
    mensajeError("id_usuario", "login_acentos");
    return false;
  }

  mensajeOK("id_usuario");
  return true;
}

function comprobar_contrasena() {
  if (!size_minimo("id_contrasena", 3)) {
    mensajeError("id_contrasena", "pass_corta");
    return false;
  }
  if (!size_maximo("id_contrasena", 15)) {
    mensajeError("id_contrasena", "pass_larga");
    return false;
  }
  if (!letrassinacentoynumeros("id_contrasena")) {
    mensajeError("id_contrasena", "pass_acentos");
    return false;
  }

  mensajeOK("id_contrasena");
  return true;
}

//Función ajax con promesas
function loginAjaxPromesa() {
  insertarCampoOculto("id_form_login", "controlador", "AUTH");
  insertarCampoOculto("id_form_login", "action", "LOGIN");

  return new Promise(function (resolve, reject) {
    $.ajax({
      method: "POST",
      url: URL_BACK,
      data: $("#id_form_login").serialize(),
    })
      .done((res) => {
        if (res.code != "LOGIN_OK") {
          reject(res);
        } else {
          resolve(res);
        }
      })
      .fail(function (jqXHR) {
        mensajeFAIL(jqXHR.status);
      });
  });
}

async function login() {
  await loginAjaxPromesa()
    .then((res) => {
      writeCookie({ clave: LOGIN_COOKIE_TOKEN, valor: res.resource });
      writeCookie({
        clave: LOGIN_COOKIE_USUARIO_SISTEMA,
        valor: document.getElementById("id_usuario").value,
      });
      window.location.href = "gestionusuario.html";
    })
    .catch((res) => {
      console.log("error: ", res.code);
      mensajeError("id_form_login", res.code);
      //eliminarcampo('controlador');
      //eliminarcampo('action');
      //setLang(idioma);
    });
}
