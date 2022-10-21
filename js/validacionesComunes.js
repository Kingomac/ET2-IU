function ponerinvisibleerror(){
	document.getElementById('id_caja_error').style.display='none';
}

function ponerinvisibleformusuario(){
	document.getElementById('id_caja_formulario_usuario').style.display = 'none';
}

function mensajeKO(idElemento, texto){

	document.getElementById('id_texterror').innerHTML = texto;
	document.getElementById('id_caja_error').style.display = 'block';
	document.getElementById(idElemento).style.borderColor = "#ff0000";

}

function mensajeOK(idElemento){

	document.getElementById('id_texterror').innerHTML = '';
	document.getElementById('id_caja_error').style.display = 'none';
	document.getElementById(idElemento).style.borderColor = "#00e600";

}

function size_minimo(idElemento,longitudminima){

	let elemento;
	elemento = document.getElementById(idElemento).value;
	if (elemento.length < longitudminima){
		return false;
	}
	else{
		return true;
	}
}

function size_maximo(idElemento,longitudmaxima){
	
	elemento = document.getElementById(idElemento).value;
	if (elemento.length > longitudmaxima){
		return false;
	}
	else{
		return true;
	}
}

function letrassinacentoynumeros(idElemento){
	return true;
}

function encriptarpassword(){
	document.getElementById('id_contrasena').value = hex_md5(document.getElementById('id_contrasena').value);
	return true;
}