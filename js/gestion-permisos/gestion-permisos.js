const ID_ROL_ADMIN = 0;

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
async function actualizarTablaPermisos(datos) {
  document.getElementById("loading_bar").style.display = "block";
  document.getElementById("tabla_showall").style.display = "none";
  document.getElementById("id_form_search").style.display = "none";
  // Reset del tbody
  const tbody = document.getElementById("table_body");
  tbody.textContent = "";
  // Reset del thead
  const trTitulo = document.getElementById("table_title");
  while (trTitulo.children.length > 2) {
    if (!trTitulo.children[2].classList.contains("txt"))
      trTitulo.children[2].remove();
  }
  if (datos == null) {
    try {
      datos = await peticionBackSHOWALLrolaccionfuncionalidad();
      actualizarSelectSearch(datos);
    } catch (err) {
      mensajeError({
        idInput: "id_caja_error",
        codigo: err,
      });
      return;
    }
  }

  const roles = await getRoles();
  for (const i of roles) {
    const th = document.createElement("th");
    th.append(i.nombre_rol);
    trTitulo.append(th);
  }

  let i = 0;
  while (i < datos.length) {
    // bucle recorrer datos (se recorre esto porque no sabes el número de filas, ya que no se hace fetch de pares funcionalidad-accion)
    const tr = crearTR(
      // se crea una fila
      datos[i].id_funcionalidad.nombre_funcionalidad,
      datos[i].id_accion.nombre_accion
    );
    for (let j = 0; j < roles.length; j++) {
      // se iteran los roles para añadir cada uno a la fila
      if (i < datos.length && roles[j].id_rol == datos[i].id_rol.id_rol) {
        // si el dato seleccionado tiene el rol de la columna a crear
        // se añaden botones con funcionalidad de quitar el permiso
        // y se pasa al siguiente dato
        tr.append(
          crearTd(
            ...crearBtnAddDelete({
              tienePermiso: true,
              id_accion: datos[i].id_accion.id_accion,
              id_funcionalidad: datos[i].id_funcionalidad.id_funcionalidad,
              id_rol: roles[j].id_rol,
            })
          )
        );
        i++; // i al final del bucle se queda en el primer dato de la siguiente fila, porque solo se incrementa
        // cuando hay un rol de esa fila que tiene el rol
      } else {
        // si lo anterior no se cumple, significa que el rol no tiene permiso en ese funcionalidad-accion
        // y se crean los botones que permiten darle el permiso
        tr.append(
          crearTd(
            ...crearBtnAddDelete({
              tienePermiso: false,
              id_accion: datos[i - 1].id_accion.id_accion,
              id_funcionalidad: datos[i - 1].id_funcionalidad.id_funcionalidad,
              id_rol: roles[j].id_rol,
            })
          )
        );
      }
    }
    tbody.append(tr);
  }
  document.getElementById("loading_bar").style.display = "none";
  document.getElementById("tabla_showall").style.display = "";
  document.getElementById("id_form_search").style.display = "";
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
  const divGrid = document.createElement("div");
  divGrid.classList.add("caja-botones-permisos");

  const btnTick = document.createElement("img");
  btnTick.className = "txt txt-titulo_permiso_add";
  btnTick.title = getTextoTitulo("permiso_add");
  btnTick.width = "35";
  btnTick.height = "35";

  const btnDelete = document.createElement("img");
  btnDelete.className = "txt txt-titulo_permiso_delete";
  btnDelete.title = getTextoTitulo("permiso_delete");
  btnDelete.width = "35";
  btnDelete.height = "35";

  if (tienePermiso) {
    btnTick.src = "./images/tick-disabled.svg";
    btnDelete.src = "./images/close.svg";
    btnDelete.onclick = () =>
      deleteRolAccionFuncionalidad({ id_accion, id_funcionalidad, id_rol });
  } else {
    btnTick.src = "./images/tick.svg";
    btnDelete.src = "./images/close-disabled.svg";
    btnTick.onclick = () =>
      addRolAccionFuncionalidad({ id_accion, id_funcionalidad, id_rol });
  }

  divGrid.append(btnTick, btnDelete);

  return [divGrid];
}

async function deleteRolAccionFuncionalidad({
  id_funcionalidad,
  id_accion,
  id_rol,
}) {
  try {
    await peticionBackDeleteRolAccionFuncionalidad({
      id_accion,
      id_funcionalidad,
      id_rol,
    });
    const datos = await peticionBackSEARCHrolaccionfuncionalidad();
    await actualizarTablaPermisos(datos);
  } catch (err) {
    mensajeError({ idInput: "id_caja_error", codigo: err });
  }
}

async function addRolAccionFuncionalidad({
  id_funcionalidad,
  id_accion,
  id_rol,
}) {
  try {
    await peticionBackAddRolAccionFuncionalidad({
      id_accion,
      id_funcionalidad,
      id_rol,
    });
    const datos = await peticionBackSEARCHrolaccionfuncionalidad();
    await actualizarTablaPermisos(datos);
  } catch (err) {
    mensajeError({ idInput: "id_caja_error", codigo: err });
  }
}

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
function actualizarSelectSearch(datos) {
  const select = document.getElementById("select_funcionalidad");
  const blanco = document.createElement("option");
  select.append(blanco);
  for (let i = 0; i < datos.length; ) {
    const option = document.createElement("option");
    option.value = datos[i].id_funcionalidad.id_funcionalidad;
    option.innerText = datos[i].id_funcionalidad.nombre_funcionalidad;
    select.append(option);
    const id_funcionalidad = datos[i].id_funcionalidad.id_funcionalidad;
    while (
      i < datos.length &&
      id_funcionalidad == datos[i].id_funcionalidad.id_funcionalidad
    )
      i++;
  }
}

async function searchFuncionalidad() {
  try {
    document.getElementById("loading_bar").style.display = "block";
    document.getElementById("tabla_showall").style.display = "none";
    document.getElementById("id_form_search").style.display = "none";
    const datos = await peticionBackSEARCHrolaccionfuncionalidad();
    actualizarTablaPermisos(datos);
  } catch (err) {
    mensajeError({
      idInput: "id_caja_error",
      codigo: err,
    });
  }
}
