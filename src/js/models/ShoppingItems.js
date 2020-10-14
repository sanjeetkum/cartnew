import axios from 'axios';

export default class ShoppingItems{


async getResults(){
  try{
  const res = await axios(`https://run.mocky.io/v3/cf2a3f46-42a0-43f2-a8ba-d6296f1b5e2f`);
  this.result = res.data.items;
  }
  catch (error){
  alert(error);
  }
}

addToCart(type){

}

}
