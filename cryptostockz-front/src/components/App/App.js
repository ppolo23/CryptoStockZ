import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import NavBar from '../NavBar/NavBar';
import UserProfile from '../UserProfile/UserProfile';
import Home from '../Home/Home';
import ProductView from '../ProductView/ProductView';
import Login from '../Login/SignInPopUp';
import SignUp from '../Login/SignUpPopUp';
import Search from '../Search/Search';
import Catalog from '../Catalog/Catalog';

class App extends React.Component {

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <BrowserRouter>
          <Switch>
            <Route path='/signin' component={Login} />
            <Route path='/signup' component={SignUp} />
            <Route exact path="/" render={() => {
              return (
                <Redirect to="/home" />
              )
            }} />
            <Route path="/home" component={Home} />
            <Route path="/profile" component={UserProfile} />
            <Route path='/products/:productId' component={ProductView} />
            <Route path="/products" component={Catalog}></Route>
            <Route path='/search' component={Search} />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
