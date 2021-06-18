/**
 *
 * @param {nom du parametre} parameterName
 * @returns la valeur du paramètre
 */
function findGetParameter(parameterName) {
  var result = null,
    tmp = [];
  location.search
    .substr(1)
    .split("&")
    .forEach(function (item) {
      tmp = item.split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
  return result;
}

/**
 * met à jour le nombre d'éléments dans le panier
 */
function afficherNbElementPanier() {
  let nb = getNbElement();
  const nbEl = document.getElementById("nbelement");
  if (nb > 0) {
    nbEl.textContent = nb;
  } else {
    nbEl.style.display = "none";
  }
}
