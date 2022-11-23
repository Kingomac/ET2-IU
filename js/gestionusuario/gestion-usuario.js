// add_usuario()
// funcion a ser ejecutada cuando se completa el formulario al pulsar sobre la imagen
// llama a la funcion de petición pq no es necesario comprobación de formularios.
// en esta funcion de petición se provoca el submit para que se ejecute la accion
async function add_usuario() {
  console.info("add_usuario");
  if (comprobar_form_usuario_add()) {
    try {
      await peticionADDusuarioBack();
      await crearformADDusuario();
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
      await crearformEDITusuario();
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
    document.getElementById("id_caja_formulario_usuario").style.display =
      "none";
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
      await actualizarTablaUsuarios(peticion.resource);
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

  resetForm("id_form_usuario");
  // // quitar el readonly de los atributos
  // $("#id_dni").attr("readonly", false);
  // $("#id_usuario").attr("readonly", false);
  // $("#id_id_rol").attr("readonly", false);

  // eliminar el boton de submit de formulario
  $("#id_imagen_enviar_form").remove();

  // // eliminar la imagen para terminar el formulario
  // $("#id_imagen_enviar_form").remove();

  // // se pone visible el formulario
  // $("#id_caja_formulario_usuario").attr("style", "display: none");
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
  document.getElementById("id_caja_error").style.display = "none";

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

  document.getElementById("id_form_usuario").action =
    "javascript:add_usuario()";

  $("#caja_campos_formulario").append(
    crearBotonCRUD({
      accion: "add",
      click: () => document.getElementById("id_form_usuario").submit(),
      onsubmit: () => comprobar_form_usuario_add(),
    })
  );

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
  document.getElementById("id_caja_error").style.display = "none";

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

  document.getElementById("id_form_usuario").action =
    "javascript:edit_usuario()";

  $("#caja_campos_formulario").append(
    crearBotonCRUD({
      id: "id_imagen_enviar_form",
      accion: "edit",
      click: () => document.getElementById("id_form_usuario").submit(),
      onsubmit: () => comprobar_form_usuario_add(),
    })
  );

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
  document.getElementById("id_caja_error").style.display = "none";

  $("#id_dni").off("blur");
  $("#id_usuario").off("blur");

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

  document.getElementById("id_form_usuario").action =
    "javascript:delete_usuario()";

  $("#caja_campos_formulario").append(
    crearBotonCRUD({
      id: "id_imagen_enviar_form",
      accion: "delete",
      click: () => document.getElementById("id_form_usuario").submit(),
    })
  );

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
  document.getElementById("id_caja_error").style.display = "none";

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

  document.getElementById("id_form_usuario").action =
    "javascript:search_usuario()";

  // coloco la imagen para submit en el formulario
  $("#caja_campos_formulario").append(
    crearBotonCRUD({
      id: "id_imagen_enviar_form",
      accion: "search",
      click: () => document.getElementById("id_form_usuario").submit(),
      onsubmit: () => comprobar_form_usuario_search(),
    })
  );

  // se pone visible el formulario
  $("#id_caja_formulario_usuario").attr("style", "display: block");
}

async function crearformSHOWCURRENTusuario(dni, usuario, rol) {
  document.getElementById("form-accion").innerText = getTextoTitulo("detail");
  document.getElementById("form-accion").className = "txt txt-titulo_detail";

  // reseteo el formulario
  scrollFinTabla();
  resetearformusuario();
  document.getElementById("id_caja_error").style.display = "none";

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

  $("#id_id_rol").val(rol);

  $("#caja_campos_formulario").append(
    crearBotonCRUD({
      id: "id_imagen_enviar_form",
      accion: "close",
      click: () => ponerinvisibleformusuario(),
    })
  );

  $("#id_caja_formulario_usuario").attr("style", "display: block");
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
    mensajeError({ codigo: err, idInput: "caja_campos_formulario" });
  }
  const roles = await getRoles();
  for (const i of datos) {
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
        crearBotonCRUD({
          accion: "edit",
          click: () => crearformEDITusuario(i.dni, i.usuario, i.id_rol.id_rol),
        }),
        crearBotonCRUD({
          accion: "delete",
          click: () =>
            crearformDELETEusuario(i.dni, i.usuario, i.id_rol.id_rol),
        }),
        crearBotonCRUD({
          accion: "detail",
          click: () =>
            crearformSHOWCURRENTusuario(i.dni, i.usuario, i.id_rol.id_rol),
        })
      )
    );
  }
  trLoadingBar.remove();
}
