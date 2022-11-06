/**
 * 
 * @param {{
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
      }[] | undefined} datos 
 */
async function actualizarTabla(datos) {
  // Reset del tbody
  const tbody = document.getElementById("table_body");
  tbody.textContent = "";
  // Reset del thead
  for (const i of document.getElementById("table_title").children) {
    if (!i.classList.contains("txt")) i.remove();
  }
  if (datos == null) {
    try {
      datos = await peticionBackSHOWALLrolaccionfuncionalidad();
    } catch (err) {
      mensajeError({
        idInput: "id_caja_error",
        codigo: err,
      });
      return;
    }
  }
  const roles = await getRoles();
  const trTitulo = document.getElementById("table_title");
  for (const i of roles) {
    const th = document.createElement("th");
    th.append(i.nombre_rol);
    trTitulo.append(th);
  }
  for (let i = 0; i < datos.length; i++) {
    let tr = crearTR(
      datos[i].id_funcionalidad.nombre_funcionalidad,
      datos[i].id_accion.nombre_accion
    );
    const estado = {
      id_funcionalidad: datos[i].id_funcionalidad.id_funcionalidad,
      id_accion: datos[i].id_accion.id_accion,
    };
    for (let j = 0; j < roles.length; j++) {
      // Como los datos del back están ordenados por Rol se puede recorrer según los roles hasta que
      // deja de haber datos de la misma funcionalidad
      try {
        if (
          i < datos.length &&
          estado.id_funcionalidad ==
            datos[i].id_funcionalidad.id_funcionalidad &&
          estado.id_accion == datos[i].id_accion.id_accion
        ) {
          const [btnTick, btnDelete] = crearBtnAddDelete({
            tienePermiso: true,
            id_accion: datos[i].id_accion.id_accion,
            id_funcionalidad: datos[i].id_funcionalidad.id_funcionalidad,
            id_rol: datos[i].id_rol.id_rol,
          });
          tr.append(crearTd(btnTick, btnDelete));
          i++;
        } else {
          const [btnTick, btnDelete] = crearBtnAddDelete({
            tienePermiso: false,
            id_accion: estado.id_accion,
            id_funcionalidad: estado.id_funcionalidad,
            id_rol: roles[j].id_rol,
          });
          tr.append(crearTd(btnTick, btnDelete));
        }
      } catch (err) {
        console.error(err);
        console.log("i:", i, "datos:", datos[i]);
      }
    }
    i--;
    tbody.append(tr);
  }
}

/**
 *
 * @param  {...Node|string} contenido
 * @returns
 */
function crearTd(...contenido) {
  const td = document.createElement("td");
  td.append(...contenido);
  return td;
}

/**
 *
 * @param {{ tienePermiso: boolean, id_funcionalidad: number, id_accion:number , id_rol:number}} tienePermiso
 * @returns
 */
function crearBtnAddDelete({
  tienePermiso,
  id_funcionalidad,
  id_accion,
  id_rol,
}) {
  const btnTick = document.createElement("img");
  btnTick.src = "./images/tick.svg";
  btnTick.className = "txt txt-titulo_permiso_add";
  btnTick.title = getTextoTitulo("permiso_add");
  btnTick.width = "35";
  btnTick.height = "35";

  const btnDelete = document.createElement("img");
  btnDelete.src = "./images/close.svg";
  btnDelete.className = "txt txt-titulo_permiso_delete";
  btnDelete.title = getTextoTitulo("permiso_delete");
  btnDelete.width = "35";
  btnDelete.height = "35";

  if (tienePermiso) {
    btnTick.style.filter = "grayscale(100%)";
    btnDelete.onclick = () => deleteRolAccionFuncionalidad();
  } else {
    btnDelete.style.filter = "grayscale(100%)";
    btnTick.onclick = () =>
      addRolAccionFuncionalidad({ id_accion, id_funcionalidad, id_rol });
  }

  return [btnTick, btnDelete];
}

function deleteRolAccionFuncionalidad() {}

async function addRolAccionFuncionalidad({
  id_funcionalidad,
  id_accion,
  id_rol,
}) {
  try {
    const peticion = await peticionBackAddRolAccionFuncionalidad({
      id_accion,
      id_funcionalidad,
      id_rol,
    });
    console.log("peticion exitosa:", peticion);
  } catch (err) {
    mensajeError({ idInput: "id_caja_error", codigo: err });
  }
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
          reject(res);
        } else resolve(res.resource);
      })
      .fail((res) => {
        reject(res);
      });
  });
}
