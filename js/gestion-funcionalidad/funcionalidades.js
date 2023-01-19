/**
 * Hace petición AJAX a back y gestiona mensajes de error
 * @returns {Promise<{id_funcionalidad: number, nombre_funcionalidad: string, descrip_funcionalidad: string} []>}
 */
async function getFuncionalidades() {
  try {
    const peticion = await peticionFuncionalidadesBack();
    if (peticion.code != "RECORDSET_DATOS") {
      mensajeErrorModal({
        codigo: peticion.code,
        idInput: "caja_campos_formulario",
      });
      return undefined;
    }
    return peticion.resource;
  } catch (err) {
    mensajeErrorModal({ codigo: `get_funcionalidades_${err.code}` });
    return undefined;
  }
}

/**
 * Hace petición a back de las funcionalidades
 * @returns {Promise<{id_funcionalidad: number, nombre_funcionalidad: string, descrip_funcionalidad: string}[]>}
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
        mensajeErrorModal({
          codigo: `http_status_${res.status}`,
          idInput: "caja_campos_formulario",
        });
      });
  });
}

async function crearRAFAdminFuncionalidad({
  nombre_funcionalidad,
  descrip_funcionalidad,
}) {
  const funcionalidades = await getFuncionalidades();
  let id;
  for (const i of funcionalidades) {
    if (
      i.nombre_funcionalidad == nombre_funcionalidad &&
      i.descrip_funcionalidad == descrip_funcionalidad
    ) {
      id = i.id_funcionalidad;
      break;
    }
  }
  console.log(nombre_funcionalidad, descrip_funcionalidad, id);
  if (id == null) throw new Error("funcionalidad_no_creada");
  const acciones = await getAcciones();
  for (const i of acciones) {
    await peticionBackAddRolAccionFuncionalidad({
      id_funcionalidad: id,
      id_accion: i.id_accion,
      id_rol: 0,
    });
  }
}
