import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} component={(props) => {
    const admin = JSON.parse(window.localStorage.getItem('admin')) ? JSON.parse(window.localStorage.getItem('admin')) : null;
    if (admin) {
      return <Component />
    } else {
      return <Redirect to={`/signin`} />
    }
  }} />
}

export default PrivateRoute;