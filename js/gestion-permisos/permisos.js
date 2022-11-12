/**
 * Petición back de rolaccionfuncionalidad
 * siempre hay para cada par funcionalidad acción una entrada de Admin
 * @returns {Promise<{
        id_funcionalidad: {
          id_funcionalidad: number,
          nombre_funcionalidad: string,
          descrip_funcionalidad: string
        },
        id_accion: {
          id_accion: number,
          nombre_accion: string,
          descrip_accion: string
        },
        id_rol: {
          id_rol: number,
          nombre_rol: string,
          descrip_rol: string
        }
      }[]>}
 */
function peticionBackSHOWALLrolaccionfuncionalidad() {
  const datos = new FormData();
  datos.append("controlador", "rolaccionfuncionalidad");
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
          reject(res.code);
        } else resolve(res.resource);
      })
      .fail((res) => {
        reject(`http_status_${res.status}`);
      });
  });
}

/**
 *
 * @param {{id_funcionalidad: number, id_accion: number, id_rol: number}} params
 * @returns
 */
function peticionBackAddRolAccionFuncionalidad({
  id_funcionalidad,
  id_accion,
  id_rol,
}) {
  const datos = new FormData();
  datos.append("id_funcionalidad", id_funcionalidad);
  datos.append("id_accion", id_accion);
  datos.append("id_rol", id_rol);
  datos.append("controlador", "rolaccionfuncionalidad");
  datos.append("action", "ADD");
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      url: URL_BACK,
      data: datos,
      processData: false,
      contentType: false,
    })
      .done((res) => {
        if (res.ok != true || res.code != "SQL_OK") {
          reject(res.code);
        } else resolve(res.resource);
      })
      .fail((res) => {
        reject(`http_status_${res.status}`);
      });
  });
}

/**
 *
 * @param {{id_funcionalidad: number, id_accion: number, id_rol: number}} params
 * @returns
 */
function peticionBackDeleteRolAccionFuncionalidad({
  id_funcionalidad,
  id_accion,
  id_rol,
}) {
  const datos = new FormData();
  datos.append("id_funcionalidad", id_funcionalidad);
  datos.append("id_accion", id_accion);
  datos.append("id_rol", id_rol);
  datos.append("controlador", "rolaccionfuncionalidad");
  datos.append("action", "DELETE");
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      url: URL_BACK,
      data: datos,
      processData: false,
      contentType: false,
    })
      .done((res) => {
        if (res.ok != true || res.code != "SQL_OK") {
          reject(res.code);
        } else resolve(res.resource);
      })
      .fail((res) => {
        reject(`http_status_${res.status}`);
      });
  });
}

/**
 * 
 * @returns {Promise<{
        id_funcionalidad: {
          id_funcionalidad: number,
          nombre_funcionalidad: string,
          descrip_funcionalidad: string
        },
        id_accion: {
          id_accion: number,
          nombre_accion: string,
          descrip_accion: string
        },
        id_rol: {
          id_rol: number,
          nombre_rol: string,
          descrip_rol: string
        }
      }[]>}
 */
function peticionBackSEARCHrolaccionfuncionalidad() {
  console.info("peticion back search rolaccionfuncionalidad");
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      url: URL_BACK,
      data: $("#id_form_search").serialize(),
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
