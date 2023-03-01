import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/login" component={ Login } />
        <Route path="/" render={ () => <Redirect to="/login" /> } />
      </Switch>
    </div>
  );
}

export default App;
