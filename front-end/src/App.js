import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerProducts from './pages/CustomerProducts';
import './App.css';
import CustomerCheckout from './pages/CustomerCheckout';
import Admin from './pages/Admin';
import CustomerOrders from './pages/CustomerOrders';
import CustomerOrdersDetails from './pages/CustomerOrdersDetails';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/customer/products" component={ CustomerProducts } />
        <Route exact path="/customer/checkout" component={ CustomerCheckout } />
        <Route exact path="/customer/orders" component={ CustomerOrders } />
        <Route exact path="/customer/orders/:id" component={ CustomerOrdersDetails } />
        <Route exact path="/admin/manage" component={ Admin } />
      </Switch>
    </div>
  );
}

export default App;
