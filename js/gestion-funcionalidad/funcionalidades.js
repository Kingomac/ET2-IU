/**
 * Hace petición AJAX a back y gestiona mensajes de error
 * @returns {Promise<{id_funcionalidad: number, nombre_funcionalidad: string, descrip_funcionalidad: string} []>}
 */
async function getFuncionalidades() {
  try {
    const peticion = await peticionFuncionalidadesBack();
    if (peticion.code != "RECORDSET_DATOS") {
      mensajeError({
        codigo: peticion.code,
        idInput: "caja_campos_formulario",
      });
      return undefined;
    }
    return peticion.resource;
  } catch (err) {
    mensajeError({ codigo: `get_funcionalidades_${err.code}` });
    return undefined;
  }
}

/**
 * Hace petición a back de las funcionalidades
 * @returns
 */
function peticionFuncionalidadesBack() {
  const datosPeticion = new FormData();
  datosPeticion.append("action", "SEARCH");
  datosPeticion.append("controlador", "funcionalidad");
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      url: URL_BACK,
      data: datosPeticion,
      processData: false,
      contentType: false,
    })
      .done((res) => {
        if (res.ok != true || res.code != "RECORDSET_DATOS") {
          reject(res);
        } else resolve(res);
      })
      .fail((res) => {
        mensajeError({
          codigo: `http_status_${res.status}`,
          idInput: "caja_campos_formulario",
        });
      });
  });
}
