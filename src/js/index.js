// Global app controller
import ShoppingItems from './models/ShoppingItems';
import CartList from './models/CartList';
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
    let button = e.target;
    let shopItem = button.parentElement.parentElement;
    let title = shopItem.getElementsByClassName("app__title")[0].innerText;
    let actualPrice = shopItem.getElementsByClassName("app__actual")[0].innerText;
    let displayPrice = shopItem.getElementsByClassName("app__display")[0].innerText;
    let imageSrc = shopItem.getElementsByClassName("app__image")[0].src;
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
    const cartRowContents = `
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
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow
      .getElementsByClassName("btn-danger")[0]
      .addEventListener("click", removeCartItem);
    cartRow
      .getElementsByClassName("cart-quantity-input")[0]
      .addEventListener("change", quantityChanged);
      updateCartTotal();
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
  const updateCartTotal = () => {
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
  const removeCartItem = (event) => {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
  }

 const quantityChanged = (event) => {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updateCartTotal();
  }

window.addEventListener('load', function() {
    controlItems();
});

elements.productList.addEventListener('click', e =>{
    if(e.target.matches('.app__button')){
        addToCartClicked(e);
    }
});


window.l = new CartList();

