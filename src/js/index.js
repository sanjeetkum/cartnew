// Global app controller
import ShoppingItems from './models/ShoppingItems';
import * as shoppingItemsView from './views/shoppingItemView';
import * as cartView from './views/cartView';
import {elements} from './views/base';

//Global State of Ecart App
const state ={};

const controlItems = async () =>{
    state.data = new ShoppingItems(); 
    await state.data.getResults();
    shoppingItemsView.renderAllResults(state.data.result);
    cartView.displayCartItems();

}

const addToCartClicked = (e) =>{
    elements.cartDisplay.style.display = "block";
    let button = e.target;
    let fadeoutHeader = button.parentElement.parentElement.parentElement.parentElement;
    let shopItem = button.parentElement.parentElement;
    console.log(fadeoutHeader);
    let title = shopItem.getElementsByClassName("app__title")[0].innerText;
    let actualPrice = shopItem.getElementsByClassName("app__actual")[0].innerText;
    let displayPrice = shopItem.getElementsByClassName("app__display")[0].innerText;
    let imageSrc = shopItem.getElementsByClassName("app__image")[0].src;
    fadeoutHeader.getElementsByClassName('app__fadeout-header')[0].innerHTML = `<h3 class="app__info">${title} is added to cart</h3>`;

    addItemToCart(title, actualPrice, imageSrc, displayPrice);
}
const addItemToCart = (title, price, imageSrc, orgPrice) => {
    let cartRow = document.createElement("div");
    cartRow.classList.add("cart-row");
    let cartItems = document.getElementsByClassName("cart-items")[0];
    let cartItemNames = cartItems.getElementsByClassName("cart-item-title");
    for (let i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText === title) {
        alert("This item is already added to the cart");
        return;
      }
    }
    const cartMarkUp = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <input class="cart-org-price" type="hidden" value="${orgPrice}">
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">X</button>
        </div>`;
    cartRow.innerHTML = cartMarkUp;
    cartItems.append(cartRow);
    cartRow
      .getElementsByClassName("btn-danger")[0]
      .addEventListener("click", deleteCartItems);
    cartRow
      .getElementsByClassName("cart-quantity-input")[0]
      .addEventListener("change", countUpdated);
      updateTotal();
  }



 const updateTotalItems = (cartRows) => {
    let count = 0,
      discount = 0;
    for (let i = 0; i < cartRows.length; i++) {
      let cartRow = cartRows[i];
      let quantityElement = cartRow.getElementsByClassName(
        "cart-quantity-input"
      )[0];
      let priceElement = cartRow.getElementsByClassName("cart-price")[0]
        .innerText;
      let orgPrice = cartRow.getElementsByClassName("cart-org-price")[0].value;
      let quantity = quantityElement.value;
      discount += (parseFloat(orgPrice.replace("$", "")) - parseFloat(priceElement.replace("$", ""))) * quantity;
      count += parseFloat(quantity);
    }
    document.getElementsByClassName("items-discount")[0].innerText = discount;
    document.getElementsByClassName("items-count")[0].innerText = count;
  }
  const updateTotal = () => {
    let cartItemContainer = document.getElementsByClassName("cart-items")[0];
    let cartRows = cartItemContainer.getElementsByClassName("cart-row");
   
    let total = 0;
    for (let i = 0; i < cartRows.length; i++) {
      let cartRow = cartRows[i];
      let priceElement = cartRow.getElementsByClassName("cart-price")[0];
      let quantityElement = cartRow.getElementsByClassName(
        "cart-quantity-input"
      )[0];
      let price = parseFloat(priceElement.innerText.replace("$", ""));
      let quantity = quantityElement.value;

      total = total + price * quantity;
    }
    updateTotalItems(cartRows);
    document.getElementsByClassName("cart-total-price")[0].innerText =
      "$" + total;
  }
  const deleteCartItems = (event) => {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateTotal();
  }

 const countUpdated = (event) => {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updateTotal();
  }

window.addEventListener('load', function() {
    controlItems();
});

elements.productList.addEventListener('click', e =>{
    if(e.target.matches('.app__button')){
        addToCartClicked(e);
    }
});



