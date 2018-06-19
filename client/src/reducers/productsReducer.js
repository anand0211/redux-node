//import constants from '../constants/actionProductTypes'
import { FETCH_PRODUCTS_SUCCESS, FETCH_SINGLE_PRODUCT_SUCCESS } from '../actions/productAction';


var initialState = {
    items: [],
    singleItem:{}
}

export default function productReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        items: action.payload.products
      };
    case FETCH_SINGLE_PRODUCT_SUCCESS:
      //debugger;
        return {
        ...state,
        singleItem: action.payload.singleproduct
      };
    default:
      return state;
  }
}



