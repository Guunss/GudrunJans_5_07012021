/**
 * au chargement de la page on met à jour la page avec le numero de commande
 */
window.onload = () => {
  const id = findGetParameter("order");
  const divOrderId = document.getElementById("commande-id");
  divOrderId.textContent = id;
};
