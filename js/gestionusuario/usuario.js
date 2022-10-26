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

// add_usuario()
// funcion a ser ejecutada cuando se completa el formulario al pulsar sobre la imagen
// llama a la funcion de petición pq no es necesario comprobación de formularios.
// en esta funcion de petición se provoca el submit para que se ejecute la accion
async function add_usuario() {
  console.info("add_usuario");
  if (comprobar_form_usuario_add()) {
    try {
      await peticionADDusuarioBack();
      $("#id_form_usuario").reset();
      await actualizarTablaUsuarios();
    } catch (err) {
      mensajeError({
        codigo: err,
        idInput: "caja_campos_formulario",
      });
    }
  }
}

// edit_usuario()
// funcion a ser ejecutada cuando se completa el formulario al pulsar sobre la imagen
// llama a la funcion de petición pq no es necesario comprobación de formularios.
// en esta funcion de petición se provoca el submit para que se ejecute la accion
async function edit_usuario() {
  if (comprobar_form_usuario_add()) {
    try {
      await peticionEDITusuarioBack();
      await actualizarTablaUsuarios();
    } catch (err) {
      mensajeError({
        codigo: err,
        idInput: "caja_campos_formulario",
      });
    }
  }
}

// delete_usuario()
// funcion a ser ejecutada cuando se completa el formulario al pulsar sobre la imagen
// llama a la funcion de petición pq no es necesario comprobación de formularios.
// en esta funcion de petición se provoca el submit para que se ejecute la accion
async function delete_usuario() {
  try {
    await peticionDELETEusuarioBack();
    await actualizarTablaUsuarios();
  } catch (err) {
    mensajeError({
      codigo: err,
      idInput: "caja_campos_formulario",
    });
  }
}

// search_usuario()
// funcion a ser ejecutada cuando se completa el formulario
// comprueba los formatos de atributo del formulario y devuelve true para que se invoque el action
async function search_usuario() {
  if (comprobar_form_usuario_search()) {
    try {
      const peticion = await peticionSEARCHusuarioBack();
      await actualizarTablaUsuarios(peticion.resources);
    } catch (err) {
      mensajeError({
        codigo: err,
        idInput: "caja_campos_formulario",
      });
    }
  }
}

// resetearformusuario()
// esta función se usa para inicializar el formulario y siempre este de la misma manera antes de entrar en las funciones que construyen los formularios de acciones
// aqui solo eliminamos el select. Podriamos tambien hacer un remove() en vez de desasignarlo
function resetearformusuario() {
  // eliminar el select
  selectviejorol = document.getElementById("id_id_rol");
  if (!(selectviejorol === null)) {
    document.getElementById("caja_select_rol").removeChild(selectviejorol);
  }

  // quitar el readonly de los atributos
  $("#id_dni").attr("readonly", false);
  $("#id_usuario").attr("readonly", false);
  $("#id_id_rol").attr("readonly", false);

  // eliminar el boton de submit de formulario
  $("#id_boton_buscar_usuario").remove();

  // eliminar la imagen para terminar el formulario
  $("#id_imagen_enviar_form").remove();

  // se pone visible el formulario
  $("#id_caja_formulario_usuario").attr("style", "display: none");
}

// crearformADDusuario() creado con javascript
// Este formulario se crea usando la estructura básica del formulario html en gestionusuario.html
// Se crea una input image para actuar como un input submit y que el formulario
// llame a la funcion add_usuario al pulsarla y esta llama a peticionADDusuarioBack que provoca el submit del formulario
// y se ejecuta el action

async function crearformADDusuario() {
  // resetear el formulario
  scrollFinTabla();
  resetearformusuario();

  document.getElementById("form-accion").innerText = getTextoTitulo("add");
  document.getElementById("form-accion").className = "txt txt-titulo_add";

  // se coloca el onblur del dni y se pone a vacio el valor (o podriamos hacerlo en el resetearformusuario())
  document.getElementById("id_dni").onblur = comprobar_dni;
  document.getElementById("id_dni").value = "";

  // se coloca el onblur del usuario y se pone a vacio el valor (o podriamos hacerlo en el resetearformusuario())
  document.getElementById("id_usuario").onblur = comprobar_usuario;
  document.getElementById("id_usuario").value = "";

  // se crea un array con los roles como si viniera del back
  const rolSelect = await crearSelectRoles({ vacio: true });
  document.getElementById("caja_select_rol").appendChild(rolSelect);

  // se coloca una imagen para la accion de editar
  const imagenenviarform = document.createElement("img");
  imagenenviarform.src = "./images/add.svg";
  imagenenviarform.id = "id_imagen_enviar_form";
  imagenenviarform.width = "50";
  imagenenviarform.height = "50";
  imagenenviarform.onclick = add_usuario;
  $("#caja_campos_formulario").append(imagenenviarform);

  // se muestra el formulario
  document.getElementById("id_caja_formulario_usuario").style.display = "block";
}

// crearformEDITusuario() creado con jquery
// Este formulario se crea usando la estructura básica del formulario html en gestionusuario.html
// Se crea una input image para actuar como un input submit y que el formulario
// llame a la funcion edit_usuario al pulsarla y esta llama a peticionEDITusuarioBack que provoca el submit del formulario
// y se ejecuta el action

async function crearformEDITusuario(dni, usuario, rol) {
  document.getElementById("form-accion").innerText = getTextoTitulo("edit");
  document.getElementById("form-accion").className = "txt txt-titulo_edit";

  // resetear al formulario
  scrollFinTabla();
  resetearformusuario();

  // se crea el action del formulario
  $("#id_form_usuario").attr("action", "http://193.147.87.202/procesaform.php");

  // se pone no editable el dni al ser clave primaria y no querer que se modifique por el usuario
  // se pone la funcion de comprobación aunque no sea necesaria y se pone el valor por defecto que se proporciona como parametro
  $("#id_dni").attr("readonly", true);
  $("#id_dni").blur(comprobar_dni);
  $("#id_dni").val(dni);

  // se pone la función de validación de usuario y se pone el valor por defecto proporcionado como parametro
  $("#id_usuario").on("blur", comprobar_usuario);
  $("#id_usuario").val(usuario);

  // se crea un array de roles como vendría del back
  const rolSelect = await crearSelectRoles({ itemseleccionado: rol });

  // se añade el select a su div contenedor
  $("#caja_select_rol").append(rolSelect);

  // se coloca una imagen para la accion de editar
  imagenenviarform = document.createElement("img");
  imagenenviarform.src = "./images/edit.svg";
  imagenenviarform.id = "id_imagen_enviar_form";
  imagenenviarform.width = "80";
  imagenenviarform.height = "80";
  imagenenviarform.onclick = add_usuario;
  $("#caja_campos_formulario").append(imagenenviarform);

  // se muestra el formulario
  $("#id_caja_formulario_usuario").attr("style", "display: block");
}

// crearformDELETEusuario() creado con jquery
// Este formulario se crea usando la estructura básica del formulario html en gestionusuario.html
// Se crea una input image para actuar como un input submit y que el formulario
// llame a la funcion delete_usuario al pulsarla y esta llama a peticionDELETEusuarioBack que provoca el submit del formulario
// y se ejecuta el action

async function crearformDELETEusuario(dni, usuario, rol) {
  document.getElementById("form-accion").innerText = getTextoTitulo("delete");
  document.getElementById("form-accion").className = "txt txt-titulo_delete";

  scrollFinTabla();
  resetearformusuario();

  $("#id_dni").attr("readonly", "true");
  $("#id_dni").val(dni);

  $("#id_usuario").attr("readonly", "true");
  $("#id_usuario").val(usuario);

  const rolSelect = await crearSelectRoles({
    itemseleccionado: rol,
    readonly: true,
  });
  $("#caja_select_rol").append(rolSelect);
  $("#id_id_rol").attr("readonly", "true");
  hacerSelectReadonly("id_id_rol", rol);

  // se coloca una imagen para la accion de editar
  imagenenviarform = document.createElement("img");
  imagenenviarform.src = "./images/delete.svg";
  imagenenviarform.id = "id_imagen_enviar_form";
  imagenenviarform.width = "50";
  imagenenviarform.height = "50";
  imagenenviarform.onclick = delete_usuario;
  $("#caja_campos_formulario").append(imagenenviarform);

  $("#id_caja_formulario_usuario").attr("style", "display: block");
}

// crearformSEARCHusuario() creado con jquery (except el option que utiliza javascript)
// Este formulario se crea usando la estructura básica del formulario html en gestionusuario.html
// Se crea un input image para actuar como un input submit y que el formulario haga el submit al pulsarlo
// Cuando esto pasa se llama a la funcion search_usuario en el onsubmit y se hace la comprobación de atributos
// cuando esta función devuelve true se ejecuta el action

async function crearformSEARCHusuario() {
  document.getElementById("form-accion").innerText = getTextoTitulo("search");
  document.getElementById("form-accion").className = "txt txt-titulo_search";

  // reseteo el formulario
  scrollFinTabla();
  resetearformusuario();

  $("#id_form_usuario")[0].reset();

  // pongo el campo de dni editable y le asocio la funcion para el onblur
  $("#id_dni").attr("readonly", false);
  $("#id_dni").blur(comprobar_dni_search);

  // pongo el campo de usuario editable y le asocio la funcion para el onblur
  $("#id_usuario").attr("readonly", false);
  $("#id_usuario").blur(comprobar_usuario_search);

  const rolSelect = await crearSelectRoles({ vacio: true });

  // se añade el select a la caja de select
  $("#caja_select_rol").append(rolSelect);

  //creo un input de tipo image que el formulario va utilizar como si fuese un tipo input submit
  const botonsubmit = document.createElement("img");
  botonsubmit.id = "id_boton_buscar_usuario";
  botonsubmit.title = "Buscar";
  botonsubmit.alt = "Buscar";
  botonsubmit.src = "./images/search.svg";
  botonsubmit.width = "50";
  botonsubmit.height = "50";
  botonsubmit.onclick = search_usuario;

  // coloco la imagen para submit en el formulario
  $("#caja_campos_formulario").append(botonsubmit);

  // se pone visible el formulario
  $("#id_caja_formulario_usuario").attr("style", "display: block");
}

async function crearformSHOWCURRENTusuario(dni, usuario, rol) {
  document.getElementById("form-accion").innerText = getTextoTitulo("detail");
  document.getElementById("form-accion").className = "txt txt-titulo_detail";

  // reseteo el formulario
  scrollFinTabla();
  resetearformusuario();

  $("#id_dni").val(dni);
  $("#id_dni").attr("readonly", true);

  $("#id_usuario").val(usuario);
  $("#id_usuario").attr("readonly", true);

  const rolSelect = await crearSelectRoles({
    itemseleccionado: rol,
    readonly: true,
  });

  // se añade el select a la caja de select
  $("#caja_select_rol").append(rolSelect);

  hacerSelectReadonly("id_id_rol", rol);

  $("#id_id_rol").val(rol);

  const botonCerrar = document.createElement("img");
  botonCerrar.id = "id_imagen_enviar_form";
  botonCerrar.src = "images/close.svg";
  botonCerrar.width = 50;
  botonCerrar.onclick = ponerinvisibleformusuario;

  $("#caja_campos_formulario").append(botonCerrar);

  $("#id_caja_formulario_usuario").attr("style", "display: block");
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

/**
 * Actualiza la tabla de usuarios con datos enviados como parámetro o se piden al back con ajax
 * @param {{dni: string, contrasena: string, id_rol: number|{id_rol: number, nombre_rol: string, descrip_rol: string}, usuario: string}} datos
 */
async function actualizarTablaUsuarios(datos) {
  const tbody = document.getElementById("table_body");
  tbody.textContent = "";
  const loadingBar = document.createElement("progress");
  const trLoadingBar = crearTR(loadingBar);
  trLoadingBar.querySelector("td").colSpan = "6";
  tbody.append(trLoadingBar);

  try {
    datos ??= await peticionBackSHOWALLusuario();
  } catch (err) {
    idInput({ codigo: err, idInput: "caja_campos_formulario" });
  }
  const roles = await getRoles();
  console.log("datos", datos);
  for (const i of datos) {
    console.log("i:", i);
    const btnEdit = document.createElement("img");
    const btnDelete = document.createElement("img");
    const btnDetail = document.createElement("img");

    btnEdit.src = "images/edit.svg";
    btnDelete.src = "images/delete.svg";
    btnDetail.src = "images/detail.svg";

    btnEdit.onclick = () =>
      crearformEDITusuario(i.dni, i.usuario, i.id_rol.id_rol);
    btnDelete.onclick = () =>
      crearformDELETEusuario(i.dni, i.usuario, i.id_rol.id_rol);
    btnDetail.onclick = () =>
      crearformSHOWCURRENTusuario(i.dni, i.usuario, i.id_rol.id_rol);

    const idRol = i.id_rol.id_rol || i.id_rol;
    let irol = 0;
    while (irol < roles.length && roles[irol].id_rol != idRol) {
      irol++;
    }

    if (irol == roles.length) {
      irol = i.id_rol;
    }

    tbody.append(
      crearTR(
        i.dni,
        i.usuario,
        getTextosRoles(roles[irol].nombre_rol) || roles[irol].nombre_rol,
        btnEdit,
        btnDelete,
        btnDetail
      )
    );
  }
  trLoadingBar.remove();
}
