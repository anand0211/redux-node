import actionTypes from '../constants/actionProductTypes';
import createHistory from "history/createBrowserHistory";
import { Link } from 'react-router-dom';
import { Route, Redirect } from 'react-router';
import _ from 'underscore';
const history = createHistory();

export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const SYNC_QUANTITY = 'SYNC_QUANTITY';
export const UPDATE_CART = 'UPDATE_CART';

export const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { products }
});

/**
 * @param  {} item
 * To add item into cart
 */
export function addToCart(cartItem) {
	return { type: ADD_TO_CART, cartItem };
}

/**
 * @param  {} quantity
 * To add quantity into cart
 */

export function syncQuantity(quantity) {
  return { type: SYNC_QUANTITY, quantity };
}

export function updateCart(updatedCart) {
	debugger;
  return { type: UPDATE_CART, updatedCart };
}

/**
 * @param  {} id
 * To remove item from cart
 */
export function removeFromCart(id) {
	return { type: REMOVE_FROM_CART, id };
}

/**
 * @param 
 * To get total from cart
 */

export function getCart(state, props) {
	var cartItems = JSON.parse(localStorage.getItem('cart'));

	var total = 0.00;
	_.each(cartItems, function (item) {
		total += item.price;
	});
	return {
		total: total.toFixed(2),
		items: cartItems ? cartItems.length : 0
	};
}

export function isInCart(state, props) {
	var cartItems = JSON.parse(localStorage.getItem('cart'));
	return _.some(cartItems, function (item) {
		return item.id == props._id;
	});
}

export function fetchProducts() {
  return dispatch => {
    //dispatch(fetchProductsBegin());
    return fetch("http://localhost:3001/manage_product")
      .then(res => res.json())
      .then((responseData) => {
      	//console.log(responseData);
        dispatch(fetchProductsSuccess(responseData));
        return responseData;
      })
      .catch(error => console.log(error));
  };
}
