/**
 * Crea un select con todos los roles
 * @param {{vacio: boolean, itemseleccionado?: number, readonly: boolean = false}} x
 * @returns {Promise<HTMLSelectElement>}
 */
async function crearSelectRoles({
  vacio = false,
  itemseleccionado,
  readonly = false,
}) {
  const datos = await getRoles();
  if (datos === undefined) return;
  if (vacio) datos.unshift({ id_rol: -1, nombre_rol: "", descrip_rol: "" });
  const select = document.createElement("select");
  select.name = "id_rol";
  select.id = "id_id_rol";

  for (const rol of datos) {
    const option = document.createElement("option");
    option.value = rol.id_rol;
    option.text = getTextosRoles(rol.nombre_rol) || rol.nombre_rol;
    option.className = `txt txt-rol_${rol.nombre_rol}`;

    if (readonly && option.value != itemseleccionado) {
      option.disabled = true;
    }

    if (option.value == itemseleccionado) {
      option.selected = true;
    }
    select.append(option);
  }

  return select;
}

/**
 * Hace petición AJAX a back y gestiona mensajes de error
 * @returns {Promise<{id_rol: number, nombre_rol: string, descrip_rol: string} []>}
 */
async function getRoles() {
  try {
    const peticion = await peticionRolesBack();
    if (peticion.code != "RECORDSET_DATOS") {
      mensajeError({
        codigo: peticion.code,
        idInput: "caja_campos_formulario",
      });
      return undefined;
    }
    return peticion.resource;
  } catch (err) {
    mensajeError({ codigo: `get_roles_${err.code}` });
    return undefined;
  }
}

/**
 * Hace petición a back de los roles
 * @returns
 */
function peticionRolesBack() {
  const datosPeticion = new FormData();
  datosPeticion.append("action", "SEARCH");
  datosPeticion.append("controlador", "rol");
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

/**
 * Desactiva los options excepto el seleccionado en un select para
 * tener un readonly
 * @param {string} idselect
 * @param {number} rol
 */
function hacerSelectReadonly(idselect, rol) {
  for (const i of document.getElementById(idselect).children) {
    if (i.value != rol) {
      i.setAttribute("disabled", true);
    }
  }
}
