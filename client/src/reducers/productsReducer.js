//import constants from '../constants/actionProductTypes'
import { FETCH_PRODUCTS_SUCCESS } from '../actions/productAction';


var initialState = {
    items: []
}

export default function productReducer(state = initialState, action) {
  switch(action.type) {
    
    case FETCH_PRODUCTS_SUCCESS:
    //console.log(action);
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        items: action.payload.products
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}



