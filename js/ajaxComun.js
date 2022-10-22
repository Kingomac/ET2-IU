const URL_BACK = "http://193.147.87.202/Back/index.php";

function insertarCampoOculto(idForm, name, valor) {
  const hidden = document.createElement("input");
  hidden.type = "hidden";
  hidden.name = name;
  hidden.value = valor;
  document.getElementById(idForm).append(hidden);
}

function eliminarCamposOcultos(idForm) {
  for (const i of document.getElementById(idForm).querySelectorAll("input")) {
    if (i.type === "hidden") {
      i.remove();
    }
  }
}
