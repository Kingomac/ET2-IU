/**
 *
 * @param {HTMLElement} boton
 * @param  {...Node | String} nodos
 */
function crearModal(boton, ...nodos) {
  const modal = document.createElement("dialog");
  modal.append(nodos);
  boton.onclick = () => {
    modal.showModal();
  };
}
