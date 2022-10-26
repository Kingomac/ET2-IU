/**
 *
 * @param {{id_rol: number, nombre_rol: string, descrip_rol: string} []} datos
 * @returns
 */
async function actualizarTablaRoles(datos) {
  const tbody = document.getElementById("table_body");
  tbody.textContent = "";
  const trLoading = crearTR(document.createElement("progress"));
  trLoading.querySelector("td").colSpan = document
    .querySelector("#table_head")
    .querySelectorAll("th").length;
  tbody.append(trLoading);
  datos ??= await getRoles();
  if (datos === undefined) return;

  for (const i of datos) {
    tbody.append(
      crearTR(
        i.id_rol,
        i.nombre_rol,
        i.descrip_rol,
        crearBotonCRUD({
          accion: "edit",
          click: () => crearFormEditRol(i),
        }),
        crearBotonCRUD({
          accion: "delete",
          click: () => crearFormDeleteRol(i),
        }),
        crearBotonCRUD({
          accion: "detail",
          click: () => crearFormDetailRol(i),
        })
      )
    );
  }
  trLoading.remove();
}

function resetOnBlurRoles() {
  $("#id_rol").attr("readonly", true);
  $("#nombre_rol").blur(comprobarNombreRol);
  $("#descrip_rol").blur(comprobarDescripRol);
  document.getElementById("caja_id_rol").style.display = "block";
}

//#region FORM ADD

function crearFormAddRol() {
  resetForm("id_form_rol");
  scrollFinTabla();
  resetOnBlurRoles();

  document.getElementById("id_caja_formulario_rol").style.display = "block";
  document.getElementById("caja_id_rol").style.display = "none";

  const submitImg = document.getElementById("img_form_submit");
  submitImg.src = "images/add.svg";
  submitImg.onclick = addRol;

  $("#form-accion").text(getTextoTitulo("add"));
  document.getElementById("form-accion").className = "txt txt-titulo_add";
}

async function addRol() {
  if (
    /*!comprobarIdRol() ||*/ !comprobarNombreRol() ||
    !comprobarDescripRol()
  ) {
    return;
  }
  try {
    await peticionBackAddRol();
    resetForm("id_form_rol");
    await actualizarTablaRoles();
  } catch (e) {
    mensajeError({
      codigo: e,
      idInput: "caja_campos_formulario",
    });
  }
}

function peticionBackAddRol() {
  console.info("peticion add rol back");
  eliminarCamposOcultos("id_form_rol");
  insertarCampoOculto("id_form_rol", "controlador", "rol");
  insertarCampoOculto("id_form_rol", "action", "ADD");
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      url: URL_BACK,
      data: $("#id_form_rol").serialize(),
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

//#endregion

//#region FORM EDIT

function crearFormEditRol({ id_rol, nombre_rol, descrip_rol }) {
  //Reset formulario
  resetForm("id_form_rol");
  scrollFinTabla();
  resetOnBlurRoles();

  document.getElementById("id_caja_formulario_rol").style.display = "block";

  const submitImg = document.getElementById("img_form_submit");
  submitImg.src = "images/edit.svg";
  submitImg.onclick = editRol;

  document.getElementById("form-accion").innerText = getTextoTitulo("edit");

  $("#id_rol").val(id_rol);
  $("#nombre_rol").val(nombre_rol);
  $("#descrip_rol").val(descrip_rol);
}

async function editRol() {
  if (!comprobarNombreRol() || !comprobarDescripRol()) {
    return;
  }
  try {
    await peticionEditRol();
    resetForm("id_form_rol");
    await actualizarTablaRoles();
  } catch (e) {
    mensajeError({
      codigo: e,
      idInput: "caja_campos_formulario",
    });
  }
}

function peticionEditRol() {
  console.info("peticion edit rol back");
  eliminarCamposOcultos("id_form_rol");
  insertarCampoOculto("id_form_rol", "controlador", "rol");
  insertarCampoOculto("id_form_rol", "action", "EDIT");
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      url: URL_BACK,
      data: $("#id_form_rol").serialize(),
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

//#endregion

//#region FORM DELETE

function crearFormDeleteRol({ id_rol, nombre_rol, descrip_rol }) {
  //Reset formulario
  resetForm("id_form_rol");
  scrollFinTabla();
  resetOnBlurRoles();

  document.getElementById("id_caja_formulario_rol").style.display = "block";

  const submitImg = document.getElementById("img_form_submit");
  submitImg.src = "images/delete.svg";
  submitImg.onclick = deleteRol;

  document.getElementById("form-accion").innerText = getTextoTitulo("delete");

  $("#id_rol").val(id_rol);
  $("#nombre_rol").val(nombre_rol);
  $("#descrip_rol").val(descrip_rol);

  $("#nombre_rol").attr("readonly", true);
  $("#descrip_rol").attr("readonly", true);

  $("#nombre_rol").off("blur");
  $("#descrip_rol").off("blur");
}

async function deleteRol() {
  if (!comprobarNombreRol() || !comprobarDescripRol()) {
    console.error("campos erroneos");
    return;
  }
  try {
    await peticionBackDeleteRol();
    resetForm("id_form_rol");
    await actualizarTablaRoles();
  } catch (e) {
    mensajeError({
      codigo: e,
      idInput: "caja_campos_formulario",
    });
  }
}

function peticionBackDeleteRol() {
  console.info("peticion add rol back");
  eliminarCamposOcultos("id_form_rol");
  insertarCampoOculto("id_form_rol", "controlador", "rol");
  insertarCampoOculto("id_form_rol", "action", "DELETE");
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      url: URL_BACK,
      data: $("#id_form_rol").serialize(),
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

//#endregion

//#region FORM DETAIL

function crearFormDetailRol({ id_rol, nombre_rol, descrip_rol }) {
  //Reset formulario
  resetForm("id_form_rol");
  scrollFinTabla();
  resetOnBlurRoles();

  document.getElementById("id_caja_formulario_rol").style.display = "block";

  const submitImg = document.getElementById("img_form_submit");
  submitImg.src = "images/close.svg";
  submitImg.onclick = () => setDivInvisible("id_caja_formulario_rol");

  document.getElementById("form-accion").innerText = getTextoTitulo("detail");

  $("#id_rol").val(id_rol);
  $("#nombre_rol").val(nombre_rol);
  $("#descrip_rol").val(descrip_rol);

  $("#nombre_rol").attr("readonly", true);
  $("#descrip_rol").attr("readonly", true);

  $("#nombre_rol").off("blur");
  $("#descrip_rol").off("blur");
}

//#endregion

//#region FORM SEARCH
function crearFormSearchRol() {
  //Reset formulario
  resetForm("id_form_rol");
  scrollFinTabla();
  resetOnBlurRoles();

  document.getElementById("id_caja_formulario_rol").style.display = "block";

  const submitImg = document.getElementById("img_form_submit");
  submitImg.src = "images/search.svg";
  submitImg.onclick = searchRol;

  document.getElementById("form-accion").innerText = getTextoTitulo("search");

  $("#id_rol").blur(comprobarIdRolSearch);
  $("#nombre_rol").blur(comprobarNombreRolSearch);
  $("#descrip_rol").blur(comprobarDescripRolSearch);
  $("#id_rol").attr("readonly", false);
}

async function searchRol() {
  if (
    !comprobarIdRolSearch() ||
    !comprobarNombreRolSearch() ||
    !comprobarDescripRolSearch()
  ) {
    console.error("campos erroneos");
    return;
  }
  try {
    const entradas = await peticionBackSearchRol();
    resetForm("id_form_rol");
    await actualizarTablaRoles(entradas);
  } catch (e) {
    mensajeError({
      codigo: e,
      idInput: "caja_campos_formulario",
    });
  }
}

function peticionBackSearchRol() {
  console.info("peticion search rol back");
  eliminarCamposOcultos("id_form_rol");
  insertarCampoOculto("id_form_rol", "controlador", "rol");
  insertarCampoOculto("id_form_rol", "action", "SEARCH");
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      url: URL_BACK,
      data: $("#id_form_rol").serialize(),
    })
      .done((res) => {
        if (res.ok != true || res.code != "SQL_OK") {
          reject(res.code);
        } else {
          resolve(res.resource);
        }
      })
      .fail(function (jqXHR) {
        reject(`http_status_${jqXHR.status}`);
      });
  });
}

//#endregion
