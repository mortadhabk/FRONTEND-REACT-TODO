import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
// route validation 
function AuthRoute({ component: Component, ...rest }) {
  const token = useSelector((state) => state.Auth.user.user);
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}

export default AuthRoute;
