const ES = Object.freeze({
  //Login y gestión usuario
  titulo_gestion_usuarios: "Gestión usuarios",
  titulo_pagina_login: "Página Login",
  titulo_add: "Añadir",
  titulo_search: "Buscar",
  titulo_edit: "Editar",
  titulo_delete: "Eliminar",
  titulo_detail: "Detalle",
  err_login_corto: "Tamaño login demasiado corto (min 3 caracteres)",
  err_login_largo: "Tamaño login demasiado largo (max 15 caracteres)",
  err_login_acentos:
    "El login contiene carecteres no permitidos (solo letras sin acentos y números)",
  err_dni_size: "El tamaño del DNI debe ser de 9 caracteres",
  err_dni_format: "El formato del DNI debe ser 8 números y 1 letra",
  err_dni_incorrecto:
    "El DNI es incorrecto, el número no corresponde con la letra",
  err_dni_largo: "El DNI tiene como máximo 9 caracteres",
  err_dni_format_search:
    "El DNI no puede tener más de una letra y esta debe suceder a los números",
  err_pass_corta: "Contraseña demasiado corta (min. 3 caracteres)",
  err_pass_larga: "Contraseña demasiado larga (máx. 15 caracteres)",
  err_pass_acentos:
    "Contraseña contiene caracteres no permitidos (solo letras sin acentos y números)",
  label_rol: "Rol",
  label_usuario: "Usuario",
  label_dni: "DNI",
  formato_dni: "12345678A",
  rol_admin: "Admin",
  rol_coordinador: "Coordinador",
  rol_responsable: "Responsable",
  err_RECORDSET_VACIO: "No ha habido resultados de la búsqueda",

  // Gestion personas
  titulo_gestion_personas: "Gestión de personas",
  label_nombre_persona: "Nombre",
  label_apellidos_persona: "Apellidos",
  label_fecha_nacimiento_persona: "Fecha de nacimiento",
  label_direccion_persona: "Dirección",
  label_telefono_persona: "Teléfono",
  label_email_persona: "Email",
  label_foto_persona: "Foto",

  // Gestión roles
  titulo_gestion_roles: "Gestión de roles",
  label_id_rol: "ID Rol",
  label_nombre_rol: "Nombre",
  label_descrip_rol: "Descripción",

  // Gestión acciones
  titulo_gestion_acciones: "Gestión acciones",
  label_id_accion: "ID Acción",
  label_nombre_accion: "Nombre",
  label_descrip_accion: "Descripción",

  // Gestión funcionalidades
  titulo_gestion_funcionalidades: "Gestión funcionalidades",
  label_id_funcionalidad: "ID Funcionalidad",
  label_nombre_funcionalidad: "Nombre",
  label_descrip_funcionalidad: "Descripción",

  //Login
  titulo_registrar: "Registrar",
  recuperar_contrasena: "Recuperar contraseña",
  label_contrasena: "Contraseña",

  // Menú
  titulo_menu: "Menú",
  titulo_desconectar: "Desconectar",
  titulo_volver: "Volver",

  //Permisos
  titulo_gestion_permisos: "Gestión permisos",
  titulo_permiso_delete: "Eliminar permiso",
  titulo_permiso_add: "Añadir permiso",
  permisos_titulo_accion: "Acción",
  permisos_titulo_funcionalidad: "Funcionalidad",
  permisos_titulo_rol: "Rol",
  label_permisos_select_funcionalidad: "Filtrar por funcionalidad",

  // Registro
  titulo_registro: "Registro",
  form_title_registro_persona: "Datos persona",
  form_title_registro_usuario: "Datos usuario",
  label_contrasena_verificar: "Repite la contraseña",

  // Cambiar contraseña
  btn_cambiar_contrasena: "Cambiar contraseña",

  // Errores de comprobaciones
  //err_id_accion_largo: "ID de acción largo",
  //err_id_accion_negativo: "ID de acción no puede ser negativo",
  err_nombre_accion_largo: "El nombre de la acción es demasiado largo",
  err_nombre_accion_corto: "El nombre de la accion es demasiado corto",
  err_nombre_accion_acentos: "El nombre de la acción no puede contener acentos",
  err_descrip_accion_largo: "La descripción de la acción es demasiado larga",
  err_descrip_accion_corto: "La descripción de la acción es demasiado corta",
  err_descrip_accion_caracteres_invalidos:
    "La descripción de la acción no puede contener los caracteres: '=','<','>','$','#','{','}','[','",
  // Funcionalidad
  //err_id_funcionalidad_largo: "ID de funcionalidad largo",
  //err_id_funcionalidad_corto: "ID de funcionalidad corto",
  //err_id_funcionalidad_negativo: "ID de funcionalidad no puede ser negativo",
  err_nombre_funcionalidad_largo: "El nombre es demasiado largo",
  err_nombre_funcionalidad_corto: "El nombre es demasiado corto",
  err_nombre_funcionalidad_acentos: "El nombre no puede contener acentos",
  err_descrip_funcionalidad_largo: "La descripción es demasiado larga",
  err_descrip_funcionalidad_corto: "La descripción es demasiado corta",
  err_descrip_funcionalidad_caracteres_invalidos:
    "La descripción no puede contener los caracteres: '=','<','>','$','#','{','}','[','",
  // Rol
  //err_id_rol_largo: "",
  //err_id_rol_corto: "",
  //err_id_rol_negativo: "",
  err_nombre_rol_largo: "El nombre del rol es demasiado largo",
  err_nombre_rol_corto: "El nombre del rol es demasiado corto",
  err_nombre_rol_acentos: "El nombre del rol no puede contener acentos",
  err_descrip_rol_largo: "La descripción del rol es demasiado larga",
  err_descrip_rol_corto: "La descripción del rol es demasiado corta",
  err_descrip_rol_caracteres_invalidos:
    "La descripción del rol no puede contener los caracteres: '=','<','>','$','#','{','}','[','",
  // Persona
  err_nombre_persona_largo: "El nombre es demasiado largo",
  err_nombre_persona_corto: "El nombre es demasiado corto",
  err_nombre_persona_caracteres_invalidos:
    "El nombre solo puede contener letras, letras con acentos y espacios",
  err_apellidos_persona_largo: "El apellido es demasiado largo",
  err_apellidos_persona_corto: "El apellido es demasiado corto",
  err_apellidos_persona_caracteres_invalidos:
    "El apellido solo puede contener letras, letras con acentos, espacios y guiones",
  err_direccion_persona_largo: "La dirección es demasiado larga",
  err_direccion_persona_corta: "La dirección es demasiado corta",
  err_direccion_persona_caracteres_invalidos:
    "La dirección solo puede contener letras, letras con acentos, espacios, números y los caracteres: '/','-',',','º','ª'",
  err_telefono_persona_largo: "El teléfono es demasiado largo",
  err_telefono_persona_corto: "El teléfono es demasiado corto",
  err_telefono_persona_caracteres_invalidos:
    "El teléfono solo puede contener números",
  err_email_persona_largo: "El email es demasiado largo",
  err_email_persona_corto: "El email es demasiado corto",
  err_email_persona_caracteres_invalidos:
    "El email solo puede contener letras, números y los caracteres: '-','_','+','.','@'",
  err_email_persona_formato_invalido:
    "El formato del email es inválido, debe ser: correo@dominio.com",
  err_email_persona_empieza_termina_punto:
    "El email no puede empezar o terminar en punto",
  email_persona_demasiadas_arrobas: "El email solo puede contener una '@'",
  err_foto_persona_largo: "El nombre del archivo de la foto es demasiado largo",
  err_foto_persona_corto: "El nombre del archivo de la foto es demasiado corto",
  err_foto_persona_caracteres_invalidos:
    "El nombre del archivo de la foto no puede contener acentos",
  err_foto_persona_formato_fichero_incorrecto:
    "La foto debe estar en formato PNG o JPG",
  err_fechaNacimiento_invalida: "La fecha de nacimiento es inválida",
  err_fechaNacimiento_persona_futura:
    "La fecha de nacimiento no puede ser posterior a la actual",
  // Contraseñas
  err_contrasena_no_verifica: "Las contraseñas no coinciden",
  err_contrasena_caracteres_invalidos:
    "La contraseña solo puede contener letras mayúsculas y minúsculas, números, barra baja (_) y guión (-)",
  err_contrasena_format_corta: "La contraseña es demasiado corta",
  err_contrasena_format_larga: "La contraseña es demasidado larga",

  //LITERALES DEVUELTOS DESDE BACK COMO RESPUESTA A ACCIONES (2/11/2022)
  //generales
  // err_SQL_KO: "Error de operación",
  // err_CONEXION_KO: "Se ha producido un error de conexión",
  err_RECORDSET_VACIO: "No hay resultados",
  // err_RECORDSET_DATOS: "Hay datos",

  // registrar
  err_CAMBIAR_contrasena_KO: "No se ha podido cambiar la contraseña",
  // login
  err_USUARIO_PASS_KO: "Contraseña incorrecta",
  err_USUARIO_LOGIN_KO: "Usuario incorrecto",
  // persona
  err_dni_EXISTE_en_persona_KO:
    "El DNI introducido ya está registrado por una persona",
  err_dni_NO_EXISTE_en_persona_KO:
    "No existe una persona con el DNI introducido",
  err_dni_EXISTE_en_usuario_KO:
    "El DNI introducido ya está registrado por un usuario",
  err_dni_NO_EXISTE_en_usuario_KO:
    "No existe un usuario registrado con el DNI introducido",
  err_email_EXISTE_en_persona_KO:
    "El email introducido ya está registrado por una persona",
  // usuario
  err_usuario_EXISTE_en_usuario_KO: "El usuario introducido ya está registrado",
  err_admin_no_se_puede_modificar_KO:
    "Los datos del administrador no se pueden modificar",
  err_admin_no_se_puede_borrar_KO:
    "Los datos del administrador no se pueden eliminar",
  // rol
  err_id_rol_EXISTE_en_usuario_KO: "El usuario ya tiene este rol",
  err_no_puede_borrar_rol_adminybasico:
    'No se pueden eliminar los roles "Admin" y "Básico"',
  err_no_puede_editar_rol_adminybasico:
    'No se pueden modificar los roles "Admin" y "Básico"',
  err_id_rol_EXISTE_en_rol_KO: "El ID del rol ya está registrado",
  err_id_rol_NO_EXISTE_en_rol_KO: "ID del rol no existe",
  err_id_rol_EXISTE_en_rolaccionfuncionalidad_KO:
    "Existen permisos para este rol que deben eliminarse para poder eliminar el rol",
  // accion
  err_id_accion_EXISTE_en_accion_KO: "Ya está registrada una acción con tal ID",
  err_id_accion_NO_EXISTE_en_accion_KO: "No existe una acción con tal ID",
  err_id_accion_EXISTE_en_rolaccionfuncionalidad_KO:
    "Existen permisos para esta acción que deben eliminarse para poder eliminar la acción",
  err_no_puede_editar_acciones_admin:
    "No se pueden editar las acciones del Administrador",
  // funcionalidad
  err_id_funcionalidad_EXISTE_en_funcionalidad_KO:
    "Ya está registrada una funcionalidad con tal ID",
  err_id_funcionalidad_NO_EXISTE_en_funcionalidad_KO:
    "No existe una funcionalidad con tal ID",
  err_id_funcionalidad_EXISTE_en_rolaccionfuncionalidad_KO:
    "Existen permisos para esta funcionalidad que deben eliminarse para poder eliminar la funcionalidad",
  err_no_puede_editar_funcionalidades_admin:
    "No se pueden editar funcionalidades del Administrador",
  err_no_puede_borrar_funcionalidades_admin:
    "No se pueden eliminar funcionalidades del Administrador",
  // rolaccionfuncionalidad
  err_no_puede_borrar_permiso_admin:
    "No se pueden borrar permisos del administrador",
  err_no_puede_editar_permiso_admin:
    "No se pueden editar permisos del administrador",
  err_permiso_EXISTE_en_rolaccionfuncionalidad_KO: "El permiso ya existe",
  err_permiso_NO_EXISTE_en_rolaccionfuncionalidad_KO:
    "El permiso a eliminar no existe",
  err_prohibido_edit_rolaccionfuncionalidad:
    "No se permite editar permisos, se deben eliminar o añadir",
  //http
  err_http_status_404:
    "Error HTTP 404, el recurso solicitado no se ha encontrado",
    err_http_status_undefined:'Error HTTP desconocido'
});
