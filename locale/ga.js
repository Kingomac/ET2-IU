const GA = Object.freeze({
  //Login e gestión usuario
  titulo_gestion_usuarios: "Xestión de usuarios",
  titulo_pagina_login: "Páxina Login",
  titulo_add: "Engadir",
  titulo_search: "Procurar",
  titulo_edit: "Editar",
  titulo_delete: "Eliminar",
  titulo_detail: "Detalle",
  err_login_corto: "Tamaño login demasiado curto (min 3 caracteres)",
  err_login_largo: "Tamaño login demasiado longo (máx 15 caracteres)",
  err_login_acentos:
    "O login contén carecteres non permitidos (só letras sen acentos e números)",
  err_dni_size: "O tamaño do DNI debe ser de 9 caracteres",
  err_dni_format: "O formato do DNI debe ser 8 números e 1 letra",
  err_dni_incorrecto: "O DNI é incorrecto, o número non corresponde coa letra",
  err_dni_largo: "O DNI ten como máximo 9 caracteres",
  err_dni_format_search:
    "O DNI non pode ter máis dunha letra e esta debe suceder aos números",
  err_pass_corta: "Contrasinal demasiado curto (min. 3 caracteres)",
  err_pass_longa: "Contrasinal demasiado longo (máx. 15 caracteres)",
  err_pass_acentos:
    "Contrasinal contén caracteres non permitidos (só letras sen acentos e números)",
  label_rol: "Rol",
  label_usuario: "Usuario",
  label_dni: "DNI",
  formato_dni: "12345678A",
  rol_admin: "Admin",
  rol_coordinador: "Coordinador",
  rol_responsable: "Responsable",
  err_RECORDSET_VACIO: "Non houbo resultados na procura",

  // Gestion personas
  titulo_gestion_personas: "Xestión de personas",
  label_nombre_persona: "Nome",
  label_apellidos_persona: "Apelidos",
  label_fecha_nacimiento_persona: "Data de nacemento",
  label_direccion_persona: "Dirección",
  label_telefono_persona: "Teléfono",
  label_email_persona: "Email",
  label_foto_persona: "Foto",

  err_fechaNacimiento_persona_futura:
    "A data de nacemento non pode ser posterior á actual",

  // Xestión roles
  titulo_gestion_roles: "Xestión de roles",
  label_id_rol: "ID Rol",
  label_nombre_rol: "Nome",
  label_descrip_rol: "Descrición",

  // Xestión acciones
  titulo_gestion_acciones: "Xestión accións",
  label_id_accion: "ID Acción",
  label_nombre_accion: "Nome",
  label_descrip_accion: "Descrición",

  // Xestión funcionalidades
  titulo_gestion_funcionalidades: "Xestión funcionalidades",
  label_id_funcionalidad: "ID Funcionalidad",
  label_nombre_funcionalidad: "Nome",
  label_descrip_funcionalidad: "Descrición",

  //Login
  titulo_registrar: "Rexistrar",
  recuperar_contrasena: "Recuperar contrasinal",
  label_contrasena: "Contrasinal",
  btn_login: "Iniciar sesión",

  // Menú
  titulo_menu: "Menú",
  titulo_desconectar: "Desconectar",
  titulo_volver: "Volver",

  //Permisos
  titulo_gestion_permisos: "Xestión de permisos",
  titulo_permiso_delete: "Eliminar permiso",
  titulo_permiso_add: "Engadir permiso",
  permisos_titulo_accion: "Acción",
  permisos_titulo_funcionalidad: "Funcionalidade",
  permisos_titulo_rol: "Rol",
  label_permisos_select_funcionalidad: "Filtrar por funcionalidade",

  // Registro
  titulo_registro: "Rexistro",
  form_title_registro_persona: "Datos persoa",
  form_title_registro_usuario: "Datos usuario",
  label_contrasena_verificar: "Repite o contrasinal",

  // Cambiar contraseña
  btn_cambiar_contrasena: "Cambiar contrasinal",

  // Errores de comprobaciones
  //err_id_accion_largo: "ID de acción longo",
  //err_id_accion_negativo: "ID de acción non pode ser negativo",
  err_nombre_accion_largo: "O nome da acción é demasiado longo",
  err_nombre_accion_corto: "O nome da accion é demasiado curto",
  err_nombre_accion_acentos: "O nome da acción non pode conter acentos",
  err_descrip_accion_largo: "A descrición da acción é demasiado longa",
  err_descrip_accion_corto: "A descrición da acción é demasiado curta",

  // Funcionalidad
  //err_id_funcionalidad_largo: "ID de funcionalidade longo",
  //err_id_funcionalidad_corto: "ID de funcionalidade curto",
  //err_id_funcionalidad_negativo: "ID de funcionalidade non pode ser negativo",
  err_nombre_funcionalidad_largo: "O nome é demasiado longo",
  err_nombre_funcionalidad_corto: "O nome é demasiado curto",
  err_nombre_funcionalidad_acentos: "O nome non pode conter acentos",
  err_descrip_funcionalidad_largo: "A descrición é demasiado longa",
  err_descrip_funcionalidad_corto: "A descrición é demasiado curta",
  err_descrip_funcionalidad_caracteres_invalidos:
    "A descrición non pode conter os caracteres: '=','<','>','$','#','{','}','[','",
  // Rol
  //err_id_rol_largo: "",
  //err_id_rol_corto: "",
  //err_id_rol_negativo: "",
  err_nombre_rol_largo: "O nome do rol é demasiado longo",
  err_nombre_rol_corto: "O nome do rol é demasiado curto",
  err_nombre_rol_acentos: "O nome do rol non pode conter acentos",
  err_descrip_rol_largo: "A descrición do rol é demasiado longa",
  err_descrip_rol_corto: "A descrición do rol é demasiado curta",
  err_descrip_rol_caracteres_invalidos:
    "A descrición do rol non pode conter os caracteres: '=','<','>','$','#','{','}','[','",
  // Persona
  err_nombre_persona_largo: "O nome é demasiado longo",
  err_nombre_persona_corto: "O nome é demasiado curto",
  err_nombre_persona_caracteres_invalidos:
    "O nome só pode conter letras, letras con acentos e espacios",
  err_apellidos_persona_largo: "Os apelidos son demasiado longos",
  err_apellidos_persona_corto: "Os apelidos son demasiado curtos",
  err_apellidos_persona_caracteres_invalidos:
    "O apellido só pode conter letras, letras con acentos, espacios e guiones",
  err_direccion_persona_largo: "A dirección é demasiado longa",
  err_direccion_persona_corta: "A dirección é demasiado curta",
  err_direccion_persona_caracteres_invalidos:
    "A dirección só pode conter letras, letras con acentos, espacios, números e os caracteres: '/','-',',','º','ª'",
  err_telefono_persona_largo: "O teléfono é demasiado longo",
  err_telefono_persona_corto: "O teléfono é demasiado curto",
  err_telefono_persona_caracteres_invalidos:
    "O teléfono só pode conter números",
  err_email_persona_largo: "O email é demasiado longo",
  err_email_persona_corto: "O email é demasiado curto",
  err_email_persona_caracteres_invalidos:
    "O email só pode conter letras, números e os caracteres: '-','_','+','.','@'",
  err_email_persona_formato_invalido:
    "O formato do email é inválido, debe de ser: correo@dominio.com",
  err_email_persona_empieza_termina_punto:
    "O email non pode empezar o terminar en punto",
  email_persona_demasiadas_arrobas: "O email só pode conter unha '@'",
  err_foto_persona_largo: "O nome do  arquivo da foto é demasiado longo",
  err_foto_persona_corto: "O nome do  arquivo da foto é demasiado curto",
  err_foto_persona_caracteres_invalidos:
    "O nome do  arquivo da foto non pode conter acentos",
  err_foto_persona_formato_fichero_incorrecto:
    "A foto debe estar en formato PNG ou JPG",
  err_fechaNacimiento_invalida: "A data de nacemento é inválida",
  err_descrip_accion_caracteres_invalidos:
    "A descrición da acción non pode conter os caracteres: '=','<','>','$','#','{','}','[','",
  // Contrasinais
  err_contrasena_no_verifica: "Os contrasinais non coinciden",
  err_contrasena_caracteres_invalidos:
    "O contrasinal só pode conter letras maiúsculas e minúsculas, números, barra baixa (_) e guión (-)",
  err_contrasena_format_corta: "O contrasinal é demasiado curto",
  err_contrasena_format_larga: "O contrasinal é demasidado longo",

  //LITERALES DEVUELTOS DESDE BACK COMO RESPUESTA A ACCIONES (2/11/2022)
  //generales
  // err_SQL_KO: "Error de operación",
  // err_CONEXION_KO: "Se ha producido un error de conexión",
  err_RECORDSET_VACIO: "Non hai resultados",
  // err_RECORDSET_DATOS: "Hay datos",

  // registrar
  err_CAMBIAR_contrasena_KO: "Non se puido cambiar o contrasinal",
  // login
  err_USUARIO_PASS_KO: "Contrasinal incorrecto",
  err_USUARIO_LOGIN_KO: "Usuario incorrecto",
  // persona
  err_dni_EXISTE_EN_usuario_KO:
    "Existe un usuario con este DNI, debes de eliminalo antes de eliminar a persoa",
  err_dni_EXISTE_en_persona_KO:
    "O DNI introducido xa está rexistrado por unha persona",
  err_dni_NO_EXISTE_en_persona_KO: "Non existe unha persona co DNI introducido",
  err_dni_EXISTE_en_usuario_KO:
    "O DNI introducido xa está rexistrado por un usuario",
  err_dni_NO_EXISTE_en_usuario_KO:
    "Non existe un usuario rexistrado co DNI introducido",
  err_email_EXISTE_en_persona_KO:
    "O email introducido xa está rexistrado por unha persona",
  // usuario
  err_usuario_EXISTE_en_usuario_KO: "O usuario introducido xa está rexistrado",
  err_admin_no_se_puede_modificar_KO:
    "Os datos do administrador non se poden modificar",
  err_admin_no_se_puede_borrar_KO:
    "Os datos do administrador non se poden eliminar",
  // rol
  err_id_rol_EXISTE_en_usuario_KO: "O usuario xa ten este rol",
  err_no_puede_borrar_rol_adminybasico:
    'Non se poden eliminar os roles "Admin" e "Básico"',
  err_no_puede_editar_rol_adminybasico:
    'Non se poden modificar os roles "Admin" e "Básico"',
  err_id_rol_EXISTE_en_rol_KO: "O ID do rol xa está rexistrado",
  err_id_rol_NO_EXISTE_en_rol_KO: "ID do rol non existe",
  err_id_rol_EXISTE_en_rolaccionfuncionalidad_KO:
    "Existen permisos para este rol que deben eliminarse para poder eliminar o rol",
  // accion
  err_id_accion_EXISTE_en_accion_KO:
    "Xa está rexistrada unha acción con tal ID",
  err_id_accion_NO_EXISTE_en_accion_KO: "Non existe unha acción con tal ID",
  err_id_accion_EXISTE_en_rolaccionfuncionalidad_KO:
    "Existen permisos para esta acción que deben eliminarse para poder eliminar a acción",
  err_no_puede_editar_acciones_admin:
    "Non se poden editar as accións do Administrador",
  // funcionalidad
  err_id_funcionalidad_EXISTE_en_funcionalidad_KO:
    "Xa está rexistrada unha funcionalidade con tal ID",
  err_id_funcionalidad_NO_EXISTE_en_funcionalidad_KO:
    "Non existe unha funcionalidade con tal ID",
  err_id_funcionalidad_EXISTE_en_rolaccionfuncionalidad_KO:
    "Existen permisos para esta funcionalidade que deben eliminarse para poder eliminar a funcionalidade",
  err_no_puede_editar_funcionalidades_admin:
    "Non se poden editar funcionalidades do Administrador",
  err_no_puede_borrar_funcionalidades_admin:
    "Non se poden eliminar funcionalidades do Administrador",
  // rolaccionfuncionalidad
  err_no_puede_borrar_permiso_admin:
    "Non se poden borrar permisos do administrador",
  err_no_puede_editar_permiso_admin:
    "Non se poden editar permisos do administrador",
  err_permiso_EXISTE_en_rolaccionfuncionalidad_KO: "O permiso xa existe",
  err_permiso_NO_EXISTE_en_rolaccionfuncionalidad_KO:
    "O permiso a eliminar non existe",
  err_prohibido_edit_rolaccionfuncionalidad:
    "Non se permite editar permisos, débense eliminar ou engadir",
  //http
  err_http_status_404: "Error HTTP 404, o recurso solicitado non se topou",
  err_http_status_undefined: "Error HTTP descoñecido",
});
