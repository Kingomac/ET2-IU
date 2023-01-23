// add_usuario()
// funcion a ser ejecutada cuando se completa el formulario al pulsar sobre la imagen
// llama a la funcion de petición pq no es necesario comprobación de formularios.
// en esta funcion de petición se provoca el submit para que se ejecute la accion
async function add_usuario() {
  console.info("add_usuario");
  if (comprobar_form_usuario_add()) {
    try {
      await peticionADDusuarioBack();
      await actualizarTablaUsuarios();
      document.getElementById("form-modal").close();
    } catch (err) {
      mensajeErrorModal({
        codigo: err,
        idInput: "id_form_usuario",
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
      mensajeOKmodal({ codigoMensaje: "exito_editado" });
      document.getElementById("form-modal").close();
    } catch (err) {
      mensajeErrorModal({
        codigo: err,
        idInput: "id_form_usuario",
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
    document.getElementById("form-modal").close();
    await actualizarTablaUsuarios();
  } catch (err) {
    mensajeErrorModal({
      codigo: err,
      idInput: "id_form_usuario",
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
      document.getElementById("form-modal").close();
    } catch (err) {
      mensajeErrorModal({
        codigo: err,
        idInput: "id_form_usuario",
      });
    }
  }
}

// resetearformusuario()
// esta función se usa para inicializar el formulario y siempre este de la misma manera antes de entrar en las funciones que construyen los formularios de acciones
// aqui solo eliminamos el select. Podriamos tambien hacer un remove() en vez de desasignarlo
function resetearformusuario() {
  document
    .getElementById("id_form_usuario")
    .querySelectorAll(".err-div")
    .forEach((e) => (e.textContent = ""));
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
}

// crearformADDusuario() creado con javascript
// Este formulario se crea usando la estructura básica del formulario html en gestionusuario.html
// Se crea una input image para actuar como un input submit y que el formulario
// llame a la funcion add_usuario al pulsarla y esta llama a peticionADDusuarioBack que provoca el submit del formulario
// y se ejecuta el action

async function crearformADDusuario() {
  // resetear el formulario

  resetearformusuario();
  document.getElementById("form-modal").showModal();

  document.getElementById("titulo-form").innerText = getTextoTitulo("add");
  document.getElementById("titulo-form").className = "txt txt-titulo_add";

  // se coloca el onblur del dni y se pone a vacio el valor (o podriamos hacerlo en el resetearformusuario())
  document.getElementById("id_dni").onblur = () => comprobar_dni();
  document.getElementById("id_dni").value = "";

  // se coloca el onblur del usuario y se pone a vacio el valor (o podriamos hacerlo en el resetearformusuario())
  document.getElementById("id_usuario").onblur = () => comprobar_usuario();
  document.getElementById("id_usuario").value = "";

  // se crea un array con los roles como si viniera del back
  const rolSelect = await crearSelectRoles({ vacio: true });
  document.getElementById("caja_select_rol").appendChild(rolSelect);

  document.getElementById("id_form_usuario").action =
    "javascript:add_usuario()";

  $("#id_form_usuario").append(
    crearBotonCRUD({
      accion: "add",
      click: () => document.getElementById("id_form_usuario").submit(),
      onsubmit: () => comprobar_form_usuario_add(),
      id: "id_imagen_enviar_form",
      clase: "boton-fondo-blanco",
    })
  );
}

// crearformEDITusuario() creado con jquery
// Este formulario se crea usando la estructura básica del formulario html en gestionusuario.html
// Se crea una input image para actuar como un input submit y que el formulario
// llame a la funcion edit_usuario al pulsarla y esta llama a peticionEDITusuarioBack que provoca el submit del formulario
// y se ejecuta el action

async function crearformEDITusuario(dni, usuario, rol) {
  document.getElementById("titulo-form").innerText = getTextoTitulo("edit");
  document.getElementById("titulo-form").className = "txt txt-titulo_edit";

  // resetear al formulario

  resetearformusuario();

  document.getElementById("form-modal").showModal();

  // se crea el action del formulario
  $("#id_form_usuario").attr("action", "http://193.147.87.202/procesaform.php");

  // se pone no editable el dni al ser clave primaria y no querer que se modifique por el usuario
  // se pone la funcion de comprobación aunque no sea necesaria y se pone el valor por defecto que se proporciona como parametro
  $("#id_dni").attr("readonly", true);
  $("#id_dni").blur(() => comprobar_dni());
  $("#id_dni").val(dni);

  // se pone la función de validación de usuario y se pone el valor por defecto proporcionado como parametro
  $("#id_usuario").on("blur", () => comprobar_usuario);
  $("#id_usuario").val(usuario);

  // se crea un array de roles como vendría del back
  const rolSelect = await crearSelectRoles({ itemseleccionado: rol });

  // se añade el select a su div contenedor
  $("#caja_select_rol").append(rolSelect);

  document.getElementById("id_form_usuario").action =
    "javascript:edit_usuario()";

  $("#id_form_usuario").append(
    crearBotonCRUD({
      id: "id_imagen_enviar_form",
      accion: "edit",
      click: () => document.getElementById("id_form_usuario").submit(),
      onsubmit: () => comprobar_form_usuario_add(),
      clase: "boton-fondo-blanco",
    })
  );

  // se muestra el formulario
}

// crearformDELETEusuario() creado con jquery
// Este formulario se crea usando la estructura básica del formulario html en gestionusuario.html
// Se crea una input image para actuar como un input submit y que el formulario
// llame a la funcion delete_usuario al pulsarla y esta llama a peticionDELETEusuarioBack que provoca el submit del formulario
// y se ejecuta el action

async function crearformDELETEusuario(dni, usuario, rol) {
  document.getElementById("titulo-form").innerText = getTextoTitulo("delete");
  document.getElementById("titulo-form").className = "txt txt-titulo_delete";

  resetearformusuario();

  document.getElementById("form-modal").showModal();

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

  $("#id_form_usuario").append(
    crearBotonCRUD({
      id: "id_imagen_enviar_form",
      accion: "delete",
      click: () => document.getElementById("id_form_usuario").submit(),
      clase: "boton-fondo-blanco",
    })
  );
}

// crearformSEARCHusuario() creado con jquery (except el option que utiliza javascript)
// Este formulario se crea usando la estructura básica del formulario html en gestionusuario.html
// Se crea un input image para actuar como un input submit y que el formulario haga el submit al pulsarlo
// Cuando esto pasa se llama a la funcion search_usuario en el onsubmit y se hace la comprobación de atributos
// cuando esta función devuelve true se ejecuta el action

async function crearformSEARCHusuario() {
  document.getElementById("titulo-form").innerText = getTextoTitulo("search");
  document.getElementById("titulo-form").className = "txt txt-titulo_search";

  // reseteo el formulario

  resetearformusuario();

  document.getElementById("form-modal").showModal();

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
  $("#id_form_usuario").append(
    crearBotonCRUD({
      id: "id_imagen_enviar_form",
      accion: "search",
      click: () => document.getElementById("id_form_usuario").submit(),
      onsubmit: () => comprobar_form_usuario_search(),
      clase: "boton-fondo-blanco",
    })
  );

  // se pone visible el formulario
}

async function crearformSHOWCURRENTusuario(dni, usuario, rol) {
  document.getElementById("titulo-form").innerText = getTextoTitulo("detail");
  document.getElementById("titulo-form").className = "txt txt-titulo_detail";

  // reseteo el formulario

  resetearformusuario();

  document.getElementById("form-modal").showModal();

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
}

/**
 * Actualiza la tabla de usuarios con datos enviados como parámetro o se piden al back con ajax
 * @param {{dni: string, contrasena: string, id_rol: number|{id_rol: number, nombre_rol: string, descrip_rol: string}, usuario: string}[]} datos
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
    mensajeErrorModal({ codigo: err, idInput: "id_form_usuario" });
  }
  for (const i of datos) {
    tbody.append(
      crearTR(
        i.dni,
        i.usuario,
        i.id_rol.nombre_rol || errorRolDesconocido(i.id_rol),
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

function errorRolDesconocido(id) {
  mensajeErrorModal({ codigo: "rol_desconocido", mensaje: id });
  const i = document.createElement("span");
  i.innerText = id;
  i.style.color = "red";
  return i;
}
