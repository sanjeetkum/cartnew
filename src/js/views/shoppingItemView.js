import {elements} from './base';


const renderResult = product => {
const markup = `<div class="app__product">
  <div class="app__img-holder">
    <img class="app__image" src="${product.image}"></img>
    <span class="app__discount">${product.discount}% off</span>
    </div>
    <h4 class="app__title">${product.name}</h4>
    <div class="app__details">
    <span class="app__display">$${product.price.display}</span>
    <span class="app__actual">$${product.price.actual}</span>
     <button class="app__button" type="button">Add to cart</button>
      </div>
      </div>`;
elements.productList.insertAdjacentHTML('afterbegin',markup);
}

export const renderAllResults =  items =>{
    items.forEach(renderResult);
}