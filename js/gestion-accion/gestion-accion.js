/**
 *
 * @param {{id_accion: number, nombre_accion: string, descrip_accion: string} []} datos
 * @returns
 */
async function actualizarTablaAcciones(datos) {
  const tbody = document.getElementById("table_body");
  tbody.textContent = "";
  const trLoading = crearTR(document.createElement("progress"));
  trLoading.querySelector("td").colSpan = document
    .querySelector("#table_head")
    .querySelectorAll("th").length;
  tbody.append(trLoading);
  datos ??= await getAcciones();
  if (datos === undefined) return;

  for (const i of datos) {
    tbody.append(
      crearTR(
        i.id_accion,
        i.nombre_accion,
        i.descrip_accion,
        crearBotonCRUD({
          accion: "edit",
          click: () => crearFormEditAccion(i),
        }),
        crearBotonCRUD({
          accion: "delete",
          click: () => crearFormDeleteAccion(i),
        }),
        crearBotonCRUD({
          accion: "detail",
          click: () => crearFormDetailAccion(i),
        })
      )
    );
  }
  trLoading.remove();
}

function resetOnBlurAcciones() {
  $("#id_accion").attr("readonly", true);
  $("#nombre_accion").blur(comprobarNombreAccion);
  $("#descrip_accion").blur(comprobarDescripAccion);
  document.getElementById("caja_id_accion").style.display = "block";
}

//#region FORM ADD

function crearFormAddAccion() {
  scrollFinTabla();
  resetForm("id_form_accion");
  resetOnBlurAcciones();

  document.getElementById("id_caja_formulario_accion").style.display = "block";
  document.getElementById("caja_id_accion").style.display = "none";

  const submitImg = document.getElementById("img_form_submit");
  submitImg.src = "images/add.svg";
  submitImg.onclick = addAccion;

  $("#form-accion").text(getTextoTitulo("add"));
  document.getElementById("form-accion").className = "txt txt-titulo_add";
}

async function addAccion() {
  if (
    /*!comprobarIdAccion() ||*/ !comprobarNombreAccion() ||
    !comprobarDescripAccion()
  ) {
    return;
  }
  try {
    await peticionBackAddAccion();
    resetForm("id_form_accion");
    await actualizarTablaAcciones();
  } catch (e) {
    mensajeError({
      codigo: e,
      idInput: "caja_campos_formulario",
    });
  }
}

function peticionBackAddAccion() {
  console.info("peticion add accion back");
  eliminarCamposOcultos("id_form_accion");
  insertarCampoOculto("id_form_accion", "controlador", "accion");
  insertarCampoOculto("id_form_accion", "action", "ADD");
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      url: URL_BACK,
      data: $("#id_form_accion").serialize(),
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

function crearFormEditAccion({ id_accion, nombre_accion, descrip_accion }) {
  //Reset formulario
  scrollFinTabla();
  resetForm("id_form_accion");
  resetOnBlurAcciones();

  document.getElementById("id_caja_formulario_accion").style.display = "block";

  const submitImg = document.getElementById("img_form_submit");
  submitImg.src = "images/edit.svg";
  submitImg.onclick = editAccion;

  document.getElementById("form-accion").innerText = getTextoTitulo("edit");

  $("#id_accion").val(id_accion);
  $("#nombre_accion").val(nombre_accion);
  $("#descrip_accion").val(descrip_accion);
}

async function editAccion() {
  if (!comprobarNombreAccion() || !comprobarDescripAccion()) {
    return;
  }
  try {
    await peticionEditAccion();
    resetForm("id_form_accion");
    await actualizarTablaAcciones();
  } catch (e) {
    mensajeError({
      codigo: e,
      idInput: "caja_campos_formulario",
    });
  }
}

function peticionEditAccion() {
  console.info("peticion edit accion back");
  eliminarCamposOcultos("id_form_accion");
  insertarCampoOculto("id_form_accion", "controlador", "accion");
  insertarCampoOculto("id_form_accion", "action", "EDIT");
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      url: URL_BACK,
      data: $("#id_form_accion").serialize(),
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

function crearFormDeleteAccion({ id_accion, nombre_accion, descrip_accion }) {
  //Reset formulario
  scrollFinTabla();
  resetForm("id_form_accion");
  resetOnBlurAcciones();

  document.getElementById("id_caja_formulario_accion").style.display = "block";

  const submitImg = document.getElementById("img_form_submit");
  submitImg.src = "images/delete.svg";
  submitImg.onclick = deleteAccion;

  document.getElementById("form-accion").innerText = getTextoTitulo("delete");

  $("#id_accion").val(id_accion);
  $("#nombre_accion").val(nombre_accion);
  $("#descrip_accion").val(descrip_accion);

  $("#nombre_accion").attr("readonly", true);
  $("#descrip_accion").attr("readonly", true);

  $("#nombre_accion").off("blur");
  $("#descrip_accion").off("blur");
}

async function deleteAccion() {
  if (!comprobarNombreAccion() || !comprobarDescripAccion()) {
    console.error("campos erroneos");
    return;
  }
  try {
    await peticionBackDeleteAccion();
    resetForm("id_form_accion");
    await actualizarTablaAcciones();
  } catch (e) {
    mensajeError({
      codigo: e,
      idInput: "caja_campos_formulario",
    });
  }
}

function peticionBackDeleteAccion() {
  console.info("peticion add accion back");
  eliminarCamposOcultos("id_form_accion");
  insertarCampoOculto("id_form_accion", "controlador", "accion");
  insertarCampoOculto("id_form_accion", "action", "DELETE");
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      url: URL_BACK,
      data: $("#id_form_accion").serialize(),
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

function crearFormDetailAccion({ id_accion, nombre_accion, descrip_accion }) {
  //Reset formulario
  scrollFinTabla();
  resetForm("id_form_accion");
  resetOnBlurAcciones();

  document.getElementById("id_caja_formulario_accion").style.display = "block";

  const submitImg = document.getElementById("img_form_submit");
  submitImg.src = "images/close.svg";
  submitImg.onclick = () => setDivInvisible("id_caja_formulario_accion");

  document.getElementById("form-accion").innerText = getTextoTitulo("detail");

  $("#id_accion").val(id_accion);
  $("#nombre_accion").val(nombre_accion);
  $("#descrip_accion").val(descrip_accion);

  $("#nombre_accion").attr("readonly", true);
  $("#descrip_accion").attr("readonly", true);

  $("#nombre_accion").off("blur");
  $("#descrip_accion").off("blur");
}

//#endregion

//#region FORM SEARCH
function crearFormSearchAccion() {
  //Reset formulario
  scrollFinTabla();
  resetForm("id_form_accion");
  resetOnBlurAcciones();

  document.getElementById("id_caja_formulario_accion").style.display = "block";

  const submitImg = document.getElementById("img_form_submit");
  submitImg.src = "images/search.svg";
  submitImg.onclick = searchAccion;

  document.getElementById("form-accion").innerText = getTextoTitulo("search");

  $("#id_accion").blur(comprobarIdAccionSearch);
  $("#nombre_accion").blur(comprobarNombreAccionSearch);
  $("#descrip_accion").blur(comprobarDescripAccionSearch);
  $("#id_accion").attr("readonly", false);
}

async function searchAccion() {
  if (
    !comprobarIdAccionSearch() ||
    !comprobarNombreAccionSearch() ||
    !comprobarDescripAccionSearch()
  ) {
    console.error("campos erroneos");
    return;
  }
  try {
    const entradas = await peticionBackSearchAccion();
    resetForm("id_form_accion");
    await actualizarTablaAcciones(entradas);
  } catch (e) {
    mensajeError({
      codigo: e,
      idInput: "caja_campos_formulario",
    });
  }
}

function peticionBackSearchAccion() {
  console.info("peticion search accion back");
  eliminarCamposOcultos("id_form_accion");
  insertarCampoOculto("id_form_accion", "controlador", "accion");
  insertarCampoOculto("id_form_accion", "action", "SEARCH");
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      url: URL_BACK,
      data: $("#id_form_accion").serialize(),
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
