let itemCountSpan = document.getElementById('itemCount');
let itemCount = 0;
let cartItems = 
localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
updateCart();

function openCart() {
    modalBody.innerHTML = '';
    cartItems.forEach(item =>{
        modalBody.innerHTML += `
        <table class="table">
        <thead>
          <th>Img</th>
          <th>Name</th>
          <th>Price</th>
          <th>Total Price</th>
          <th>Quantity</th>
        </thead>
        <tbody id="tBody">
        <tr id="row-${item.id}">
          <td>
            <img
          src="${item.img}"
          style="width: 50px; height: 50px"
            />
          </td>
          <td>${item.name}</td>
          <td>${item.price}</td>
          <td id="total${item.id}">${item.totalPrice}</td>
          <td id="cardQ${item.id}">${item.quantity}</td>
          <td>
            <button class="btn btn-success" onclick="adjustQuantity(${item.id},1)" type="button">+</button>
            <button class="btn btn-danger" onclick="adjustQuantity(${item.id},-1)" type="button">-</button>
          </td>
          <td onclick="removeItem(${item.id})" id="remove${item.id}">X</td>
        </tr>
        </tbody>
      </table>
        `;
    })
    
}

function addToCart(drinkId) {
    const drink = items.find(el => el.id == drinkId);
    const cartDrink = cartItems.find(el => el.id == drinkId);
    if(cartDrink) {
        cartDrink.quantity++;
        cartDrink.totalPrice = (cartDrink.quantity * cartDrink.price).toFixed(2);
    }
    else {
        cartItems.push({ ...drink, quantity: 1, totalPrice: drink.price.toFixed(2) });
    }
    localStorage.setItem('cartItems',JSON.stringify(cartItems));
    updateCart();
}

function updateCart() {
    if(cartItems.length == 0) itemCount = 0;
    else {
    itemCount = cartItems.map(el => el.quantity).reduce((curr,acc) => acc + curr);
    itemCountSpan.innerText = itemCount;
    }
}

function adjustQuantity(drinkId,change) {
    let itemQuantity = document.getElementById(`cardQ${drinkId}`);
    let itemTotalPrice = document.getElementById(`total${drinkId}`);
    let newQuantity = Number(itemQuantity.innerText) + change;
    if(newQuantity == 0) return;
    itemTotalPrice.innerText = ((Number(itemTotalPrice.innerText) / Number(itemQuantity.innerText)) * newQuantity).toFixed(2);
    itemQuantity.innerText = newQuantity;
    updateCartItem(drinkId,itemQuantity.innerText);

}

function updateCartItem(drinkId,quantity) {
    let drink = cartItems.find(drink => drink.id == drinkId);
    drink.quantity = Number(quantity);
    drink.totalPrice = drink.price * Number(quantity);
    localStorage.setItem('cartItems',JSON.stringify(cartItems));
    updateCart();
}

function removeItem(drinkId) {
    cartItems = cartItems.filter(drink => drink.id != drinkId);
    localStorage.setItem('cartItems',JSON.stringify(cartItems));
    updateCart();
    openCart();
}

