window.onload = () => {
  const id = findGetParameter("order");
  const divOrderId = document.getElementById("commande-id");
  divOrderId.textContent = id;
};
