import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART } from '../actions/productAction';
import _ from 'underscore';

var initialCartState = {
  cartItem:[]
}

export default function cartReducer(state = initialCartState, action) {
  switch(action.type) {

    case ADD_TO_CART:
    		//debugger;
            var cartState = JSON.parse(localStorage.getItem('cart'));
            cartState = cartState ? cartState : [];
            localStorage.setItem('cart', JSON.stringify([...cartState, action.cartItem]));
            //debugger;
            return {
                cartItem: JSON.parse(localStorage.getItem('cart'))
            };
    case REMOVE_FROM_CART:
            var cartData = JSON.parse(localStorage.getItem('cart'));
            state = _.filter(cartData, function (item) {
                return item.id !== action.id
            });
            localStorage.setItem('cart', JSON.stringify(state));
            return {
                items : state
            };

    case UPDATE_CART:
          
          var cartState = JSON.parse(localStorage.getItem('cart'));
          
          localStorage.setItem('cart', JSON.stringify(action.cartItem));
          debugger;
         

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}