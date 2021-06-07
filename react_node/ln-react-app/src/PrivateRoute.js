import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import Nav from './components/Nav/Nav'
const PrivateRoute = ({ component: RouteComponent, ...rest}) => {
  const {currentUser} = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUser ? (
            <>
            <Nav />
          <RouteComponent {...routeProps} key={Date.now()} />
          </>
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};


export default PrivateRoute