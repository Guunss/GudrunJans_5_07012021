//lorsque la page est chargée on exécute les méthode afficherProduit() et afficherNbElementPanier()
window.onload = () => {
  afficherNbElementPanier();
  afficherProduit();
};

/*
fonction qui appelle le webservice pour récupérer la liste des produits et les ajoute au DOM
 */
function afficherProduit() {
  //on récupère l'id du produit
  const id = findGetParameter("id");
  fetch("http://localhost:3000/api/teddies/" + id)
    .then((response) => response.json())
    .then((response) => {
      //on met à jour la phrase de titre
      const phraseNours = document.getElementById("phraseNounours");
      phraseNours.textContent = phraseNours.textContent + " " + response.name;

      //on récupère le conteneur du produit et on construit les éléments HTML du produit
      const article = document.getElementById("article");
      let row = document.createElement("div");
      row.className = "row margeAvant";
      article.appendChild(row);

      let imageNours = document.createElement("div");
      imageNours.className = "col-lg-6 offset-lg-1";
      row.appendChild(imageNours);

      let image = document.createElement("img");
      image.className = "imageProduit";
      image.src = response.imageUrl;
      imageNours.appendChild(image);

      let explicationNours = document.createElement("div");
      explicationNours.className = "col-lg-4";
      row.appendChild(explicationNours);

      let titreDescription = document.createElement("h4");
      titreDescription.textContent = "Description";
      explicationNours.appendChild(titreDescription);

      let descriptionNours = document.createElement("p");
      descriptionNours.className = "descriptionNours";
      descriptionNours.textContent = response.description;
      explicationNours.appendChild(descriptionNours);

      let titreCouleurs = document.createElement("h4");
      titreCouleurs.textContent = "Couleurs";
      explicationNours.appendChild(titreCouleurs);

      let couleursNours = document.createElement("select");
      couleursNours.className = "form-control";
      explicationNours.appendChild(couleursNours);

      response.colors.forEach((item) => {
        let option = document.createElement("option");
        option.textContent = item;
        couleursNours.appendChild(option);
      });

      let titrePrix = document.createElement("h4");
      titrePrix.textContent = "Prix";
      explicationNours.appendChild(titrePrix);

      let prixNours = document.createElement("p");
      prixNours.className = "Prix";
      prixNours.textContent = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
      }).format(response.price / 100);
      explicationNours.appendChild(prixNours);

      //on crée le bouton ajouter au panier
      //utilisation de onclock pour gérer le click du bouton : utilisation des méthodes ajouterProduit et afficherNbElementsPanier
      let buttonPanier = document.createElement("button");
      buttonPanier.type = "button";
      buttonPanier.className = "btn btn-secondary btn-block";
      buttonPanier.textContent = "Ajouter au panier";
      buttonPanier.onclick = () => {
        let lignePanier = {
          id: response._id,
          imageUrl: response.imageUrl,
          name: response.name,
          price: response.price,
          quantite: 1,
        };
        ajouterProduit(lignePanier);
        afficherNbElementPanier();

        let alerteDiv = document.createElement("div");
        alerteDiv.className = "alert alert-dark alert-dismissible fade show";
        alerteDiv.role = "alert";
        let alerteTexte = document.createElement("p");
        alerteTexte.textContent = "Le produit a été ajouté dans le panier";
        alerteDiv.appendChild(alerteTexte);
        let alerteBouton = document.createElement("button");
        alerteBouton.type = "button";
        alerteBouton.className = "close";
        alerteBouton.setAttribute("data-dismiss", "alert");
        alerteBouton.innerHTML = "&times;";
        alerteDiv.appendChild(alerteBouton);
        document.getElementById("message").appendChild(alerteDiv);

        setTimeout(() => {
          const divMessage = document.getElementById("message");
          divMessage.removeChild(divMessage.firstChild);
        }, 3.0 * 1000);
      };
      explicationNours.appendChild(buttonPanier);
    });
}
