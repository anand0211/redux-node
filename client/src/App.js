import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './stores/store';
import Home from './components/layouts/Home';
import About from './components/layouts/About';
import Layout from './components/layouts/Layout';
import Register from './components/presentation/Register';
import Login from './components/presentation/Login';
import Products from './components/presentation/Products';
import SingleProduct from './components/presentation/SingleProduct';
import Checkout from './components/presentation/Checkout';

class App extends Component {
    render() {
    return (
      <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Route exact path="/" component={ Home } />
          <Route path="/About" component={ About } />
          <Route path="/SignUp" component={ Register } />
          <Route path="/SignIn" component={ Login } />
          <Route path="/Products" component={ Products} />
          <Route path="/Checkout" component={ Checkout } />
          <Route path="/SingleProduct/:id" component={SingleProduct} />
        </Layout>
      </BrowserRouter>
    </Provider>
    );
  }
}
export default App;