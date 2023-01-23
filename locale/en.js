const EN = Object.freeze({
  //Login and gestión usuario
  titulo_gestion_usuarios: "User management",
  titulo_pagina_login: "Login page",
  titulo_add: "Add",
  titulo_search: "Search",
  titulo_edit: "Edit",
  titulo_delete: "Delete",
  titulo_detail: "Detail",
  err_dni_format_search: "Incorrect DNI format",
  err_login_corto: "Login length is too short (min 3 characters)",
  err_login_largo: "Login length is too long (max 15 characters)",
  err_login_acentos:
    "Login contains unsupported characters (use just letters without accents and numbers)",
  err_dni_size: "DNI length must be 9 characters",
  err_dni_format: "DNI format is 8 numbers and 1 letter",
  err_dni_incorrecto:
    "Incorrect DNI, number does not match the verification letter",
  err_dni_largo: "DNI length must be 9 characters",
  err_pass_corta: "Password is too short (min. 3 characters)",
  err_pass_larga: "Password is too long (máx. 15 characters)",
  err_pass_acentos:
    "Password contains not allowed characters (use just letter without accents and numbers please)",
  label_rol: "Role",
  label_usuario: "User",
  label_dni: "DNI",
  formato_dni: "12345678A",
  rol_admin: "Admin",
  rol_coordinador: "Coordinator",
  rol_responsable: "Responsible",
  err_RECORDSET_VACIO: "No results",

  // Modales
  titulo_modal_cerrar: "Close",
  modal_mensaje_exito: "🤯 Successful operation 🤯",
  titulo_modal_exito: "🤩🤩 Sucess 🤩🤩 ",

  // Gestion personas
  titulo_gestion_personas: "People management",
  label_nombre_persona: "Name",
  label_apellidos_persona: "Surname",
  label_fecha_nacimiento_persona: "Birthdate",
  label_direccion_persona: "Address",
  label_telefono_persona: "Phone number",
  label_email_persona: "Email",
  label_foto_persona: "Photo",

  // Gestión roles
  titulo_gestion_roles: "Role management",
  label_id_rol: "Role ID",
  label_nombre_rol: "Name",
  label_descrip_rol: "Description",

  // Gestión acciones
  titulo_gestion_acciones: "Action management",
  label_id_accion: "ID Acción",
  label_nombre_accion: "Name",
  label_descrip_accion: "Description",

  // Gestión funcionalidades
  titulo_gestion_funcionalidades: "Functionality management",
  label_id_funcionalidad: "Functionality ID",
  label_nombre_funcionalidad: "Name",
  label_descrip_funcionalidad: "Description",

  //Login
  titulo_registrar: "Register",
  recuperar_contrasena: "Password retrieval",
  label_contrasena: "Password",
  btn_login: "Log in",

  // Menú
  titulo_menu: "Menu",
  titulo_desconectar: "Disconnect",
  titulo_volver: "Back",
  titulo_conectado_como: "Connected as",

  //Permisos
  titulo_gestion_permisos: "Permissions management",
  titulo_permiso_delete: "Delete permission",
  titulo_permiso_add: "Add permission",
  permisos_titulo_accion: "Action",
  permisos_titulo_funcionalidad: "Functionality",
  permisos_titulo_rol: "Role",
  label_permisos_select_funcionalidad: "Filter by functionality",

  // Registro
  titulo_registro: "Register",
  form_title_registro_persona: "Person information",
  form_title_registro_usuario: "User information",
  label_contrasena_verificar: "Verify password",

  // Cambiar contraseña
  btn_cambiar_contrasena: "Change password",
  fields_nueva_contrasena: "Write your new password",

  //Errores
  titulo_error_modal: "Error",
  err_rol_desconocido: "Unknown role with ID:",
  // Errores de comprobaciones
  //err_id_accion_largo: "ID de acción largo",
  //err_id_accion_negativo: "ID de acción no puede ser negativo",
  err_nombre_accion_largo: "The name is too long",
  err_nombre_accion_corto: "The name is too short",
  err_nombre_accion_acentos: "The name cannot include any accents",
  err_descrip_accion_largo: "The description is too long",
  err_descrip_accion_corto: "The description is too short",
  err_descrip_accion_caracteres_invalidos:
    "The description cannot include any of these characters: '=','<','>','$','#','{','}','[','",
  // Funcionalidad
  //err_id_funcionalidad_largo: "ID de funcionalidad largo",
  //err_id_funcionalidad_corto: "ID de funcionalidad corto",
  //err_id_funcionalidad_negativo: "ID de funcionalidad no puede ser negativo",
  err_nombre_funcionalidad_largo: "The name is too long",
  err_nombre_funcionalidad_corto: "The name is too short",
  err_nombre_funcionalidad_acentos: "The name cannot include any accents",
  err_descrip_funcionalidad_largo: "The description is too long",
  err_descrip_funcionalidad_corto: "The description is too short",
  err_descrip_funcionalidad_caracteres_invalidos:
    "The description cannot include any of these characters: '=','<','>','$','#','{','}','[','",
  // Rol
  //err_id_rol_largo: "",
  //err_id_rol_corto: "",
  //err_id_rol_negativo: "",
  err_nombre_rol_largo: "The name of the role is too long",
  err_nombre_rol_corto: "The name of the role is too short",
  err_nombre_rol_acentos: "The name of the role cannot include any accents",
  err_descrip_rol_largo: "The description of the role is too long",
  err_descrip_rol_corto: "The description of the role is too short",
  err_descrip_rol_caracteres_invalidos:
    "The description of the role cannot include any of these characters: '=','<','>','$','#','{','}','[','",
  // Persona
  err_nombre_persona_largo: "The name is too long",
  err_nombre_persona_corto: "The name is too short",
  err_nombre_persona_caracteres_invalidos:
    "The name can just include letters, letters with accents and spaces",
  err_apellidos_persona_largo: "The surname is too long",
  err_apellidos_persona_corto: "The surname is too short",
  err_apellidos_persona_caracteres_invalidos:
    "The surname can just include letters, letters with accents, spaces and hyphens",
  err_direccion_persona_largo: "La dirección es demasiado larga",
  err_direccion_persona_corta: "La dirección es demasiado corta",
  err_direccion_persona_caracteres_invalidos:
    "La dirección can just include letters, letters with accents, spaces, numbers and the characters: '/','-',',','º','ª'",
  err_telefono_persona_largo: "El teléfono is too long",
  err_telefono_persona_corto: "El teléfono is too short",
  err_telefono_persona_caracteres_invalidos:
    "El teléfono can just include numbers",
  err_email_persona_largo: "The email is too long",
  err_email_persona_corto: "The email is too short",
  err_email_persona_caracteres_invalidos:
    "The email can just include letters, numbers and the characters: '-','_','+','.','@'",
  err_email_persona_formato_invalido:
    "The email format is incorrect, it must be: email@domain.com",
  err_email_persona_empieza_termina_punto:
    "The email cannot start or end with dot",
  email_persona_demasiadas_arrobas: "Email can just include one '@'",
  err_foto_persona_largo: "The name del photo file is too long",
  err_foto_persona_corto: "The name del photo file is too short",
  err_foto_persona_caracteres_invalidos:
    "The name del photo file cannot include any accents",
  err_foto_persona_formato_fichero_incorrecto:
    "The photo format must be PNG or JPG",
  err_fechaNacimiento_invalida: "The birthdate is not valid",
  err_fechaNacimiento_persona_futura:
    "The date of birth cannot be later than the current one",
  // Contraseñas
  err_contrasena_no_verifica: "Passwords must match",
  err_contrasena_caracteres_invalidos:
    "Password can just include letters (upcase or lowercase), numbers, low bar (_) and hyphen (-)",
  err_contrasena_format_corta: "Password is too short",
  err_contrasena_format_larga: "Password is too longks",

  //LITERALES DEVUELTOS DESDE BACK COMO RESPUESTA A ACCIONES (2/11/2022)
  //generales
  // err_SQL_KO: "Error de operación",
  // err_CONEXION_KO: "Se ha producido un error de conexión",
  err_RECORDSET_VACIO: "No results",
  // err_RECORDSET_DATOS: "Hay datos",

  // registrar
  err_CAMBIAR_contrasena_KO: "Password couldn't be changed",
  // login
  err_USUARIO_PASS_KO: "Incorrect password",
  err_USUARIO_LOGIN_KO: "Incorrect user",
  // persona
  err_dni_EXISTE_EN_usuario_KO:
    "There's an user registered with that DNI so delete that user before deleting the person",
  err_dni_EXISTE_en_persona_KO: "This DNI is already registered",
  err_dni_NO_EXISTE_en_persona_KO: "There is not any person with that DNI",
  err_dni_EXISTE_en_usuario_KO: "This DNI is already registered",
  err_dni_NO_EXISTE_en_usuario_KO: "There is not any user with that DNI",
  err_email_EXISTE_en_persona_KO: "The entered email is already registered",
  // usuario
  err_usuario_EXISTE_en_usuario_KO: "The entered user is already registeres",
  err_admin_no_se_puede_modificar_KO: "Administrator data cannot be modified",
  err_admin_no_se_puede_borrar_KO: "Administrator data cannot be deleted",
  // rol
  err_id_rol_EXISTE_en_usuario_KO: "The user already plays the entered role",
  err_no_puede_borrar_rol_adminybasico:
    'The roles "Admin" and "Básico" cannot be deleted',
  err_no_puede_editar_rol_adminybasico:
    'The roles "Admin" and "Básico" cannot be modified',
  err_id_rol_EXISTE_en_rol_KO: "The ID of the role is already registered",
  err_id_rol_NO_EXISTE_en_rol_KO: "The ID of the role does not exist",
  err_id_rol_EXISTE_en_rolaccionfuncionalidad_KO:
    "There are permissions for this role that must be deleted before deleting it",
  // accion
  err_id_accion_EXISTE_en_accion_KO:
    "The ID of the action is already registered",
  err_id_accion_NO_EXISTE_en_accion_KO: "The ID of the action does not exist",
  err_id_accion_EXISTE_en_rolaccionfuncionalidad_KO:
    "There are permissions for this action that must be deleted before deleting it",
  err_no_puede_editar_acciones_admin:
    "The actions of the Administrator cannot be modified",
  // funcionalidad
  err_id_funcionalidad_EXISTE_en_funcionalidad_KO:
    "The ID of the functionality is already registered",
  err_id_funcionalidad_NO_EXISTE_en_funcionalidad_KO:
    "The ID of the functionality does not exist",
  err_id_funcionalidad_EXISTE_en_rolaccionfuncionalidad_KO:
    "There are permissions for this functionality that must be deleted before deleting it",
  err_no_puede_editar_funcionalidades_admin:
    "The functionalities of the Administrator cannot be modified",
  err_no_puede_borrar_funcionalidades_admin:
    "The functionalities of the Administrator cannot be deleted",
  // rolaccionfuncionalidad
  err_no_puede_borrar_permiso_admin:
    "The permissions of the Administrator cannot be deleted",
  err_no_puede_editar_permiso_admin:
    "The permissions of the Administrator cannot be modified",
  err_permiso_EXISTE_en_rolaccionfuncionalidad_KO:
    "The permission already exist",
  err_permiso_NO_EXISTE_en_rolaccionfuncionalidad_KO:
    "The permission does not exist",
  err_prohibido_edit_rolaccionfuncionalidad:
    "Permissions cannot be modified, they must be added or deleted",
  //http
  err_http_status_404: "HTTP error 404, the requested resource cannot be found",
  err_http_status_undefined: "Unknown HTTP error",
});
