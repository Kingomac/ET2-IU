function peticionBackAddPersona() {
  console.info("peticion add persona back");
  eliminarCamposOcultos("id_form_persona");
  insertarCampoOculto("id_form_persona", "controlador", "persona");
  insertarCampoOculto("id_form_persona", "action", "ADD");
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      url: URL_BACK,
      data: $("#id_form_persona").serialize(),
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

function peticionBackDeletePersona() {
  console.info("peticion add persona back");
  eliminarCamposOcultos("id_form_persona");
  insertarCampoOculto("id_form_persona", "controlador", "persona");
  insertarCampoOculto("id_form_persona", "action", "DELETE");
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      url: URL_BACK,
      data: $("#id_form_persona").serialize(),
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

function peticionEditPersona() {
  console.info("peticion edit persona back");
  eliminarCamposOcultos("id_form_persona");
  insertarCampoOculto("id_form_persona", "controlador", "persona");
  insertarCampoOculto("id_form_persona", "action", "EDIT");
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      url: URL_BACK,
      data: $("#id_form_persona").serialize(),
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

function peticionBackSearchPersona() {
  console.info("peticion add persona back");
  eliminarCamposOcultos("id_form_persona");
  insertarCampoOculto("id_form_persona", "controlador", "persona");
  insertarCampoOculto("id_form_persona", "action", "SEARCH");
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      url: URL_BACK,
      data: $("#id_form_persona").serialize(),
    })
      .done((res) => {
        if (res.ok != true || res.code != "RECORDSET_DATOS") {
          reject(res.code);
        } else {
          resolve(res.resource);
        }
      })
      .fail(function (jqXHR) {
        reject(`http_status_${jqXHR.status}`);
      });
  });
}

/**
 * @returns {Promise<{dni: string, nombre_persona: string, apellidos_persona: string, fechaNacimiento_persona: Date, direccion_persona: string, telefono_persona: number, email_persona: string, foto_persona: string}[]>}
 */
function peticionBackShowAllPersona() {
  const datos = new FormData();
  datos.append("controlador", "persona");
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
        } else {
          resolve(res.resource);
        }
      })
      .fail((res) => {
        reject(res);
      });
  });
}
