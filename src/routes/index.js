import React from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Home from './Home'
import Register from './Register'
import Chatroom from './Chatroom'
import Login from './Login'
import decode from 'jwt-decode'

const isAuthenticated=()=>{
    const token=localStorage.getItem('token')
    const refreshToken=localStorage.getItem('refreshToken')
    try{
        decode(token)
        decode(refreshToken)
    } catch(err){
        return false
    }
    return true
}

const PrivateRoute=({ component: Component, ...rest })=> {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

export default() => (
    <Router>
            <Switch>
                <PrivateRoute exact path="/" component={Home}/>
                <PrivateRoute path="/chatroom" component={Chatroom}/>
                <Route  path="/register" component={Register}/>
                <Route  path="/login" component={Login}/>
            </Switch>
    </Router>
)