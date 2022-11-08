/**
 *
 * @param {{dni: string, nombre_persona: string, apellidos_persona: string, fechaNacimiento_persona: Date, direccion_persona: string, telefono_persona: number, email_persona: string, foto_persona: string}[]} datos
 */
async function actualizarTablaPersonas(datos) {
  const progress = document.createElement("progress");
  const tbody = document.getElementById("table_body");
  tbody.textContent = "";
  const trProgress = crearTR(progress);
  trProgress.querySelector("td").colSpan = document
    .querySelector("#table_head")
    .querySelectorAll("th").length;
  tbody.append(trProgress);

  try {
    datos ??= await peticionBackShowAllPersona();
  } catch (err) {
    mensajeError({
      codigo: err,
      idInput: "caja_campos_formulario",
    });
  }

  for (const i of datos) {
    const editBtn = crearBotonCRUD({
      accion: "edit",
      click: () => crearFormEditPersona(i),
    });

    const deleteBtn = crearBotonCRUD({
      accion: "delete",
      click: () => crearFormDeletePersona(i),
    });

    const detailBtn = crearBotonCRUD({
      accion: "detail",
      click: () => crearFormDetailPersona(i),
    });

    tbody.append(
      crearTR(
        i.dni,
        i.nombre_persona,
        i.apellidos_persona,
        i.fechaNacimiento_persona.toLocaleDateString("es-ES", {
          year: "numeric",
          day: "2-digit",
          month: "2-digit",
        }),
        i.direccion_persona,
        i.telefono_persona,
        i.email_persona,
        i.foto_persona,
        editBtn,
        deleteBtn,
        detailBtn
      )
    );
  }
  trProgress.remove();
}

function resetOnBlur() {
  $("#id_dni").blur(() => comprobar_dni());
  $("#nombre_persona").blur(comprobarNombrePersona);
  $("#apellidos_persona").blur(comprobarApellidosPersona);
  $("#direccion_persona").blur(comprobarDireccionPersona);
  $("#telefono_persona").blur(comprobarTelefonoPersona);
  $("#email_persona").blur(comprobarEmailPersona);
  $("#foto_persona").blur(comprobarFotoPersona);
  $("#fechaNacimiento_persona").blur(comprobarFechaNacimientoPersona);
}

//#region FORM ADD

function crearFormAddPersona() {
  //Reset formulario
  scrollFinTabla();
  resetForm("id_form_persona");
  resetOnBlur();
  document.getElementById("id_caja_error").style.display = "none";

  document.getElementById("id_caja_formulario_persona").style.display = "block";
  document.getElementById("id_form_persona").action = "javascript:addPersona()";

  const submitImg = document.getElementById("img_form_submit");
  submitImg.src = "images/add.svg";
  submitImg.onclick = () => document.getElementById("id_form_persona").submit();
  submitImg.onsubmit = () =>
    comprobar_dni() &&
    comprobarNombrePersona() &&
    comprobarApellidosPersona() &&
    comprobarDireccionPersona() &&
    comprobarTelefonoPersona() &&
    comprobarEmailPersona() &&
    comprobarFotoPersona() &&
    comprobarFechaNacimientoPersona();

  document.getElementById("form-accion").innerText = getTextoTitulo("add");
}

async function addPersona() {
  if (
    !comprobar_dni() ||
    !comprobarNombrePersona() ||
    !comprobarApellidosPersona() ||
    !comprobarDireccionPersona() ||
    !comprobarTelefonoPersona() ||
    !comprobarEmailPersona() ||
    !comprobarFotoPersona() ||
    !comprobarFechaNacimientoPersona()
  ) {
    console.error("campos erroneos");
    return;
  }
  try {
    await peticionBackAddPersona();
    resetForm("id_form_persona");
    await actualizarTablaPersonas();
  } catch (e) {
    mensajeError({
      codigo: e,
      idInput: "caja_campos_formulario",
    });
  }
}

//#endregion

//#region FORM EDIT

function crearFormEditPersona({
  dni,
  nombre_persona,
  apellidos_persona,
  direccion_persona,
  telefono_persona,
  email_persona,
  foto_persona,
  fechaNacimiento_persona,
}) {
  //Reset formulario
  scrollFinTabla();
  resetForm("id_form_persona");
  resetOnBlur();
  document.getElementById("id_caja_error").style.display = "none";

  document.getElementById("id_caja_formulario_persona").style.display = "block";
  document.getElementById("id_form_persona").action =
    "javascript:editPersona()";

  const submitImg = document.getElementById("img_form_submit");
  submitImg.src = "images/edit.svg";
  submitImg.onclick = () => document.getElementById("id_form_persona").submit();
  submitImg.onsubmit = () =>
    comprobar_dni() &&
    comprobarNombrePersona() &&
    comprobarApellidosPersona() &&
    comprobarDireccionPersona() &&
    comprobarTelefonoPersona() &&
    comprobarEmailPersona() &&
    comprobarFotoPersona() &&
    comprobarFechaNacimientoPersona();

  document.getElementById("form-accion").innerText = getTextoTitulo("edit");

  $("#id_dni").val(dni);
  $("#nombre_persona").val(nombre_persona);
  $("#apellidos_persona").val(apellidos_persona);
  $("#direccion_persona").val(direccion_persona);
  $("#telefono_persona").val(telefono_persona);
  $("#email_persona").val(email_persona);
  $("#foto_persona").val(foto_persona);
  document.getElementById("fechaNacimiento_persona").valueAsDate =
    fechaNacimiento_persona;

  $("#id_dni").attr("readonly", true);
  $("#fechaNacimiento_persona").attr("readonly", true);
}

async function editPersona() {
  if (
    !comprobarNombrePersona() ||
    !comprobarApellidosPersona() ||
    !comprobarDireccionPersona() ||
    !comprobarTelefonoPersona() ||
    !comprobarEmailPersona() ||
    !comprobarFotoPersona()
  ) {
    console.error("campos erroneos");
    return;
  }
  try {
    await peticionEditPersona();
    resetForm("id_form_persona");
    await actualizarTablaPersonas();
  } catch (e) {
    mensajeError({
      codigo: e,
      idInput: "caja_campos_formulario",
    });
  }
}

//#endregion

//#region FORM DELETE

function crearFormDeletePersona({
  dni,
  nombre_persona,
  apellidos_persona,
  direccion_persona,
  telefono_persona,
  email_persona,
  foto_persona,
  fechaNacimiento_persona,
}) {
  //Reset formulario
  scrollFinTabla();
  resetForm("id_form_persona");
  resetOnBlur();
  document.getElementById("id_caja_error").style.display = "none";

  document.getElementById("id_caja_formulario_persona").style.display = "block";
  document.getElementById("id_form_persona").action =
    "javascript:deletePersona()";

  const submitImg = document.getElementById("img_form_submit");
  submitImg.src = "images/delete.svg";
  submitImg.onclick = () => document.getElementById("id_form_persona").submit();
  submitImg.onsubmit = () => true;

  document.getElementById("form-accion").innerText = getTextoTitulo("delete");

  $("#id_dni").val(dni);
  $("#nombre_persona").val(nombre_persona);
  $("#apellidos_persona").val(apellidos_persona);
  $("#direccion_persona").val(direccion_persona);
  $("#telefono_persona").val(telefono_persona);
  $("#email_persona").val(email_persona);
  $("#foto_persona").val(foto_persona);
  document.getElementById("fechaNacimiento_persona").valueAsDate =
    fechaNacimiento_persona;

  $("#id_dni").attr("readonly", true);
  $("#nombre_persona").attr("readonly", true);
  $("#apellidos_persona").attr("readonly", true);
  $("#direccion_persona").attr("readonly", true);
  $("#telefono_persona").attr("readonly", true);
  $("#email_persona").attr("readonly", true);
  $("#foto_persona").attr("readonly", true);
  $("#fechaNacimiento_persona").attr("readonly", true);
}

async function deletePersona() {
  if (
    !comprobarNombrePersona() ||
    !comprobarApellidosPersona() ||
    !comprobarDireccionPersona() ||
    !comprobarTelefonoPersona() ||
    !comprobarEmailPersona() ||
    !comprobarFotoPersona()
  ) {
    console.error("campos erroneos");
    return;
  }
  try {
    await peticionBackDeletePersona();
    resetForm("id_form_persona");
    await actualizarTablaPersonas();
  } catch (e) {
    mensajeError({
      codigo: e,
      idInput: "caja_campos_formulario",
    });
  }
}

//#endregion

//#region FORM DETAIL

function crearFormDetailPersona({
  dni,
  nombre_persona,
  apellidos_persona,
  direccion_persona,
  telefono_persona,
  email_persona,
  foto_persona,
  fechaNacimiento_persona,
}) {
  //Reset formulario
  scrollFinTabla();
  resetForm("id_form_persona");
  resetOnBlur();
  document.getElementById("id_caja_error").style.display = "none";

  document.getElementById("id_caja_formulario_persona").style.display = "block";

  const submitImg = document.getElementById("img_form_submit");
  submitImg.src = "images/close.svg";
  submitImg.onclick = () => setDivInvisible("id_caja_formulario_persona");

  document.getElementById("form-accion").innerText = getTextoTitulo("detail");

  $("#id_dni").val(dni);
  $("#nombre_persona").val(nombre_persona);
  $("#apellidos_persona").val(apellidos_persona);
  $("#direccion_persona").val(direccion_persona);
  $("#telefono_persona").val(telefono_persona);
  $("#email_persona").val(email_persona);
  $("#foto_persona").val(foto_persona);
  document.getElementById("fechaNacimiento_persona").valueAsDate =
    fechaNacimiento_persona;

  $("#id_dni").attr("readonly", true);
  $("#nombre_persona").attr("readonly", true);
  $("#apellidos_persona").attr("readonly", true);
  $("#direccion_persona").attr("readonly", true);
  $("#telefono_persona").attr("readonly", true);
  $("#email_persona").attr("readonly", true);
  $("#foto_persona").attr("readonly", true);
  $("#fechaNacimiento_persona").attr("readonly", true);

  $("#id_dni").off("blur");
  $("#nombre_persona").off("blur");
  $("#apellidos_persona").off("blur");
  $("#direccion_persona").off("blur");
  $("#telefono_persona").off("blur");
  $("#email_persona").off("blur");
  $("#foto_persona").off("blur");
  $("#fechaNacimiento_persona").off("blur");
}

//#endregion

//#region FORM SEARCH
function crearFormSearchPersona() {
  //Reset formulario
  scrollFinTabla();
  resetForm("id_form_persona");
  resetOnBlur();
  document.getElementById("id_caja_error").style.display = "none";

  document.getElementById("id_caja_formulario_persona").style.display = "block";
  document.getElementById("id_form_persona").action =
    "javascript:searchPersona()";

  const submitImg = document.getElementById("img_form_submit");
  submitImg.src = "images/search.svg";
  submitImg.onclick = () => document.getElementById("id_form_persona").submit();
  submitImg.onsubmit = () =>
    comprobar_dni_search() &&
    comprobarNombrePersonaSearch() &&
    comprobarApellidosPersonaSearch() &&
    comprobarDireccionPersonaSearch() &&
    comprobarTelefonoPersonaSearch() &&
    comprobarEmailPersonaSearch() &&
    comprobarFotoPersonaSearch() &&
    comprobarFechaNacimientoPersonaSearch();

  document.getElementById("form-accion").innerText = getTextoTitulo("search");

  $("#id_dni").blur(comprobar_dni_search);
  $("#nombre_persona").blur(comprobarNombrePersonaSearch);
  $("#apellidos_persona").blur(comprobarApellidosPersonaSearch);
  $("#direccion_persona").blur(comprobarDireccionPersonaSearch);
  $("#telefono_persona").blur(comprobarTelefonoPersonaSearch);
  $("#email_persona").blur(comprobarEmailPersonaSearch);
  $("#foto_persona").blur(comprobarFotoPersonaSearch);
  $("#fechaNacimiento_persona").blur(comprobarFechaNacimientoPersonaSearch);
}

async function searchPersona() {
  if (
    !comprobar_dni_search() ||
    !comprobarNombrePersonaSearch() ||
    !comprobarApellidosPersonaSearch() ||
    !comprobarDireccionPersonaSearch() ||
    !comprobarTelefonoPersonaSearch() ||
    !comprobarEmailPersonaSearch() ||
    !comprobarFotoPersonaSearch() ||
    !comprobarFechaNacimientoPersonaSearch()
  ) {
    console.error("campos erroneos");
    return;
  }
  try {
    const entradas = await peticionBackSearchPersona();
    resetForm("id_form_persona");
    await actualizarTablaPersonas(entradas);
  } catch (e) {
    mensajeError({
      codigo: e,
      idInput: "caja_campos_formulario",
    });
  }
}

//#endregion
