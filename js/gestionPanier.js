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

function removePanier() {
  localStorage.removeItem("panier");
}

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
