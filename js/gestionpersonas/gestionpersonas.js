/**
 * @returns {Promise<{dni: string, nombre_persona: string, apellidos_persona: string, fechaNacimiento_persona: Date, direccion_persona: string, telefono_persona: number, email_persona: string, foto_persona: string}[]>}
 */
function peticionBackShowAllPersona() {
  const datos = new FormData();
  datos.append("controlador", "persona");
  datos.append("action", "SEARCH");
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      url: "http://193.147.87.202/Back/index.php",
      data: datos,
      processData: false,
      contentType: false,
    })
      .done((res) => {
        if (res.ok != true || res.code != "RECORDSET_DATOS") {
          reject(res);
        } else {
          const datos = res.resource;
          for (const i of datos) {
            i.fechaNacimiento_persona = new Date(i.fechaNacimiento_persona);
          }
          resolve(datos);
        }
      })
      .fail((res) => {
        reject(res);
      });
  });
}

/**
 *
 * @param {{dni: string, nombre_persona: string, apellidos_persona: string, fechaNacimiento_persona: Date, direccion_persona: string, telefono_persona: number, email_persona: string, foto_persona: string}[]} datos
 */
async function actualizarTablaPersonas(datos) {
  const progress = document.createElement("progress");
  const tbody = document.getElementById("table_body");
  tbody.textContent = "";
  const trProgress = crearTR(progress);
  trProgress.querySelector("td").colSpan = 11;
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
    const editBtn = document.createElement("img");
    editBtn.width = 50;
    editBtn.height = 50;
    editBtn.src = "images/edit.svg";
    editBtn.onclick = () => crearFormEditPersona(i);

    const deleteBtn = document.createElement("img");
    deleteBtn.width = 50;
    deleteBtn.height = 50;
    deleteBtn.src = "images/delete.svg";
    deleteBtn.onclick = () => {};

    const detailBtn = document.createElement("img");
    detailBtn.width = 50;
    detailBtn.height = 50;
    detailBtn.src = "images/detail.svg";
    detailBtn.onclick = () => {};

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

//#region FORM ADD

function crearFormAddPersona() {
  //Reset formulario
  resetForm("id_form_persona");

  document.getElementById("id_caja_formulario_persona").style.display = "block";

  const submitImg = document.getElementById("img_form_submit");
  submitImg.src = "images/add.svg";
  submitImg.onclick = addPersona;

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
  await peticionBackAddPersona();
  resetForm("id_form_persona");
  await actualizarTablaPersonas();
}

function peticionBackAddPersona() {
  console.info("peticion add persona back");
  eliminarCamposOcultos("id_form_persona");
  insertarCampoOculto("id_form_persona", "controlador", "persona");
  insertarCampoOculto("id_form_persona", "action", "ADD");
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      url: "http://193.147.87.202/Back/index.php",
      data: $("#id_form_persona").serialize(),
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

//#region FORM ADD

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
  resetForm("id_form_persona");

  document.getElementById("id_caja_formulario_persona").style.display = "block";

  const submitImg = document.getElementById("img_form_submit");
  submitImg.src = "images/edit.svg";
  submitImg.onclick = editPersona;

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
  await peticionEditPersona();
  resetForm("id_form_persona");
  await actualizarTablaPersonas();
}

function peticionEditPersona() {
  console.info("peticion edit persona back");
  eliminarCamposOcultos("id_form_persona");
  insertarCampoOculto("id_form_persona", "controlador", "persona");
  insertarCampoOculto("id_form_persona", "action", "EDIT");
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      url: "http://193.147.87.202/Back/index.php",
      data: $("#id_form_persona").serialize(),
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
