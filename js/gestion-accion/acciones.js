/**
 * Hace petición AJAX a back y gestiona mensajes de error
 * @returns {Promise<{id_accion: number, nombre_accion: string, descrip_accion: string} []>}
 */
async function getAcciones() {
  try {
    const peticion = await peticionAccionesBack();
    if (peticion.code != "RECORDSET_DATOS") {
      mensajeErrorModal({
        codigo: peticion.code,
        idInput: "caja_campos_formulario",
      });
      return undefined;
    }
    return peticion.resource;
  } catch (err) {
    mensajeErrorModal({ codigo: `get_acciones_${err.code}` });
    return undefined;
  }
}

/**
 * Hace petición a back de las acciones
 * @returns
 */
function peticionAccionesBack() {
  const datosPeticion = new FormData();
  datosPeticion.append("action", "SEARCH");
  datosPeticion.append("controlador", "accion");
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
        mensajeErrorModal({
          codigo: `http_status_${res.status}`,
          idInput: "caja_campos_formulario",
        });
      });
  });
}

async function crearAccionesAdmin({ nombre_accion, descrip_accion }) {
  const acciones = await getAcciones();
  let id;
  for (const i of acciones) {
    if (
      i.nombre_accion == nombre_accion &&
      i.descrip_accion == descrip_accion
    ) {
      id = i.id_accion;
    }
  }
  if (id == null) throw new Error("permisos_para_accion_no_creados");
  const funcionalidades = await getFuncionalidades();
  for (const i of funcionalidades) {
    await peticionBackAddRolAccionFuncionalidad({
      id_accion: id,
      id_funcionalidad: i.id_funcionalidad,
      id_rol: 0,
    });
  }
}
