import './App.css';
import React,{ Fragment } from 'react';
import Login from './components/login/Login';
import SignIn from './components/signIn/SignIn';
import Navigation from './components/navigation/Navigation';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import UserList from './users/UserList';
import Logout from './components/logout/Logout';

function App() {

  const route = (
    <Switch>
      <Route path="/login" component={Login}></Route>
      <Route path="/signin" component={SignIn}></Route>
      <Route path="/users" component={UserList}></Route>
      <Route path="/logout" component={Logout}></Route>
    </Switch>
  )

  return (
    <Fragment>
      {/* <Login/>
      <SignIn/> */}
      <Navigation/>
      {route}
    </Fragment>
  );
}

export default App;
