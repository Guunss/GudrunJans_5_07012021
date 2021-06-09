window.onload = () => {
  afficherProduits();
  afficherNbElementPanier();
};

function afficherProduits() {
  fetch("http://localhost:3000/api/teddies")
    .then((response) => response.json())
    .then((response) => {
      const articles = document.getElementById("articles");
      let row;
      response.forEach((nounours, index) => {
        if (index % 3 === 0) {
          row = document.createElement("div");
          row.className = "row";
          articles.appendChild(row);
        }
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
    .catch((error) => {
      console.log("Une erreur lors de la récupération: " + JSON.stringify(error))
    });
}
