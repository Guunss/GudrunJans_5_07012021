//lorsque la page est chargée on exécute les méthode afficherProduits() et afficherNbElementPanier()
window.onload = () => {
  afficherProduits();
  afficherNbElementPanier();
};

/*
fonction qui appelle le webservice pour récupérer la liste des produits et les ajoute au DOM
 */
function afficherProduits() {
  fetch("http://localhost:3000/api/teddies")
    .then((response) => response.json())
    .then((response) => {
      //cherche la div articles qui va contenir les articles
      const articles = document.getElementById("articles");
      let row;
      //on crée une nouvelle row tous les trois produits
      response.forEach((nounours, index) => {
        if (index % 3 === 0) {
          row = document.createElement("div");
          row.className = "row";
          articles.appendChild(row);
        }

        //on crée la div qui contient le produit
        let divNounours = document.createElement("div");
        divNounours.className = "col-lg-4";
        row.appendChild(divNounours);

        let card = document.createElement("div");
        card.className = "card mx-auto";
        card.style = "width: 18rem;";
        card.onclick = () => {
          window.location.href = "/produit.html?id=" + nounours._id;
        };
        divNounours.appendChild(card);

        let image = document.createElement("img");
        image.className = "card-img-top";
        image.src = nounours.imageUrl;
        card.appendChild(image);

        let cardBody = document.createElement("div");
        cardBody.className = "card-body";
        card.appendChild(cardBody);

        let cardTitre = document.createElement("div");
        cardTitre.className = "contenu-card";
        cardBody.appendChild(cardTitre);

        let nomNounours = document.createElement("h5");
        nomNounours.className = "card-title";
        nomNounours.textContent = nounours.name;
        cardTitre.appendChild(nomNounours);

        let prixNounours = document.createElement("h5");
        prixNounours.className = "card-title";
        prixNounours.textContent = new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: "EUR",
        }).format(nounours.price / 100);
        cardTitre.appendChild(prixNounours);
      });
    })
    //en cas d'erreur on log une information dans la console
    .catch((error) => {
      console.log("Une erreur lors de la récupération: " + JSON.stringify(error))
    });
}
