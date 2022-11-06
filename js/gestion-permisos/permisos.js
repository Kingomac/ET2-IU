/**
 * 
 * @returns {Promise<{
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
      }[]>}
 */
function peticionBackSHOWALLrolaccionfuncionalidad() {
  const datos = new FormData();
  datos.append("controlador", "rolaccionfuncionalidad");
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
