/**
 *
 * @param {{id_funcionalidad: number, nombre_funcionalidad: string, descrip_funcionalidad: string} []} datos
 * @returns
 */
async function actualizarTablaFuncionalidades(datos) {
  const tbody = document.getElementById("table_body");
  tbody.textContent = "";
  const trLoading = crearTR(document.createElement("progress"));
  trLoading.querySelector("td").colSpan = document
    .querySelector("#table_head")
    .querySelectorAll("th").length;
  tbody.append(trLoading);
  datos ??= await getFuncionalidades();
  if (datos === undefined) return;

  for (const i of datos) {
    tbody.append(
      crearTR(
        i.id_funcionalidad,
        i.nombre_funcionalidad,
        i.descrip_funcionalidad,
        crearBotonCRUD({
          accion: "edit",
          click: () => crearFormEditFuncionalidad(i),
        }),
        crearBotonCRUD({
          accion: "delete",
          click: () => crearFormDeleteFuncionalidad(i),
        }),
        crearBotonCRUD({
          accion: "detail",
          click: () => crearFormDetailFuncionalidad(i),
        })
      )
    );
  }
  trLoading.remove();
}

function resetOnBlurFuncionalidades() {
  $("#id_funcionalidad").attr("readonly", true);
  $("#nombre_funcionalidad").blur(comprobarNombreFuncionalidad);
  $("#descrip_funcionalidad").blur(comprobarDescripFuncionalidad);
  document.getElementById("caja_id_funcionalidad").style.display = "block";
}

//#region FORM ADD

function crearFormAddFuncionalidad() {
  limpiarErrores("id_form_funcionalidad");
  resetForm("id_form_funcionalidad");
  resetOnBlurFuncionalidades();

  document.getElementById("form-modal").showModal();
  document.getElementById("caja_id_funcionalidad").style.display = "none";

  const submitImg = document.getElementById("img_form_submit");
  submitImg.src = "images/add.svg";
  submitImg.onclick = addFuncionalidad;

  document.getElementById("titulo-form").innerText = getTextoTitulo("add");
  document.getElementById("form-funcionalidad").className =
    "txt txt-titulo_add";
}

async function addFuncionalidad() {
  if (
    /*!comprobarIdFuncionalidad() ||*/ !comprobarNombreFuncionalidad() ||
    !comprobarDescripFuncionalidad()
  ) {
    return;
  }
  try {
    await peticionBackAddFuncionalidad();
    await actualizarTablaFuncionalidades();
    await crearRAFAdminFuncionalidad({
      nombre_funcionalidad: document.getElementById("nombre_funcionalidad")
        .value,
      descrip_funcionalidad: document.getElementById("descrip_funcionalidad")
        .value,
    });
    resetForm("id_form_funcionalidad");
    mensajeOKmodal({ codigoMensaje: "exito_anadido" });
    document.getElementById("form-modal").close();
  } catch (e) {
    mensajeErrorModal({
      codigo: e,
      idInput: "caja_campos_formulario",
    });
  }
}

function peticionBackAddFuncionalidad() {
  console.info("peticion add funcionalidad back");
  eliminarCamposOcultos("id_form_funcionalidad");
  insertarCampoOculto("id_form_funcionalidad", "controlador", "funcionalidad");
  insertarCampoOculto("id_form_funcionalidad", "action", "ADD");
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      url: URL_BACK,
      data: $("#id_form_funcionalidad").serialize(),
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

function crearFormEditFuncionalidad({
  id_funcionalidad,
  nombre_funcionalidad,
  descrip_funcionalidad,
}) {
  //Reset formulario
  limpiarErrores("id_form_funcionalidad");
  resetForm("id_form_funcionalidad");
  resetOnBlurFuncionalidades();

  document.getElementById("form-modal").showModal();

  const submitImg = document.getElementById("img_form_submit");
  submitImg.src = "images/edit.svg";
  submitImg.onclick = editFuncionalidad;

  document.getElementById("titulo-form").innerText = getTextoTitulo("edit");

  $("#id_funcionalidad").val(id_funcionalidad);
  $("#nombre_funcionalidad").val(nombre_funcionalidad);
  $("#descrip_funcionalidad").val(descrip_funcionalidad);
}

async function editFuncionalidad() {
  if (!comprobarNombreFuncionalidad() || !comprobarDescripFuncionalidad()) {
    return;
  }
  try {
    await peticionEditFuncionalidad();
    resetForm("id_form_funcionalidad");
    await actualizarTablaFuncionalidades();
    mensajeOKmodal({ codigoMensaje: "exito_editado" });
    document.getElementById("form-modal").close();
  } catch (err) {
    mensajeErrorModal({
      codigo: err,
      idInput: "caja_campos_formulario",
    });
  }
}

function peticionEditFuncionalidad() {
  console.info("peticion edit funcionalidad back");
  eliminarCamposOcultos("id_form_funcionalidad");
  insertarCampoOculto("id_form_funcionalidad", "controlador", "funcionalidad");
  insertarCampoOculto("id_form_funcionalidad", "action", "EDIT");
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      url: URL_BACK,
      data: $("#id_form_funcionalidad").serialize(),
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

function crearFormDeleteFuncionalidad({
  id_funcionalidad,
  nombre_funcionalidad,
  descrip_funcionalidad,
}) {
  //Reset formulario
  limpiarErrores("id_form_funcionalidad");
  resetForm("id_form_funcionalidad");
  resetOnBlurFuncionalidades();

  document.getElementById("form-modal").showModal();

  const submitImg = document.getElementById("img_form_submit");
  submitImg.src = "images/delete.svg";
  submitImg.onclick = deleteFuncionalidad;

  document.getElementById("titulo-form").innerText = getTextoTitulo("delete");

  $("#id_funcionalidad").val(id_funcionalidad);
  $("#nombre_funcionalidad").val(nombre_funcionalidad);
  $("#descrip_funcionalidad").val(descrip_funcionalidad);

  $("#nombre_funcionalidad").attr("readonly", true);
  $("#descrip_funcionalidad").attr("readonly", true);

  $("#nombre_funcionalidad").off("blur");
  $("#descrip_funcionalidad").off("blur");
}

async function deleteFuncionalidad() {
  if (!comprobarNombreFuncionalidad() || !comprobarDescripFuncionalidad()) {
    console.error("campos erroneos");
    return;
  }
  try {
    await peticionBackDeleteFuncionalidad();
    await actualizarTablaFuncionalidades();
    mensajeOKmodal({ codigoMensaje: "exito_eliminacion" });
    document.getElementById("form-modal").close();
  } catch (e) {
    mensajeErrorModal({
      codigo: e,
      idInput: "caja_campos_formulario",
    });
  }
}

function peticionBackDeleteFuncionalidad() {
  console.info("peticion add funcionalidad back");
  eliminarCamposOcultos("id_form_funcionalidad");
  insertarCampoOculto("id_form_funcionalidad", "controlador", "funcionalidad");
  insertarCampoOculto("id_form_funcionalidad", "action", "DELETE");
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      url: URL_BACK,
      data: $("#id_form_funcionalidad").serialize(),
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

function crearFormDetailFuncionalidad({
  id_funcionalidad,
  nombre_funcionalidad,
  descrip_funcionalidad,
}) {
  //Reset formulario
  limpiarErrores("id_form_funcionalidad");
  resetForm("id_form_funcionalidad");
  resetOnBlurFuncionalidades();

  document.getElementById("form-modal").showModal();

  const submitImg = document.getElementById("img_form_submit");
  submitImg.style.display = "none";
  submitImg.src = "images/close.svg";
  submitImg.onclick = () => setDivInvisible("id_caja_formulario_funcionalidad");

  document.getElementById("titulo-form").innerText = getTextoTitulo("detail");

  $("#id_funcionalidad").val(id_funcionalidad);
  $("#nombre_funcionalidad").val(nombre_funcionalidad);
  $("#descrip_funcionalidad").val(descrip_funcionalidad);

  $("#nombre_funcionalidad").attr("readonly", true);
  $("#descrip_funcionalidad").attr("readonly", true);

  $("#nombre_funcionalidad").off("blur");
  $("#descrip_funcionalidad").off("blur");
}

//#endregion

//#region FORM SEARCH
function crearFormSearchFuncionalidad() {
  //Reset formulario
  limpiarErrores("id_form_funcionalidad");
  resetForm("id_form_funcionalidad");
  resetOnBlurFuncionalidades();

  document.getElementById("form-modal").showModal();

  const submitImg = document.getElementById("img_form_submit");
  submitImg.src = "images/search.svg";
  submitImg.onclick = searchFuncionalidad;

  document.getElementById("titulo-form").innerText = getTextoTitulo("search");

  $("#id_funcionalidad").blur(comprobarIdFuncionalidadSearch);
  $("#nombre_funcionalidad").blur(comprobarNombreFuncionalidadSearch);
  $("#descrip_funcionalidad").blur(comprobarDescripFuncionalidadSearch);
  $("#id_funcionalidad").attr("readonly", false);
}

async function searchFuncionalidad() {
  if (
    !comprobarIdFuncionalidadSearch() ||
    !comprobarNombreFuncionalidadSearch() ||
    !comprobarDescripFuncionalidadSearch()
  ) {
    console.error("campos erroneos");
    return;
  }
  try {
    const entradas = await peticionBackSearchFuncionalidad();
    resetForm("id_form_funcionalidad");
    await actualizarTablaFuncionalidades(entradas);
    document.getElementById("form-modal").close();
  } catch (e) {
    mensajeErrorModal({
      codigo: e,
      idInput: "caja_campos_formulario",
    });
  }
}

function peticionBackSearchFuncionalidad() {
  console.info("peticion search funcionalidad back");
  eliminarCamposOcultos("id_form_funcionalidad");
  insertarCampoOculto("id_form_funcionalidad", "controlador", "funcionalidad");
  insertarCampoOculto("id_form_funcionalidad", "action", "SEARCH");
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      url: URL_BACK,
      data: $("#id_form_funcionalidad").serialize(),
    })
      .done((res) => {
        if (res.ok != true || res.code != "RECORDSET_DATOS") {
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
