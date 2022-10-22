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
    editBtn.onclick = () => {};

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

function crearFormAddPersona() {
  //Reset formulario
  const form = document.getElementById("id_form_persona");
  form.reset();

  document.getElementById("id_caja_formulario_persona").style.display = "block";

  const submitImg = document.getElementById("img_form_submit");
  submitImg.src = "images/add.svg";
  submitImg.onclick = addPersona;

  document.getElementById("form-accion").innerText = getTextoTitulo("add");
}

function addPersona() {}

function peticionBackAddPersona() {
  console.info("peticion add persona back");
  eliminarCamposOcultos("id_form_usuario");
  insertarCampoOculto("id_form_usuario", "controlador", "usuario");
  insertarCampoOculto("id_form_usuario", "action", "ADD");
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
