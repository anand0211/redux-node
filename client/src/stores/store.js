import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
//import newsReducer from '../reducers/newsReducer';
import authReducer from '../reducers/authReducer';
import productsReducer from '../reducers/productsReducer';
import cartReducer from '../reducers/cartReducer';
const store = createStore(
  combineReducers({
    auth: authReducer,
    products:productsReducer,
    singleproduct:productsReducer,
    cartItem:cartReducer
  }),
  applyMiddleware(
    thunk
  )
);

export default store;