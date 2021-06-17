/**
 * ajout le produit dans le panier du localstorage
 * @param {le produit} produit 
 */
function ajouterProduit(produit) {
  let panier = localStorage.getItem("panier");
  if (panier === null) {
    panier = [];
  } else {
    panier = JSON.parse(panier);
  }
  let produitTrouver = false;
  panier.forEach((element) => {
    if (element.id === produit.id) {
      element.quantite++;
      produitTrouver = true;
    }
  });
  if (!produitTrouver) {
    panier.push(produit);
  }
  localStorage.setItem("panier", JSON.stringify(panier));
}

/**
 * diminue la qté de produit de 1. Le supprimer si qte est 1
 * @param {id du produit a diminué} id 
 */
function enleverProduit(id) {
  let panier = localStorage.getItem("panier");
  if (panier != null) {
    panier = JSON.parse(panier);
    panier.forEach((element) => {
      if (element.id === id) {
        if (element.quantite >= 1) {
          element.quantite--;
        }
      }
    });
    panier = panier.filter((element) => element.quantite > 0);
    localStorage.setItem("panier", JSON.stringify(panier));
  }
}

/**
 * 
 * @returns la liste de ids des produits du panier (1 par qté commandé)
 */
function getIdsCommandes() {
  let panier = localStorage.getItem("panier");
  if (panier === null) {
    panier = [];
  } else {
    panier = JSON.parse(panier);
  }
  let ids = [];
  panier.forEach((element) => {
    for (i = 0; i < element.quantite; i++) {
      ids.push(element.id);
    }
  });
  return ids;
}

/**
 * supprime le panier du localstorage
 */
function removePanier() {
  localStorage.removeItem("panier");
}

/**
 * 
 * @returns le prix total de la commande
 */
function getPrixTotal() {
  let prix = 0;
  let panier = localStorage.getItem("panier");
  if (panier === null) {
    panier = [];
  } else {
    panier = JSON.parse(panier);
  }
  panier.forEach((element) => {
    prix = prix + element.quantite * element.price;
  });
  return prix;
}

/**
 * 
 * @returns le nombre d'éléments dans le panier
 */
function getNbElement() {
  let nb = 0;
  let panier = localStorage.getItem("panier");
  if (panier === null) {
    panier = [];
  } else {
    panier = JSON.parse(panier);
  }
  panier.forEach((element) => {
    nb += element.quantite;
  });
  return nb;
}
