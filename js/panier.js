window.onload = () => {
  rechargerPanier();
  afficherNbElementPanier();
};

function rechargerPanier() {
  let panier = localStorage.getItem("panier");
  const divPanier = document.getElementById("panier");
  if (panier === null || JSON.parse(panier).length === 0) {
    let textPanierVide = document.createElement("h2");
    textPanierVide.textContent = "Votre panier est vide";
    divPanier.appendChild(textPanierVide);
    document.getElementById("formulaire").hidden = true;
  } else {
    panier = JSON.parse(panier);
    panier.forEach((element) => {
      let row = document.createElement("div");
      row.className = "row ligne-panier";
      divPanier.appendChild(row);

      let imgPanier = document.createElement("div");
      imgPanier.className = "col-sm-2 offset-sm-2";
      row.appendChild(imgPanier);

      let imagePanier = document.createElement("img");
      imagePanier.className = "imagePanier";
      imagePanier.src = element.imageUrl;
      imgPanier.appendChild(imagePanier);

      let nomPanier = document.createElement("div");
      nomPanier.className = "col-sm-2";
      nomPanier.textContent = element.name;
      row.appendChild(nomPanier);

      let quantitePanier = document.createElement("div");
      quantitePanier.className = "col-sm-2 panier_quantite";
      row.appendChild(quantitePanier);

      let divQte = document.createElement("div");
      divQte.textContent = element.quantite;
      quantitePanier.appendChild(divQte);

      let divQtePlusMoins = document.createElement("div");
      divQtePlusMoins.className = "panier_plus_moins";
      quantitePanier.appendChild(divQtePlusMoins);

      let quantitePlus = document.createElement("i");
      quantitePlus.className = "far fa-plus-square";
      quantitePlus.onclick = () => {
        ajouterProduit({
          id: element.id,
        });
        divPanier.innerHTML = "";
        rechargerPanier();
        afficherNbElementPanier();
      };
      divQtePlusMoins.appendChild(quantitePlus);

      let quantiteMoins = document.createElement("i");
      quantiteMoins.className = "far fa-minus-square";
      quantiteMoins.onclick = () => {
        enleverProduit(element.id);
        divPanier.innerHTML = "";
        rechargerPanier();
        afficherNbElementPanier();
      };
      divQtePlusMoins.appendChild(quantiteMoins);

      let prixPanier = document.createElement("div");
      prixPanier.className = "col-sm-2";
      prixPanier.textContent = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
      }).format((element.price / 100) * element.quantite);
      row.appendChild(prixPanier);
    });
    let row = document.createElement("div");
    row.className = "row ligne-panier";
    divPanier.appendChild(row);

    let totalPanier = document.createElement("div");
    totalPanier.className = "col-sm-2 offset-sm-6";
    totalPanier.textContent = "Total :";
    row.appendChild(totalPanier);

    let totalPrixPanier = document.createElement("div");
    totalPrixPanier.className = "col-sm-2";
    totalPrixPanier.textContent = new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(getPrixTotal() / 100);
    row.appendChild(totalPrixPanier);
  }
  var form = document.getElementById("formulaire");
  var lastName = document.getElementById("lastName");
  var firstName = document.getElementById("firstName");
  var address = document.getElementById("address");
  var city = document.getElementById("city");
  var email = document.getElementById("email");
  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();
      let data = {
        contact: {
          lastName: lastName.value,
          firstName: firstName.value,
          address: address.value,
          city: city.value,
          email: email.value,
        },
        products: getIdsCommandes(),
      };
      fetch("http://localhost:3000/api/teddies/order", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          removePanier();
          window.location.href = "/confirmation.html?order=" + data.orderId;
        })
        .catch((error) => {
          console.log("erreur lors de envoi de la commande : " + error);
        });
    },
    false
  );
}
