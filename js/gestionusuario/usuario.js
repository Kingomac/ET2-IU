/**
 * Hace petición al back de add usuario
 * @returns
 */
function peticionADDusuarioBack() {
  console.info("peticion add usuario back");
  eliminarCamposOcultos("id_form_usuario");
  insertarCampoOculto("id_form_usuario", "controlador", "usuario");
  insertarCampoOculto("id_form_usuario", "action", "ADD");
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      url: URL_BACK,
      data: $("#id_form_usuario").serialize(),
    })
      .done((res) => {
        if (res.ok != true || res.code != "SQL_OK") {
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

// peticionEDITusuarioBack()
// funcion que utilizariamos para hacer una solicitud a back para editar un usuario
function peticionEDITusuarioBack() {
  console.info("peticion edit usuario back");
  eliminarCamposOcultos("id_form_usuario");
  insertarCampoOculto("id_form_usuario", "controlador", "usuario");
  insertarCampoOculto("id_form_usuario", "action", "EDIT");
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      url: URL_BACK,
      data: $("#id_form_usuario").serialize(),
    })
      .done((res) => {
        if (res.ok != true || res.code != "SQL_OK") {
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

// peticionDELETEusuarioBack()
// funcion que utilizariamos para hacer una solicitud a back para borrar un usuario
function peticionDELETEusuarioBack() {
  console.info("peticion delete usuario back");
  eliminarCamposOcultos("id_form_usuario");
  insertarCampoOculto("id_form_usuario", "controlador", "usuario");
  insertarCampoOculto("id_form_usuario", "action", "DELETE");
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      url: URL_BACK,
      data: $("#id_form_usuario").serialize(),
    })
      .done((res) => {
        if (res.code != "SQL_OK") {
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

function peticionSEARCHusuarioBack() {
  console.info("peticion detail usuario back");
  eliminarCamposOcultos("id_form_usuario");
  insertarCampoOculto("id_form_usuario", "controlador", "usuario");
  insertarCampoOculto("id_form_usuario", "action", "SEARCH");
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      url: URL_BACK,
      data: $("#id_form_usuario").serialize(),
    })
      .done((res) => {
        if (res.ok != true || res.code != "RECORDSET_DATOS") {
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

/**
 *
 * @returns {Promise<{dni: string, contrasena: string, id_rol: number|{id_rol: number, nombre_rol: string, descrip_rol: string}, usuario: string}[]>}
 */
function peticionBackSHOWALLusuario() {
  const datos = new FormData();
  datos.append("controlador", "usuario");
  datos.append("action", "SEARCH");
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
        } else resolve(res.resource);
      })
      .fail((res) => {
        reject(res);
      });
  });
}
