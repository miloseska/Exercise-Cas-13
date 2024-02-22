let cards = document.getElementById("cards");
let items = [];

fetch("https://65d38018522627d50109056a.mockapi.io/api/drinks")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    items = data;
    data.forEach((drink) => {
      cards.innerHTML += createCard(drink);
    });
  });

function createCard(element) {
  return `
    <div class="card"  style="width: 18rem;">
    <div style="display:flex; justify-content:center">
    <img src="${element.img}" class="card-img-top img-drinks" alt="${
    element.name
  }">
    </div>
  
    <div class="card-body" style="display:flex; flex-direction:column; justify-content:space-between">
      <h5 class="card-title"style="text-align:center">${element.name}</h5>
      <p class="card-text">${element.description}</p>
  <div style="display:flex; justify-content: space-between">
  <span>Price: ${element.price} den</span>
  <span>${element.stock > 0 ? "Stock: " + element.stock : "No Stock"}</span>
  </div>
      <button  id="${element.id}" onclick="addToCart(${
    element.id
  })" class="btn btn-primary">Add to Cart</button>
    </div>
  </div>
    `;
}