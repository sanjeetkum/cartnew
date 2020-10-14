import {elements} from './base';


export const displayCartItems = cartItem => {
const markup = `<div>
<h2 class="section-header">CART</h2>
<div class="cart-row">
  <span class="cart-item cart-header cart-column">ITEM</span>
  <span class="cart-price cart-header cart-column">PRICE</span>
  <span class="cart-quantity cart-header cart-column">QUANTITY</span>
</div>
<div class="cart-items">


</div>

<div class="cart-total">
  <p class="cart-total-title">TOTAL</p>
  <p class="">ITEMS :<span class="items-count">0</span>  </p>
  <p class="">DISCOUNT : <span class="items-discount"> 0</span></p>
  <p class="">ORDER TOTAL : <span class="cart-total-price">  $ 0</span><p>
</div>


</div>`;
elements.cartDisplay.insertAdjacentHTML('afterbegin',markup);
}
